def calculate_risk(data):

    score = (
        data.prev_accidents * 3 +
        data.prev_citations * 2 +
        data.driver_age * 0.01
    )

    if score < 3:
        return "LOW"
    elif score < 6:
        return "MEDIUM"
    else:
        return "HIGH"