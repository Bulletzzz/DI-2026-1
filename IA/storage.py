"""
BEAST — Persistência dos Modelos
Salva e carrega os modelos treinados em disco via joblib.
"""

import os

import joblib
from sklearn.ensemble import RandomForestClassifier, RandomForestRegressor
from sklearn.preprocessing import MinMaxScaler

MODEL_DIR = os.path.join(os.path.dirname(__file__), "models")

SCORING_PATH = os.path.join(MODEL_DIR, "scoring.pkl")
CHURN_PATH   = os.path.join(MODEL_DIR, "churn.pkl")
SCALER_PATH  = os.path.join(MODEL_DIR, "scaler.pkl")


def salvar_modelos(
    modelo_scoring: RandomForestRegressor,
    modelo_churn: RandomForestClassifier,
    scaler: MinMaxScaler,
) -> None:
    os.makedirs(MODEL_DIR, exist_ok=True)
    joblib.dump(modelo_scoring, SCORING_PATH)
    joblib.dump(modelo_churn,   CHURN_PATH)
    joblib.dump(scaler,         SCALER_PATH)
    print(f"[STORAGE] Modelos salvos em: {MODEL_DIR}/")


def carregar_modelos() -> tuple[RandomForestRegressor, RandomForestClassifier, MinMaxScaler]:
    if not os.path.exists(SCORING_PATH):
        raise FileNotFoundError(
            "Modelos não encontrados. Execute 'python train.py' primeiro."
        )
    modelo_scoring = joblib.load(SCORING_PATH)
    modelo_churn   = joblib.load(CHURN_PATH)
    scaler         = joblib.load(SCALER_PATH)
    return modelo_scoring, modelo_churn, scaler
