def adjust_premium(data, probability):

    premium = data.quoted_premium

    if probability < 0.4:
        premium *= 0.85
    elif probability < 0.6:
        premium *= 0.95

    return round(premium,2)