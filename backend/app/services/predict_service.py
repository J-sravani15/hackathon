from pydantic import BaseModel

class QuoteInput(BaseModel):

    driver_age:int
    driving_exp:int
    prev_accidents:int
    prev_citations:int
    quoted_premium:float