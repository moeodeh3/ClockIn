from fastapi import FastAPI

app = FastAPI()

@app.get("/")
async def root():
    return {"message": "Working"}


@app.get("/admin")
async def admin():
    return "YAY"