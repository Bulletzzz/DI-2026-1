import numpy as np
import pandas as pd


def rotular(df: pd.DataFrame) -> pd.DataFrame:
    df = df.copy()

    score_raw = (
        (df["total_pedidos"] / 40) * 40
        + (df["ticket_medio"] / 600) * 30
        + (1 - df["dias_desde_ultimo_pedido"] / 400) * 20
        + df["tem_plano"] * 10
    )
    df["score_compra"] = np.clip(score_raw, 0, 100).round(1)

    churn_score = (
        (df["dias_desde_ultimo_pedido"] / 400) * 50
        + (1 - df["tem_plano"]) * 30
        + (1 - df["total_pedidos"] / 40) * 20
    )
    df["churn_label"] = np.where(
        churn_score >= 55, "alto", np.where(churn_score >= 30, "médio", "baixo")
    )

    return df
