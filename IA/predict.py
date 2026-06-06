import json
import sys

import numpy as np
import pandas as pd
from sklearn.ensemble import RandomForestClassifier, RandomForestRegressor
from sklearn.preprocessing import MinMaxScaler

from storage import carregar_modelos

FEATURES = [
    "total_pedidos",
    "ticket_medio",
    "tempo_como_cliente",
    "dias_desde_ultimo_pedido",
    "tem_plano",
]

COLUNAS_NORM = [
    "total_pedidos",
    "ticket_medio",
    "tempo_como_cliente",
    "dias_desde_ultimo_pedido",
]


def prever(
    cliente: dict,
    modelo_scoring: RandomForestRegressor,
    modelo_churn: RandomForestClassifier,
    scaler: MinMaxScaler,
) -> dict:
    df_cliente = pd.DataFrame([cliente])
    df_cliente[COLUNAS_NORM] = scaler.transform(df_cliente[COLUNAS_NORM])

    X = df_cliente[FEATURES]

    score = float(np.clip(modelo_scoring.predict(X)[0], 0, 100))
    churn = modelo_churn.predict(X)[0]

    return {
        "score_compra": round(score, 1),
        "risco_churn": churn,
    }


if __name__ == "__main__":
    try:
        entrada = sys.stdin.read().strip()
        cliente = json.loads(entrada)

        modelo_scoring, modelo_churn, scaler = carregar_modelos()
        resultado = prever(cliente, modelo_scoring, modelo_churn, scaler)

        print(json.dumps(resultado))
    except Exception as e:
        print(json.dumps({"error": str(e)}), file=sys.stderr)
        sys.exit(1)
