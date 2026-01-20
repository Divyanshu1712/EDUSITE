from fastapi import APIRouter, Depends
from core.dependencies import get_current_user

router = APIRouter(prefix="/auth", tags=["User"])

@router.get("/me")
def read_me(current_user = Depends(get_current_user)):
    return{
        "email": current_user.email,
        "role": current_user.role
    }