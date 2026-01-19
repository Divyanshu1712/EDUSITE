
from fastapi import FastAPI

app = FastAPI()

@app.get("/")
def main_root():
    return { "message":"Hello World",}

from db.session import engine
@app.get("/db-test")
def db_test():
    return {"db": str(engine)}