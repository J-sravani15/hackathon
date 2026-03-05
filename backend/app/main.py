from fastapi import FastAPI
from app.routers import predict

app = FastAPI(title="Hackathon AI System")

app.include_router(predict.router)

@app.get("/")
def root():
    return {"message": "Hackathon system running"}