from fastapi import FastAPI, Query, Depends, WebSocket, WebSocketDisconnect
from classes import User, SessionLocal, get_db, app, deleteUser, addUser, getRowCount, clockInOrOut
import asyncio



@app.get("/")
async def root():
    return {"message": "Working"}


@app.get("/admin")
async def admin(isAdmin: bool = Query(..., description="Check if user is an admin"), db: SessionLocal = Depends(get_db)):
    if isAdmin:
        result = db.query(User).offset(0).limit(100).all()
        return result
    else:
        return 500
    

@app.post("/delete")
async def delete(name: str):
    deleteUser(name)
    return "Sucess"


@app.post("/add")
async def add(firstName: str, lastName: str):
    addUser(firstName, lastName,  getRowCount() + 1)
    return "Sucess"


@app.websocket("/ws")
async def websocket_endpoint(websocket: WebSocket):
    await websocket.accept()

    try:
        while(True):
            await websocket.send_text("Mohammed")
            clockInOrOut("Mohammed Odeh", "12-06-15")
            await asyncio.sleep(30)

    except WebSocketDisconnect:
        pass