from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session

from db.session import get_db
from auth.schemas import LoginRequest, RegisterRequest , TokenResponse
from auth.service import regiser_user,  authenticate_user
from core.security import create_access_token

router = APIRouter(prefix="/auth", tags=["Auth"])

@router.post("/register",status_code = status.HTTP_201_CREATED)
def register(request : RegisterRequest, db: Session = Depends(get_db)):
    try:
        user = regiser_user(
            db=db,
            email=request.email,
            password=request.password,
            full_name=request.full_name
        )
        return {"message":"User Register Successfully!"}
    except ValueError as e:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST, detail=str(e)
        )
        
@router.post("/login",response_model=TokenResponse)
def login(request : LoginRequest, db: Session = Depends(get_db)):
    user = authenticate_user(
        db=db,
        email=request.email,
        password=request.password
    )
    print("user",user)
    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid Email or password")
    if user.user_status != "ACTIVE":
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED, detail="User is not active")

    token = create_access_token(
        data={
            "user_id": str(user.user_id), "role":user.role
        }
    )
    return {
        "access_token": token,
        "token_type": "bearer"
    }