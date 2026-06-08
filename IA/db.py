import os
from datetime import date, datetime

import psycopg2
from dotenv import load_dotenv
from psycopg2.extras import RealDictCursor

load_dotenv()

DATABASE_URL = os.environ["DATABASE_URL"]


def buscar_features_clientes() -> list[dict]:
    with psycopg2.connect(DATABASE_URL, cursor_factory=RealDictCursor) as conn:
        with conn.cursor() as cur:
            cur.execute("""
                SELECT
                    c.id                       AS cliente_id,
                    c."criadoEm"               AS criado_em,
                    c."temPlano"               AS tem_plano,
                    COUNT(p.id)                AS total_pedidos,
                    COALESCE(AVG(p.total), 0)  AS ticket_medio,
                    MAX(p."criadoEm")          AS ultimo_pedido
                FROM "Cliente" c
                LEFT JOIN "Pedido" p ON p."clienteId" = c.id
                GROUP BY c.id, c."criadoEm", c."temPlano"
            """)
            rows = list(cur.fetchall())

    hoje = date.today()
    resultado = []

    for row in rows:
        criado_em = row["criado_em"]
        if isinstance(criado_em, datetime):
            criado_em = criado_em.date()

        ultimo_pedido = row["ultimo_pedido"]
        tempo_como_cliente = (hoje - criado_em).days

        if ultimo_pedido:
            if isinstance(ultimo_pedido, datetime):
                ultimo_pedido = ultimo_pedido.date()
            dias_desde_ultimo_pedido = (hoje - ultimo_pedido).days
            ultimo_pedido_str = ultimo_pedido.isoformat()
        else:
            dias_desde_ultimo_pedido = tempo_como_cliente
            ultimo_pedido_str = None

        resultado.append({
            "cliente_id": row["cliente_id"],
            "total_pedidos": int(row["total_pedidos"]),
            "ticket_medio": float(row["ticket_medio"]),
            "tempo_como_cliente": tempo_como_cliente,
            "dias_desde_ultimo_pedido": dias_desde_ultimo_pedido,
            "tem_plano": 1 if row["tem_plano"] else 0,
            "ultimo_pedido": ultimo_pedido_str,
        })

    return resultado
