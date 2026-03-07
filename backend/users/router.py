from fastapi import APIRouter, Depends, HTTPException
from core.dependencies import get_current_user, require_admin
from typing import List
from sqlalchemy.orm import Session
from db.session import get_db
from .schemas import UserResponse
from .service import get_all_user, get_user_by_email
from .models import User

# Separate routers for different purposes
auth_router = APIRouter(prefix="/auth", tags=["Auth"])
users_router = APIRouter(prefix="/users", tags=["Users"])

@auth_router.get("/me")
def read_me(current_user = Depends(get_current_user)):
    return{
        "email": current_user.email,
        "role": current_user.role
    }


@users_router.get("/", response_model=List[UserResponse])
def list_user(
        db:Session = Depends(get_db),
        admin = Depends(require_admin)
    ):  

    return get_all_user(db)

from pydantic import BaseModel, EmailStr

class UserEmailRequest(BaseModel):
    email: EmailStr

@users_router.post("/search", response_model=UserResponse)
def user_by_email(
    payload: UserEmailRequest,
    db: Session = Depends(get_db),
    current_user = Depends(get_current_user)
    ):
    return get_user_by_email(db, payload.email)

@users_router.delete("/{user_id}")
def delete_user(
    user_id: str,
    db: Session = Depends(get_db),
    admin = Depends(require_admin)
    ):
    user = db.query(User).filter(User.user_id == user_id).first()
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    db.delete(user)
    db.commit()
    return {"message": "User deleted successfully"}


def upadteUser(
    user_id: str,
    db: Session = Depends(get_db),
    admin = Depends(require_admin)
    ):
    user = db.query(User).filter(User.user_id == user_id).first()
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    
    