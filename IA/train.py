from data_generator import gerar_dados_sinteticos
from models import treinar_churn, treinar_scoring
from preprocessor import preprocessar
from storage import salvar_modelos


def main() -> None:
    print("=" * 50)
    print("  BEAST — Treinamento dos Modelos de IA")
    print("=" * 50)

    print("\n[1/4] Gerando dados sintéticos...")
    df_raw = gerar_dados_sinteticos(n=500)
    print(f"      {len(df_raw)} registros gerados.")
    print(f"      Distribuição churn:\n{df_raw['churn_label'].value_counts().to_string()}")

    print("\n[2/4] Pré-processando dados...")
    df, scaler = preprocessar(df_raw)
    print(f"      {len(df)} registros após limpeza.")

    print("\n[3/4] Treinando modelo de scoring de compra...")
    modelo_scoring = treinar_scoring(df)

    print("\n[4/4] Treinando modelo de risco de churn...")
    modelo_churn = treinar_churn(df)

    salvar_modelos(modelo_scoring, modelo_churn, scaler)

    print("\n✓ Treinamento concluído! Execute 'python predict.py' para testar.")


if __name__ == "__main__":
    main()
