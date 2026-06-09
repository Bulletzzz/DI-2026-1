import numpy as np
import pandas as pd

from rotulagem import rotular


def gerar_dados_sinteticos(n: int = 500, seed: int = 42) -> pd.DataFrame:
    rng = np.random.default_rng(seed)

    df = pd.DataFrame({
        "total_pedidos": rng.integers(1, 40, size=n),
        "ticket_medio": rng.uniform(50, 600, size=n).round(2),
        "tempo_como_cliente": rng.integers(30, 1500, size=n),
        "dias_desde_ultimo_pedido": rng.integers(0, 400, size=n),
        "tem_plano": rng.integers(0, 2, size=n),
    })

    return rotular(df)
