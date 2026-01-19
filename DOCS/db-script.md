-- Enable UUID
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- USER MASTER
CREATE TABLE user_master (
    user_id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    email VARCHAR(150) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    full_name VARCHAR(100) NOT NULL,
    role VARCHAR(20) NOT NULL CHECK (role IN ('ADMIN','USER')),
    user_status VARCHAR(10) NOT NULL CHECK (user_status IN ('ACTIVE','INACTIVE')),
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- SUBSCRIPTION PLAN
CREATE TABLE subscription_plan (
    plan_id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    plan_name VARCHAR(50) UNIQUE NOT NULL,
    price NUMERIC(10,2) NOT NULL,
    is_active BOOLEAN NOT NULL DEFAULT TRUE
);

-- USER SUBSCRIPTION
CREATE TABLE user_subscription (
    subscription_id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID UNIQUE NOT NULL,
    plan_id UUID NOT NULL,
    status VARCHAR(20) NOT NULL CHECK (status IN ('ACTIVE','CANCELLED','EXPIRED')),
    start_date DATE NOT NULL,
    end_date DATE,
    payment_ref VARCHAR(100),
    CONSTRAINT fk_user
        FOREIGN KEY (user_id) REFERENCES user_master(user_id),
    CONSTRAINT fk_plan
        FOREIGN KEY (plan_id) REFERENCES subscription_plan(plan_id)
);

-- CONTENT MASTER
CREATE TABLE content_master (
    content_id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title VARCHAR(150) NOT NULL,
    content_type VARCHAR(30) NOT NULL CHECK (content_type IN ('NOTE','CHEAT','VIDEO')),
    content_url TEXT NOT NULL,
    is_paid BOOLEAN NOT NULL DEFAULT FALSE,
    created_by UUID NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_admin
        FOREIGN KEY (created_by) REFERENCES user_master(user_id)
);
