from fastapi import FastAPI
from pydantic import BaseModel
from typing import Literal

app = FastAPI()

entry_keys = [
    "race",
    "age",
    "higher_ed",
    "prev_preg",
    "time_since_preg",
    "age_at_first_preg",
    "oral_contra",
    "type_contra",
    "len_contra",
    "menopausal",
    "HRT",
    "period_onset",
    "weight",
    "height",
    "immed_ovarian_family",
    "immed_breast_family",
    "distant_ovarian_family",
    "distant_breast_family",
    "endo",
    "irreg_period",
    "freq_bloat",
    "smoke",
]

# --------------- 📥 Input Schema ----------------
class UserData(BaseModel):
    race: str
    age: int
    higher_ed: str
    prev_preg: int
    time_since_preg: int
    age_at_first_preg: int
    oral_contra: Literal["yes", "no"]
    type_contra: str
    len_contra: int
    menopausal: Literal["yes", "no"]
    HRT: Literal["yes", "no"]
    period_onset: int
    weight: float
    height: float
    immed_ovarian_family: int
    immed_breast_family: int
    distant_ovarian_family: Literal["yes", "no"]
    distant_breast_family: Literal["yes", "no"]
    endo: Literal["yes", "no"]
    irreg_period: Literal["yes", "no"]
    freq_bloat: Literal["yes", "no"]
    smoke: Literal["yes", "no"]

# --------------- 🧠 BMI ----------------
def compute_bmi_imperial(weight_lb, height_in, age=None):
    if height_in <= 0:
        raise ValueError("Height must be greater than 0.")
    bmi = (weight_lb * 703) / (height_in ** 2)
    return round(bmi, 2)

