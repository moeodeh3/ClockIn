from fastapi import FastAPI, Query, Depends, WebSocket, WebSocketDisconnect
from classes import User, SessionLocal, get_db, app, deleteUser, addUser, clockInOrOut, getUserById, getLowestAvailableId, enroll_finger, get_fingerprint
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


@app.post("/addfinger")
async def addfinger():
    while True:
        result = enroll_finger(getLowestAvailableId())
        if result:
            return True



@app.post("/add")
async def add(firstName: str, lastName: str):
    addUser(firstName, lastName)
    return "Sucess"


@app.websocket("/ws")
async def websocket_endpoint(websocket: WebSocket):
    await websocket.accept()

    try:
        while(True):
            finger = get_fingerprint()
            if (finger):
                fingerId, fingerConfidence = finger
                if (fingerConfidence > 80):
                    user = getUserById(fingerId)
                    clockInOrOut(user)
                    await websocket.send_text(user)
                else:
                    await websocket.send_text("Please try again")
            await websocket.send_text("Please try again")

    except WebSocketDisconnect:
        pass