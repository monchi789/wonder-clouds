from pydantic import BaseModel

class TokenData(BaseModel):
    email: str 
    rol: str
    id: str
