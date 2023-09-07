import psycopg2
import sqlalchemy as db
from sqlalchemy.orm import sessionmaker, declarative_base
from sqlalchemy import select

Base = declarative_base()

class users(Base):
    __tablename__ = 'users'

    id = db.Column(db.Integer, primary_key = True)
    name = db.Column(db.String(50))
    fingerPrint = db.Column(db.String(1000))

engine = db.create_engine('postgresql+psycopg2://postgres:admin@localhost/groceryItems') #Update with database location


Session = sessionmaker(bind=engine)
session = Session()