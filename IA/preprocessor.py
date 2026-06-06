import pandas as pd
from sklearn.preprocessing import MinMaxScaler

COLUNAS_NUMERICAS = [
    "total_pedidos",
    "ticket_medio",
    "tempo_como_cliente",
    "dias_desde_ultimo_pedido",
]


def remover_duplicatas(df: pd.DataFrame) -> pd.DataFrame:
    antes = len(df)
    df = df.drop_duplicates().reset_index(drop=True)
    print(f"[PRÉ-PROC] Duplicatas removidas: {antes - len(df)}")
    return df


def tratar_outliers_iqr(df: pd.DataFrame) -> pd.DataFrame:
    mask = pd.Series([True] * len(df))
    for col in COLUNAS_NUMERICAS:
        q1 = df[col].quantile(0.25)
        q3 = df[col].quantile(0.75)
        iqr = q3 - q1
        lower = q1 - 1.5 * iqr
        upper = q3 + 1.5 * iqr
        mask &= df[col].between(lower, upper)
    antes = len(df)
    df = df[mask].reset_index(drop=True)
    print(f"[PRÉ-PROC] Outliers removidos: {antes - len(df)}")
    return df


def normalizar(df: pd.DataFrame) -> tuple[pd.DataFrame, MinMaxScaler]:
    scaler = MinMaxScaler()
    df = df.copy()
    df[COLUNAS_NUMERICAS] = scaler.fit_transform(df[COLUNAS_NUMERICAS])
    print(f"[PRÉ-PROC] Normalização Min-Max aplicada em: {COLUNAS_NUMERICAS}")
    return df, scaler


def preprocessar(df: pd.DataFrame) -> tuple[pd.DataFrame, MinMaxScaler]:
    df = remover_duplicatas(df)
    df = tratar_outliers_iqr(df)
    df, scaler = normalizar(df)
    return df, scaler
