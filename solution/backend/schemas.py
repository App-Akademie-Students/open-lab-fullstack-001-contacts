from pydantic import BaseModel, EmailStr




class ContactCreate(BaseModel):
    name: str
    email: EmailStr
    phone: str


class ContactRead(BaseModel):
    id: int
    name: str
    email: EmailStr
    phone: str