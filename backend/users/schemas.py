from pydantic import BaseModel
from uuid import UUID

class UserResponse(BaseModel):
    user_id: UUID  
    email: str
    full_name: str
    role: str
    user_status: str
    
    class Config:
        from_attributes = True
