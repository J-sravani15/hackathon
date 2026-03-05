from fastapi import APIRouter
from app.schemas.predict_schema import QuoteInput
from app.services.risk_profiler import calculate_risk
from app.services.predict_service import predict_conversion
from app.services.premium_advisor import adjust_premium
from app.services.decision_router import route_decision

router = APIRouter()

@router.post("/predict")

def predict(data:QuoteInput):

    risk = calculate_risk(data)

    prediction,probability = predict_conversion(data)

    premium = adjust_premium(data,probability)

    decision = route_decision(risk,probability)

    return {
        "risk":risk,
        "conversion_probability":probability,
        "adjusted_premium":premium,
        "decision":decision
    }