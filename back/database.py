from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker

# URL подключения к базе данных PostgreSQL
SQLALCHEMY_DATABASE_URL = "postgresql://course_back_df7y_user:SpuSBzj25tShtWMHQvFzkfG7VgSawWyD@dpg-d0gjndidbo4c73bf6jeg-a.oregon-postgres.render.com/course_back_df7y"

# Создание движка SQLAlchemy
engine = create_engine(SQLALCHEMY_DATABASE_URL)

# Создание фабрики сессий
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

# Базовый класс для моделей
Base = declarative_base()

# Зависимость для получения сессии базы данных
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
