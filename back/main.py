# main.py
from models import Track, Favorite
from fastapi import Header
from fastapi import FastAPI, Depends, HTTPException, status
from sqlalchemy.orm import Session
from models import User
from database import SessionLocal, engine, get_db
from utils import get_password_hash, verify_password, create_access_token
from pydantic import BaseModel
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm
from fastapi.middleware.cors import CORSMiddleware


from jose import JWTError, jwt
from sqlalchemy.orm import Session

# Конфигурационные параметры
SECRET_KEY = "your-secret-key"
ALGORITHM = "HS256"

# Инициализация схемы OAuth2
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token")

def get_current_user(token: str = Depends(oauth2_scheme), db: Session = Depends(get_db)):
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Не удалось проверить учетные данные",
        headers={"WWW-Authenticate": "Bearer"},
    )
    try:
        # Декодирование JWT-токена
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        username: str = payload.get("sub")
        if username is None:
            raise credentials_exception
        # Создание объекта данных токена
        token_data = schemas.TokenData(username=username)
    except JWTError:
        raise credentials_exception
    # Получение пользователя из базы данных
    user = db.query(models.User).filter(models.User.username == token_data.username).first()
    if user is None:
        raise credentials_exception
    return user




app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Или ["*"] для любых источников
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
# Создание таблиц
import models
models.Base.metadata.create_all(bind=engine)

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token")

class UserCreate(BaseModel):
    nickname: str
    email: str
    password: str

@app.post("/api/register")
def register(user: UserCreate, db: Session = Depends(get_db)):
    db_user = db.query(User).filter(User.email == user.email).first()
    if db_user:
        raise HTTPException(status_code=400, detail="Email already registered")
    hashed_password = get_password_hash(user.password)
    new_user = User(username=user.nickname, email=user.email, password_hash=hashed_password)
    db.add(new_user)
    db.commit()
    db.refresh(new_user)
    return {"message": "User registered successfully"}

@app.post("/api/token")
def login(form_data: OAuth2PasswordRequestForm = Depends(), db: Session = Depends(get_db)):
    user = db.query(User).filter(User.email == form_data.username).first()
    if not user or not verify_password(form_data.password, user.hashed_password):
        raise HTTPException(status_code=401, detail="Invalid credentials")
    access_token = create_access_token(data={"sub": str(user.id)})
    return {"access_token": access_token, "token_type": "bearer"}
# main.py (продолжение)


@app.post("/api/favorites/{track_id}")
def add_favorite(track_id: str, token: str = Depends(oauth2_scheme), db: Session = Depends(SessionLocal)):
    # Здесь должна быть логика извлечения user_id из токена
    # Предположим, что у нас есть функция get_current_user, которая возвращает текущего пользователя
    user = get_current_user(token, db)
    track = db.query(Track).filter(Track.id == track_id).first()
    if not track:
        raise HTTPException(status_code=404, detail="Track not found")
    favorite = Favorite(user_id=user.id, track_id=track.id)
    db.add(favorite)
    db.commit()
    return {"message": "Track added to favorites"}

@app.delete("/api/favorites/{track_id}")
def remove_favorite(track_id: str, token: str = Depends(oauth2_scheme), db: Session = Depends(SessionLocal)):
    user = get_current_user(token, db)
    favorite = db.query(Favorite).filter(Favorite.user_id == user.id, Favorite.track_id == track_id).first()
    if not favorite:
        raise HTTPException(status_code=404, detail="Favorite not found")
    db.delete(favorite)
    db.commit()
    return {"message": "Track removed from favorites"}

@app.get("/api/favorites")
def get_favorites(token: str = Depends(oauth2_scheme), db: Session = Depends(SessionLocal)):
    user = get_current_user(token, db)
    favorites = db.query(Favorite).filter(Favorite.user_id == user.id).all()
    return favorites

from typing import List
import schemas


@app.get("/api/tracks", response_model=List[schemas.TrackSchema])
def read_tracks(db: Session = Depends(get_db)):
    tracks = db.query(models.Track).all()
    return tracks