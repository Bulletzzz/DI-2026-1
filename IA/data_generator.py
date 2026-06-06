import numpy as np
import pandas as pd


def gerar_dados_sinteticos(n: int = 500, seed: int = 42) -> pd.DataFrame:
    rng = np.random.default_rng(seed)

    total_pedidos = rng.integers(1, 40, size=n)
    ticket_medio = rng.uniform(50, 600, size=n).round(2)
    tempo_como_cliente = rng.integers(30, 1500, size=n)
    dias_desde_ultimo_pedido = rng.integers(0, 400, size=n)
    tem_plano = rng.integers(0, 2, size=n)

    score_raw = (
        (total_pedidos / 40) * 40
        + (ticket_medio / 600) * 30
        + (1 - dias_desde_ultimo_pedido / 400) * 20
        + tem_plano * 10
        + rng.normal(0, 3, size=n)
    )
    score_compra = np.clip(score_raw, 0, 100).round(1)

    churn_score = (
        (dias_desde_ultimo_pedido / 400) * 50
        + ((1 - tem_plano) * 30)
        + ((1 - total_pedidos / 40) * 20)
        + rng.normal(0, 5, size=n)
    )

    def classificar_churn(valor: float) -> str:
        if valor >= 55:
            return "alto"
        elif valor >= 30:
            return "médio"
        return "baixo"

    churn_label = np.array([classificar_churn(v) for v in churn_score])

    return pd.DataFrame({
        "total_pedidos": total_pedidos,
        "ticket_medio": ticket_medio,
        "tempo_como_cliente": tempo_como_cliente,
        "dias_desde_ultimo_pedido": dias_desde_ultimo_pedido,
        "tem_plano": tem_plano,
        "score_compra": score_compra,
        "churn_label": churn_label,
    })
