# models.py
from sqlalchemy import Column, String, ForeignKey, Integer
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.orm import relationship
import uuid
from database import Base

class User(Base):
    __tablename__ = 'users'
    id = Column(Integer, primary_key=True)
    username = Column(String, nullable=False)
    email = Column(String, unique=True, nullable=False)
    password_hash = Column(String, nullable=False)
    favorites = relationship("Favorite", back_populates="user")

class Track(Base):
    __tablename__ = "tracks"

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String, nullable=False)
    artist = Column(String, nullable=False)
    album = Column(String)
    duration = Column(Integer)
    src = Column(String, nullable=False)
    favorites = relationship('Favorite', back_populates='track')


class Favorite(Base):
    __tablename__ = 'favorites'
    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    user_id = Column(UUID(as_uuid=True), ForeignKey('users.id'))
    track_id = Column(UUID(as_uuid=True), ForeignKey('tracks.id'))
    user = relationship("User", back_populates="favorites")
    track = relationship("Track", back_populates="favorites")
