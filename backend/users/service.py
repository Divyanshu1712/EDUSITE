from sqlalchemy.orm import Session
from .models import User
from fastapi import HTTPException
from sqlalchemy import func

def get_all_user(db: Session):
    return db.query(User).all()

def get_user_by_email(db: Session, email: str):
    if not email:
        raise HTTPException(status_code=400, detail="Email is required")

    normalized_email = email.lower().strip()

    user = (
        db.query(User)
        .filter(func.lower(User.email) == normalized_email)
        .first()
    )

    if not user:
        raise HTTPException(status_code=404, detail="User not found")

    return user
