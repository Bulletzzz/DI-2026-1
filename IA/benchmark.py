import os
import warnings

import matplotlib.pyplot as plt
import numpy as np
import pandas as pd
from sklearn.ensemble import RandomForestClassifier, RandomForestRegressor
from sklearn.metrics import (
    accuracy_score,
    mean_absolute_error,
    r2_score,
)
from sklearn.model_selection import learning_curve, train_test_split

from data_generator import gerar_dados_sinteticos
from preprocessor import preprocessar

warnings.filterwarnings("ignore")

FEATURES = [
    "total_pedidos",
    "ticket_medio",
    "tempo_como_cliente",
    "dias_desde_ultimo_pedido",
    "tem_plano",
]

FEATURES_PT = [
    "Total de Pedidos",
    "Ticket Médio",
    "Tempo como Cliente",
    "Dias s/ Pedido",
    "Tem Plano",
]

OUTPUT_DIR = os.path.join(os.path.dirname(__file__), "benchmarks")

# Paleta BEAST
COR_PRIMARIA  = "#f97316"
COR_SECUNDARIA = "#facc15"
COR_FUNDO     = "#0f0f0f"
COR_GRADE     = "#2a2a2a"
COR_TEXTO     = "#ffffff"


def aplicar_tema(ax: plt.Axes, titulo: str, xlabel: str, ylabel: str) -> None:
    ax.set_facecolor(COR_FUNDO)
    ax.set_title(titulo, color=COR_TEXTO, fontsize=13, fontweight="bold", pad=12)
    ax.set_xlabel(xlabel, color=COR_TEXTO, fontsize=10)
    ax.set_ylabel(ylabel, color=COR_TEXTO, fontsize=10)
    ax.tick_params(colors=COR_TEXTO)
    ax.grid(color=COR_GRADE, linestyle="--", linewidth=0.6)
    for spine in ax.spines.values():
        spine.set_edgecolor(COR_GRADE)


def benchmark_curva_aprendizado(df: pd.DataFrame) -> None:
    print("[BENCHMARK] Gerando curvas de aprendizado...")

    fig, axes = plt.subplots(1, 2, figsize=(14, 5))
    fig.patch.set_facecolor(COR_FUNDO)

    tamanhos = np.linspace(0.1, 1.0, 8)

    X = df[FEATURES]
    y_score = df["score_compra"]

    train_sizes, train_scores, val_scores = learning_curve(
        RandomForestRegressor(n_estimators=100, max_depth=8, min_samples_leaf=4, random_state=42, n_jobs=-1),
        X, y_score,
        train_sizes=tamanhos,
        cv=5,
        scoring="r2",
        n_jobs=-1,
    )

    train_mean = train_scores.mean(axis=1)
    val_mean   = val_scores.mean(axis=1)
    train_std  = train_scores.std(axis=1)
    val_std    = val_scores.std(axis=1)

    ax = axes[0]
    ax.plot(train_sizes, train_mean, color=COR_PRIMARIA,   label="Treino",   linewidth=2)
    ax.plot(train_sizes, val_mean,   color=COR_SECUNDARIA, label="Validação", linewidth=2)
    ax.fill_between(train_sizes, train_mean - train_std, train_mean + train_std, alpha=0.15, color=COR_PRIMARIA)
    ax.fill_between(train_sizes, val_mean   - val_std,   val_mean   + val_std,   alpha=0.15, color=COR_SECUNDARIA)
    ax.legend(facecolor=COR_FUNDO, labelcolor=COR_TEXTO)
    aplicar_tema(ax, "Curva de Aprendizado — Scoring", "Amostras de treino", "R²")

    y_churn = df["churn_label"]

    train_sizes2, train_scores2, val_scores2 = learning_curve(
        RandomForestClassifier(n_estimators=100, max_depth=8, min_samples_leaf=4, class_weight="balanced", random_state=42, n_jobs=-1),
        X, y_churn,
        train_sizes=tamanhos,
        cv=5,
        scoring="accuracy",
        n_jobs=-1,
    )

    train_mean2 = train_scores2.mean(axis=1)
    val_mean2   = val_scores2.mean(axis=1)
    train_std2  = train_scores2.std(axis=1)
    val_std2    = val_scores2.std(axis=1)

    ax2 = axes[1]
    ax2.plot(train_sizes2, train_mean2, color=COR_PRIMARIA,   label="Treino",   linewidth=2)
    ax2.plot(train_sizes2, val_mean2,   color=COR_SECUNDARIA, label="Validação", linewidth=2)
    ax2.fill_between(train_sizes2, train_mean2 - train_std2, train_mean2 + train_std2, alpha=0.15, color=COR_PRIMARIA)
    ax2.fill_between(train_sizes2, val_mean2   - val_std2,   val_mean2   + val_std2,   alpha=0.15, color=COR_SECUNDARIA)
    ax2.legend(facecolor=COR_FUNDO, labelcolor=COR_TEXTO)
    aplicar_tema(ax2, "Curva de Aprendizado — Churn", "Amostras de treino", "Acurácia")

    plt.tight_layout()
    caminho = os.path.join(OUTPUT_DIR, "curva_aprendizado.png")
    plt.savefig(caminho, dpi=150, bbox_inches="tight", facecolor=COR_FUNDO)
    plt.close()
    print(f"  → Salvo em {caminho}")



