from sqlalchemy import Column, String, DateTime
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.sql import func
import uuid
from db.base import Base

class User(Base):
    __tablename__  = "user_master"
    
    user_id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    email = Column(String(150), unique=True, nullable=False)
    password_hash = Column(String(255), nullable=False)
    full_name = Column(String(100), nullable=False)
    role = Column(String(20), nullable=False)
    user_status = Column(String(10), nullable=False, default="ACTIVE")
    created_at = Column(DateTime(timezone=True), server_default=func.now())