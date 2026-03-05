import joblib
import pandas as pd

model = joblib.load("models/conversion_model.pkl")

def predict_conversion(data):

    df = pd.DataFrame([data])

    # Add missing columns expected by the model
    expected_features = model.feature_names_in_

    for col in expected_features:
        if col not in df.columns:
            df[col] = 0

    # Reorder columns to match training
    df = df[expected_features]

    prediction = model.predict(df)[0]
    probability = model.predict_proba(df)[0][1]

    return prediction, probability