def benchmark_feature_importance(df: pd.DataFrame) -> None:
    print("[BENCHMARK] Gerando importância das features...")

    X = df[FEATURES]

    modelo_scoring = RandomForestRegressor(n_estimators=100, max_depth=8, min_samples_leaf=4, random_state=42, n_jobs=-1)
    modelo_scoring.fit(X, df["score_compra"])

    modelo_churn = RandomForestClassifier(n_estimators=100, max_depth=8, min_samples_leaf=4, class_weight="balanced", random_state=42, n_jobs=-1)
    modelo_churn.fit(X, df["churn_label"])

    fig, axes = plt.subplots(1, 2, figsize=(14, 5))
    fig.patch.set_facecolor(COR_FUNDO)

    for ax, modelo, titulo in zip(
        axes,
        [modelo_scoring, modelo_churn],
        ["Importância das Features — Scoring", "Importância das Features — Churn"],
    ):
        importancias = modelo.feature_importances_
        indices = np.argsort(importancias)

        bars = ax.barh(
            [FEATURES_PT[i] for i in indices],
            importancias[indices],
            color=COR_PRIMARIA,
            edgecolor=COR_GRADE,
        )

        for bar, val in zip(bars, importancias[indices]):
            ax.text(
                bar.get_width() + 0.005, bar.get_y() + bar.get_height() / 2,
                f"{val:.3f}",
                va="center", color=COR_TEXTO, fontsize=9,
            )

        aplicar_tema(ax, titulo, "Importância (Gini)", "Feature")

    plt.tight_layout()
    caminho = os.path.join(OUTPUT_DIR, "feature_importance.png")
    plt.savefig(caminho, dpi=150, bbox_inches="tight", facecolor=COR_FUNDO)
    plt.close()
    print(f"  → Salvo em {caminho}")


def benchmark_n_estimators(df: pd.DataFrame) -> None:
    print("[BENCHMARK] Comparando número de árvores (50, 100, 200)...")

    X = df[FEATURES]
    y_score = df["score_compra"]
    y_churn = df["churn_label"]

    X_train, X_test, ys_train, ys_test, yc_train, yc_test = train_test_split(
        X, y_score, y_churn, test_size=0.2, random_state=42
    )

    n_lista = [50, 100, 200]
    resultados = []

    for n in n_lista:
        reg = RandomForestRegressor(n_estimators=n, max_depth=8, min_samples_leaf=4, random_state=42, n_jobs=-1)
        reg.fit(X_train, ys_train)
        mae = mean_absolute_error(ys_test, reg.predict(X_test))
        r2  = r2_score(ys_test, reg.predict(X_test))

        clf = RandomForestClassifier(n_estimators=n, max_depth=8, min_samples_leaf=4, class_weight="balanced", random_state=42, n_jobs=-1)
        clf.fit(X_train, yc_train)
        acc = accuracy_score(yc_test, clf.predict(X_test))

        resultados.append({"n": n, "MAE": mae, "R2": r2, "Acurácia Churn": acc})
        print(f"  n={n:3d} | MAE={mae:.2f} | R²={r2:.4f} | Acc Churn={acc:.4f}")

    df_res = pd.DataFrame(resultados)

    fig, axes = plt.subplots(1, 3, figsize=(15, 5))
    fig.patch.set_facecolor(COR_FUNDO)

    metricas = [
        ("MAE",            "MAE (erro médio)",     "Scoring — MAE por nº de árvores",    True),
        ("R2",             "R²",                   "Scoring — R² por nº de árvores",     False),
        ("Acurácia Churn", "Acurácia",             "Churn — Acurácia por nº de árvores", False),
    ]

    for ax, (col, ylabel, titulo, inverter) in zip(axes, metricas):
        cores = [COR_PRIMARIA if not inverter else COR_SECUNDARIA] * 3
        bars = ax.bar([str(n) for n in n_lista], df_res[col], color=cores, edgecolor=COR_GRADE, width=0.5)

        for bar, val in zip(bars, df_res[col]):
            ax.text(
                bar.get_x() + bar.get_width() / 2,
                bar.get_height() + 0.002,
                f"{val:.3f}",
                ha="center", va="bottom", color=COR_TEXTO, fontsize=10, fontweight="bold",
            )

        aplicar_tema(ax, titulo, "Número de árvores", ylabel)
        margem = (df_res[col].max() - df_res[col].min()) * 0.5 or 0.5
        ax.set_ylim(df_res[col].min() - margem, df_res[col].max() + margem * 1.5)

    plt.tight_layout()
    caminho = os.path.join(OUTPUT_DIR, "n_estimators.png")
    plt.savefig(caminho, dpi=150, bbox_inches="tight", facecolor=COR_FUNDO)
    plt.close()
    print(f"  → Salvo em {caminho}")


if __name__ == "__main__":
    os.makedirs(OUTPUT_DIR, exist_ok=True)

    print("=" * 50)
    print("  BEAST — Benchmarks")
    print("=" * 50)

    print("\nPreparando dados...")
    df_raw = gerar_dados_sinteticos(n=500)
    df, _  = preprocessar(df_raw)

    benchmark_curva_aprendizado(df)
    benchmark_feature_importance(df)
    benchmark_n_estimators(df)

    print(f"\n✓ Todos os benchmarks salvos em: benchmarks/")
