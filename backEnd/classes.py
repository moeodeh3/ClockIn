from fastapi import FastAPI
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy import create_engine, Column, Integer, Text, Time, select, func
from sqlalchemy.orm import sessionmaker
from fastapi.middleware.cors import CORSMiddleware

#For finger print
import datetime
import serial
import adafruit_fingerprint

uart = serial.Serial("/dev/ttyS0", baudrate=57600, timeout=1)
finger = adafruit_fingerprint.Adafruit_Fingerprint(uart)


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
DATABASE_URL = 'postgresql+psycopg2://postgres:password@hostip/userData'


engine = create_engine(DATABASE_URL)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)


# Database schema for users
class User(Base):
    __tablename__ = 'users'

    id = Column(Integer, primary_key=True)
    name = Column(Text)
    fingerId = Column(Integer)


# Database schema for clock in and out times
class ClockTime(Base):
    __tablename__ = 'clockTime'

    id = Column(Integer, primary_key=True)
    name = Column(Text)
    clockIn = Column(Text)
    clockOut = Column(Time)


# Dependency to get a database session
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

def getLowestAvailableId():
    db = SessionLocal()
    
    # Find all used fingerIds
    used_finger_ids = db.query(User.fingerId).filter(User.fingerId.isnot(None)).all()
    
    # Get the minimum available fingerId
    if used_finger_ids:
        used_finger_ids = [row[0] for row in used_finger_ids]  # Extract the values from the query result
        min_available_id = min(set(range(1, max(used_finger_ids) + 2)) - set(used_finger_ids))
    else:
        min_available_id = 1
    
    db.close()
    
    return min_available_id


def deleteUser(name):
    db = SessionLocal()
    user = db.query(User).filter(User.name == name).first()

    if user:
        finger.delete_model(user.id)
        db.delete(user)
        db.commit()
    else:
        return "ERROR"
    

def addUser(firstName,lastName):
    db = SessionLocal()
    newUser = User()

    newUser.name = firstName.capitalize().replace(" ", "") + " " +  lastName.capitalize().replace(" ", "")
    newUser.fingerId = getLowestAvailableId()

    oldUser = db.query(User).filter(User.name == newUser.name).first()

    if not oldUser:
        db.add(newUser)
        db.commit()
    else:
        return "ERROR"


def getUserById(id):
    db = SessionLocal()
    user = db.query(User).filter(User.id == id).first()

    if(user):
        return user.id
    else:
        return "User not found"
    


def clockInOrOut(user):
    db = SessionLocal()
    timestamp = datetime.datetime.now()

    clockOut = db.query(ClockTime).filter(
        ClockTime.name == user,
        ClockTime.clockOut.is_(None)
    ).first()

    
    if clockOut:
        clockOut.clockOut = timestamp
        db.add(clockOut)
        
        
    else:
        clockIn = ClockTime()
        clockIn.name = user
        clockIn.clockIn = timestamp
        db.add(clockIn)

    db.commit()


def get_fingerprint():
    """Get a finger print image, template it, and see if it matches!"""
    print("Waiting for image...")
    while finger.get_image() != adafruit_fingerprint.OK:
       pass
    print("Templating...")
    if finger.image_2_tz(1) != adafruit_fingerprint.OK:
        return False
    print("Searching...")
    if finger.finger_search() != adafruit_fingerprint.OK:
        return None
    
    fingerList = [finger.finger_id, finger.confidence]
    return fingerList


def enroll_finger(location):
    """Take a 2 finger images and template it, then store in 'location'"""
    for fingerimg in range(1, 3):
        if fingerimg == 1:
            print("Place finger on sensor...", end="")
        else:
            print("Place same finger again...", end="")

        while True:
            i = finger.get_image()
            if i == adafruit_fingerprint.OK:
                print("Image taken")
                break
            if i == adafruit_fingerprint.NOFINGER:
                print(".", end="")
            elif i == adafruit_fingerprint.IMAGEFAIL:
                print("Imaging error")
                return False
            else:
                print("Other error")
                return False

        print("Templating...", end="")
        i = finger.image_2_tz(fingerimg)
        if i == adafruit_fingerprint.OK:
            print("Templated")
        else:
            if i == adafruit_fingerprint.IMAGEMESS:
                print("Image too messy")
            elif i == adafruit_fingerprint.FEATUREFAIL:
                print("Could not identify features")
            elif i == adafruit_fingerprint.INVALIDIMAGE:
                print("Image invalid")
            else:
                print("Other error")
            return False

        if fingerimg == 1:
            print("Remove finger")
            time.sleep(1)
            while i != adafruit_fingerprint.NOFINGER:
                i = finger.get_image()

    print("Creating model...", end="")
    i = finger.create_model()
    if i == adafruit_fingerprint.OK:
        print("Created")
    else:
        if i == adafruit_fingerprint.ENROLLMISMATCH:
            print("Prints did not match")
        else:
            print("Other error")
        return False

    print("Storing model #%d..." % location, end="")
    i = finger.store_model(location)
    if i == adafruit_fingerprint.OK:
        print("Stored")
    else:
        if i == adafruit_fingerprint.BADLOCATION:
            print("Bad storage location")
        elif i == adafruit_fingerprint.FLASHERR:
            print("Flash storage error")
        else:
            print("Other error")
        return False

    return True



    