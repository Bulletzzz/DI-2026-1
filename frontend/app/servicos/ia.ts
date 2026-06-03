import { requisicao } from "./api"
import type { ScoreCliente, ResumoChurn } from "@/app/tipos"

export const listarScores = () => requisicao<ScoreCliente[]>("/ia/scores")

export const buscarScore = (clienteId: number) =>
  requisicao<ScoreCliente>(`/ia/scores/${clienteId}`)

export const resumoChurn = () => requisicao<ResumoChurn>("/ia/resumo-churn")