# --------------- ⚙️ Risk Calculator Logic ----------------
def calculate_risk(data):
    risk = 1.0
    BMI = compute_bmi_imperial(data["weight"], data["height"])

    if data["age"] >= 65:
        risk *= 5.8

    if data["smoke"] == "yes":
        if data["race"] == "White":
            risk *= 1.2
        elif data["race"] == "Asian":
            risk *= 0.47

    if data["immed_breast_family"] >= 1:
        if data["race"] == "Asian":
            risk *= 1.01
        elif data["race"] == "Native Hawaiian/Pacific Islander":
            risk *= 0.71
        elif data["race"] == "Hispanic":
            risk *= 1.8
        elif data["race"] == "White":
            risk *= 1.24
        elif data["race"] == "Black":
            risk *= 1.77

    if data["immed_ovarian_family"] >= 1:
        if data["race"] == "Asian":
            risk *= 1.61
        elif data["race"] == "Native Hawaiian/Pacific Islander":
            risk *= 1.0
        elif data["race"] == "Hispanic":
            risk *= 2.03
        elif data["race"] == "White":
            risk *= 2.76
        elif data["race"] == "Black":
            risk *= 1.77

    if data["immed_ovarian_family"] >= 2:
        risk *= 4.0

    if data["distant_ovarian_family"] == "yes":
        risk *= 2.0

    if data["distant_breast_family"] == "yes":
        risk *= 2.0

    # BMI factors
    if BMI < 18.5:
        if data["race"] == "Asian":
            risk *= 1.59
        elif data["race"] == "Hispanic":
            risk *= 1.84
        elif data["race"] == "White":
            risk *= 1.01
    elif 18.5 <= BMI < 25:
        pass  # neutral
    elif 25 <= BMI < 30:
        if data["race"] == "Asian":
            risk *= 1.05
        elif data["race"] == "Native Hawaiian/Pacific Islander":
            risk *= 1.38
        elif data["race"] == "Hispanic":
            risk *= 1.01
        elif data["race"] == "White":
            risk *= 1.04
        elif data["race"] == "Black":
            risk *= 1.1
    elif 30 <= BMI < 35:
        if data["race"] == "Asian":
            risk *= 1.77
        elif data["race"] == "Native Hawaiian/Pacific Islander":
            risk *= 0.98
        elif data["race"] == "Hispanic":
            risk *= 1.24
        elif data["race"] == "White":
            risk *= 1.14
        elif data["race"] == "Black":
            risk *= 1.19
    elif BMI >= 35:
        if data["race"] == "Asian":
            risk *= 3.16
        elif data["race"] == "Native Hawaiian/Pacific Islander":
            risk *= 0.92
        elif data["race"] == "Hispanic":
            risk *= 1.07
        elif data["race"] == "White":
            risk *= 1.29
        elif data["race"] == "Black":
            risk *= 1.19

    if data["time_since_preg"] < 5 and data["age"] < 45:
        risk *= 2.1

    if data["age_at_first_preg"] >= 30:
        risk *= 2

    if data["type_contra"] == "Pill" and data["len_contra"] >= 5:
        if data["race"] == "Asian":
            risk *= 0.31
        elif data["race"] == "Hispanic":
            risk *= 0.56
        elif data["race"] == "White":
            risk *= 0.46
        elif data["race"] == "Black":
            risk *= 0.63
    else:
        if data["race"] == "Asian":
            risk *= 0.55
        elif data["race"] == "Hispanic":
            risk *= 0.86
        elif data["race"] == "White":
            risk *= 0.75
        elif data["race"] == "Black":
            risk *= 0.78

    if data["period_onset"] < 12:
        pass
    elif data["period_onset"] < 13:
        if data["race"] == "Asian":
            risk *= 1.18
        elif data["race"] == "Hispanic":
            risk *= 1.19
        elif data["race"] == "White":
            risk *= 0.97
        elif data["race"] == "Black":
            risk *= 1.11
    else:
        if data["race"] == "Asian":
            risk *= 1.26
        elif data["race"] == "Hispanic":
            risk *= 1.02
        elif data["race"] == "White":
            risk *= 0.92
        elif data["race"] == "Black":
            risk *= 1.02

    if data["prev_preg"] == 1:
        if data["race"] == "Asian":
            risk *= 0.52
        elif data["race"] == "White":
            risk *= 0.82
    elif data["prev_preg"] == 2:
        if data["race"] == "Asian":
            risk *= 0.39
        elif data["race"] == "White":
            risk *= 0.55
    else:
        if data["race"] == "Asian":
            risk *= 0.32
        elif data["race"] == "White":
            risk *= 0.5

    if data["HRT"] == "yes":
        if data["race"] == "Asian":
            risk *= 0.82
        elif data["race"] == "White":
            risk *= 0.91
        elif data["race"] == "Black":
            risk *= 1.07

    if data["endo"] == "yes" or data["irreg_period"] == "yes" or data["freq_bloat"] == "yes":
        if data["race"] == "Asian":
            risk *= 1.59
        elif data["race"] == "White":
            risk *= 1.42
        elif data["race"] == "Black":
            risk *= 2.42

    if data["higher_ed"] != "less_than_high_school":
        if data["race"] == "Asian":
            risk *= 0.85
        elif data["race"] == "Hispanic":
            risk *= 0.59
        elif data["race"] == "Black":
            risk *= 0.94
        else:
            risk *= 0.7

    return risk

# --------------- 🧬 Genetic Risk ----------------
def calc_ehr_risk(gene_data, lab_data):
    risk = 1.0
    gene_risks = {
        'brca1': 20,
        'brca2': 10,
        'rad51c': 5,
        'rad51d': 10,
        'brip1': 5
    }
    for key in gene_data.keys():
        if gene_data[key] == 1:
            risk *= gene_risks[key]
    return risk

# --------------- 🚀 Route ----------------
@app.post("/calculate")
def calculate(user: UserData):
    data = user.dict()

    clinical_risk = calculate_risk(data)

    gene_data = {
        'brca1': 1,
        'brca2': 0,
        'rad51c': 1,
        'rad51d': 0,
        'brip1': 1
    }

    genetic_risk = calc_ehr_risk(gene_data, data)
    total_risk = round(clinical_risk * genetic_risk, 2)

    return {
        "clinical_risk": round(clinical_risk, 2),
        "genetic_risk": genetic_risk,
        "total_risk": total_risk
    }
