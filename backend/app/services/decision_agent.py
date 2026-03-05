def final_decision(risk):

    if risk == "LOW":
        return "AUTO APPROVE"
    elif risk == "MEDIUM":
        return "FOLLOW UP"
    else:
        return "ESCALATE"