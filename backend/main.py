from typing import Union

from fastapi import FastAPI
import random
from pydantic import BaseModel

app = FastAPI()

class Item(BaseModel):
    name : str
    price: float
    is_offer : Union[bool, None] = None
    
@app.get("/check")
def read_root():
    return {"Hello": "World"}


@app.get("/items/{item_id}")
def read_item(item_id: int, q: Union[str, None] = None):
    fill = random.randint(1,4)
    return {"item_id": item_id, "q": fill}

@app.put("/items/{item_id}")
def update_item(item_id : int, item: Item):
    return {"item_name": item.name, "item_id":item_id}