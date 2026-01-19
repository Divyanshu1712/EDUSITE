from fastapi import FastAPI
app = FastAPI()
@app.get("/")
def main_root():
    return {"message":"Hello World"}