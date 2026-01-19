from sqlalchemy.orm import Session
from users.models import User
from core.security import hash_password, verify_password

def regiser_user(db:Session, email:str, password: str, full_name:str):
    #check if user exist or not
    existing_user = db.query(User).filter(User.email == email).first()
    if existing_user:
        raise ValueError("user with this email is alrady exists.")

    new_user = User(
        email = email,
        password_hash = hash_password(password),
        full_name = full_name,
        role = "USER",
        user_status = "ACTIVE")
    
    db.add(new_user)
    db.commit()
    db.refresh(new_user)
    
    return new_user

def authenticate_user(db: Session, email:str, password: str) -> User:
    user = db.query(User).filter(User.email == email).first()
    if not user:
        return None
    
    if not verify_password(password, user.password_hash):
        return None
    
    return user 