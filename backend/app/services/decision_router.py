def route_decision(risk, probability):

    if risk == "LOW" and probability > 0.7:
        return "AUTO_APPROVE"

    elif probability > 0.4:
        return "AGENT_FOLLOWUP"

    else:
        return "ESCALATE_TO_UNDERWRITER"