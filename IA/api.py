import os
import time

from dotenv import load_dotenv
from flask import Flask, jsonify

load_dotenv()

TTL_CACHE = int(os.getenv("TTL_CACHE", "300"))

from db import buscar_features_clientes
from predict import prever_lote
from storage import carregar_modelos

app = Flask(__name__)

modelo_scoring, modelo_churn, scaler = carregar_modelos()

NORMALIZAR_CHURN = {"médio": "medio", "alto": "alto", "baixo": "baixo"}


def calcular_todos_scores() -> list[dict]:
    clientes = buscar_features_clientes()
    if not clientes:
        return []

    scores, churns = prever_lote(clientes, modelo_scoring, modelo_churn, scaler)

    resultados = []
    for c, score, churn in zip(clientes, scores, churns):
        resultados.append({
            "clienteId": c["cliente_id"],
            "scoring": float(score),
            "riscoChurn": NORMALIZAR_CHURN.get(churn, churn),
            "ultimoPedido": c["ultimo_pedido"],
            "totalPedidos": c["total_pedidos"],
            "ticketMedio": round(c["ticket_medio"], 2),
        })

    return resultados


_cache = {"dados": None, "quando": 0.0}


def obter_scores() -> list[dict]:
    agora = time.time()
    if _cache["dados"] is None or agora - _cache["quando"] > TTL_CACHE:
        _cache["dados"] = calcular_todos_scores()
        _cache["quando"] = agora
    return _cache["dados"]


@app.route("/scores")
def scores():
    return jsonify(obter_scores())


@app.route("/scores/<int:cliente_id>")
def score_cliente(cliente_id: int):
    todos = obter_scores()
    resultado = next((s for s in todos if s["clienteId"] == cliente_id), None)
    if resultado is None:
        return jsonify({"error": "Cliente não encontrado"}), 404
    return jsonify(resultado)


if __name__ == "__main__":
    port = int(os.getenv("PORT", "5000"))
    app.run(port=port)
