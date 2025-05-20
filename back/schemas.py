from pydantic import BaseModel

class TrackSchema(BaseModel):
    id: int
    title: str
    artist: str
    album: str | None = None
    duration: int | None = None
    src: str

    class Config:
        orm_mode = True
