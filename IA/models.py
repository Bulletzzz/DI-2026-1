import pandas as pd
from sklearn.ensemble import RandomForestClassifier, RandomForestRegressor
from sklearn.metrics import classification_report, mean_absolute_error, r2_score
from sklearn.model_selection import train_test_split

FEATURES = [
    "total_pedidos",
    "ticket_medio",
    "tempo_como_cliente",
    "dias_desde_ultimo_pedido",
    "tem_plano",
]


def treinar_scoring(df: pd.DataFrame) -> RandomForestRegressor:
    X = df[FEATURES]
    y = df["score_compra"]

    X_train, X_test, y_train, y_test = train_test_split(
        X, y, test_size=0.2, random_state=42
    )

    modelo = RandomForestRegressor(
        n_estimators=100,
        max_depth=8,
        min_samples_leaf=4,
        random_state=42,
        n_jobs=-1,
    )
    modelo.fit(X_train, y_train)

    y_pred = modelo.predict(X_test)
    mae = mean_absolute_error(y_test, y_pred)
    r2 = r2_score(y_test, y_pred)
    print(f"[SCORING] MAE: {mae:.2f} | R²: {r2:.4f}")

    return modelo


def treinar_churn(df: pd.DataFrame) -> RandomForestClassifier:
    X = df[FEATURES]
    y = df["churn_label"]

    X_train, X_test, y_train, y_test = train_test_split(
        X, y, test_size=0.2, random_state=42, stratify=y
    )

    modelo = RandomForestClassifier(
        n_estimators=100,
        max_depth=8,
        min_samples_leaf=4,
        class_weight="balanced",
        random_state=42,
        n_jobs=-1,
    )
    modelo.fit(X_train, y_train)

    y_pred = modelo.predict(X_test)
    print("[CHURN] Relatório de classificação:")
    print(classification_report(y_test, y_pred))

    return modelo
