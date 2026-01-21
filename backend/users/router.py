from fastapi import APIRouter, Depends
from core.dependencies import get_current_user, require_admin
from typing import List
from sqlalchemy.orm import Session
from db.session import get_db
from .schemas import UserResponse
from .service import get_all_user

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
