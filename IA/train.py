import pandas as pd

from db import buscar_features_clientes
from models import treinar_churn, treinar_scoring
from preprocessor import preprocessar
from rotulagem import rotular
from storage import salvar_modelos

FEATURES = [
    "total_pedidos",
    "ticket_medio",
    "tempo_como_cliente",
    "dias_desde_ultimo_pedido",
    "tem_plano",
]


def carregar_dados_reais() -> pd.DataFrame:
    registros = buscar_features_clientes()
    df = pd.DataFrame(registros)[FEATURES]
    return rotular(df)


def main() -> None:
    print("=" * 50)
    print("  BEAST — Treinamento dos Modelos de IA")
    print("=" * 50)

    print("\n[1/4] Carregando dados reais do banco...")
    df_raw = carregar_dados_reais()
    print(f"      {len(df_raw)} clientes carregados.")
    print(f"      Distribuição churn:\n{df_raw['churn_label'].value_counts().to_string()}")

    print("\n[2/4] Pré-processando dados...")
    df, scaler = preprocessar(df_raw)
    print(f"      {len(df)} registros após limpeza.")

    print("\n[3/4] Treinando modelo de scoring de compra...")
    modelo_scoring = treinar_scoring(df)

    print("\n[4/4] Treinando modelo de risco de churn...")
    modelo_churn = treinar_churn(df)

    salvar_modelos(modelo_scoring, modelo_churn, scaler)

    print("\nTreinamento concluído! Execute 'python predict.py' para testar.")


if __name__ == "__main__":
    main()
