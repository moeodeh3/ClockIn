from fastapi import FastAPI
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy import create_engine, Column, Integer, Text, delete
from sqlalchemy.orm import sessionmaker
from fastapi.middleware.cors import CORSMiddleware

Base = declarative_base()

app = FastAPI()

# Configure CORS
origins = [
    "http://localhost:3000",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],  
    allow_headers=["*"], 
)



# Database connection setup
DATABASE_URL = 'postgresql+psycopg2://postgres:admin@localhost/userData'


engine = create_engine(DATABASE_URL)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

# Database schema
class User(Base):
    __tablename__ = 'users'

    id = Column(Integer, primary_key=True)
    name = Column(Text)
    fingerURL = Column(Text)

# Dependency to get a database session
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

def deleteUser(name):
    db = SessionLocal()
    user = db.query(User).filter(User.name == name).first()

    if user:
        db.delete(user)
        db.commit()
    else:
        return "ERROR"
    

def addUser(firstName,lastName, url):
    db = SessionLocal()
    newUser = User()

    newUser.name = firstName.capitalize().replace(" ", "") + " " +  lastName.capitalize().replace(" ", "")
    newUser.fingerURL = url

    oldUser = db.query(User).filter(User.name == newUser.name).first()

    if not oldUser:
        db.add(newUser)
        db.commit()
    else:
        return "ERROR"
    