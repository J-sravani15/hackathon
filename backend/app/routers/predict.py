from fastapi import APIRouter
from app.schemas.predict_schema import QuoteInput
from app.services.predict_service import predict_conversion
from app.services.risk_profiler import calculate_risk

router = APIRouter()

@router.post("/predict")
def predict(data: QuoteInput):

    # Agent 1: Risk Profiler
    risk = calculate_risk(data)

    # Agent 2: ML Conversion Predictor
    prediction, probability = predict_conversion(data.dict())

    return {
        "risk_level": risk,
        "prediction": int(prediction),
        "conversion_probability": float(probability)
    }