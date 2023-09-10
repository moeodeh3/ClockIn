from fastapi import FastAPI, Query, Depends
from classes import User, SessionLocal, get_db, app, deleteUser, addUser



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
async def add(firstName: str, lastName: str,  url: str):
    addUser(firstName, lastName,  url)
    return "Sucess"