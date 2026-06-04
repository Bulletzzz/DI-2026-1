# BEAST — Documento de Requisitos

**Bernardo's Enterprise Analytics & Sales Tracker**
Desafio Integrador 5°P "B" — Engenharia de Software
Grupo: Bernardo Kuster Ragugnetti, Eduardo Sochodolak, Pedro Henrique Moreira

---

## 1. Visão Geral

O BEAST é um sistema web de análise de dados para uma academia fictícia. Os
gestores hoje interpretam vendas e cancelamentos diretamente de planilhas, o que
dificulta a tomada de decisão estratégica. O sistema centraliza o cadastro de
alunos, planos e suplementos, registra os pedidos e apresenta painéis de
visualização e classificação de clientes com apoio de um modelo de Random Forest
para scoring de propensão à compra e risco de cancelamento (churn).

## 2. Escopo

O sistema cobre quatro frentes:

- Cadastro e manutenção de clientes, categorias, produtos e pedidos.
- Visualização de indicadores de vendas e de clientes por meio de gráficos.
- Classificação de clientes por scoring e risco de churn via Random Forest.
- Geração de relatórios gerenciais e de tomada de decisão estratégica.

Não faz parte do escopo: integração com gateways de pagamento, emissão fiscal e
qualquer uso de APIs de modelos de linguagem (proibido pelo desafio).

## 3. Atores

- **Gestor**: acessa o painel, consulta indicadores, relatórios e a classificação
  de clientes para apoiar decisões.
- **Operador**: realiza os cadastros e registra os pedidos.

## 4. Requisitos Funcionais

| ID | Requisito | Descrição |
|----|-----------|-----------|
| RF01 | Cadastro de Clientes | Manter clientes com id, nome, e-mail, cidade, estado e país. E-mail obrigatório e em formato válido. |
| RF02 | Cadastro de Categorias | Manter categorias (Planos e Suplementos). |
| RF03 | Cadastro de Produtos | Manter produtos com id, nome, preço, estoque e categoria opcional. Preço positivo e estoque não negativo. |
| RF04 | Criação de Pedidos | Registrar pedido vinculado a um cliente, contendo uma ou mais unidades de produtos. |
| RF05 | Listagem e busca | Listar e filtrar clientes, produtos e pedidos com as informações relevantes. |
| RF06 | Visualização de dados | Exibir gráficos de vendas e clientes: total de vendas, top clientes, produto mais vendido, produto de maior valor e vendas por estado, país e cidade. |
| RF07 | Classificação de clientes | Exibir o scoring de propensão à compra e o risco de churn de cada cliente. |
| RF08 | Auxílio à decisão | Apresentar interface com a classificação dos clientes e a taxa de cancelamento (churn). |
| RF09 | Relatórios gerenciais | Disponibilizar ao menos dois relatórios de análise dos dados cadastrados. |
| RF10 | Relatórios de decisão | Disponibilizar ao menos dois relatórios de tomada de decisão estratégica. |
| RF11 | Exportação | Exportar relatórios de decisão em imagem ou PDF. |

## 5. Requisitos Não Funcionais

| ID | Requisito | Descrição |
|----|-----------|-----------|
| RNF01 | Responsividade | A interface deve se adaptar a desktop e dispositivos móveis. |
| RNF02 | Persistência | Dados armazenados em banco relacional. |
| RNF03 | Validação | Inputs tratados e validados conforme a necessidade de cada campo. |
| RNF04 | Tratamento de erros | Erros do servidor exibidos de forma clara ao usuário, com opção de nova tentativa. |
| RNF05 | Desempenho dos relatórios | Geração de relatórios em tempo aceitável, sem ultrapassar duas horas. |
| RNF06 | Qualidade dos dados da IA | Remoção de duplicatas, tratamento de outliers e normalização (Z-Score ou Min-Max) antes do treino. |
| RNF07 | Restrição de IA | Proibido o uso de APIs de modelos de linguagem; classificação somente via Random Forest. |
| RNF08 | Modularização | Separação de responsabilidades entre front, back e IA, com tipagem e padronização de código. |
| RNF09 | Versionamento | Git com commits atômicos, frequentes e mensagens semânticas. |
| RNF10 | Identidade visual | Tema escuro brutalista, paleta fundo `#0f0f0f`, primária `#f97316`, texto `#ffffff`. |

## 6. Regras de Negócio

- **RN01** — O e-mail do cliente deve ser único e válido.
- **RN02** — O preço de um produto deve ser maior que zero.
- **RN03** — O estoque de um produto não pode ser negativo.
- **RN04** — Um pedido deve conter ao menos um item.
- **RN05** — A baixa de estoque ocorre na criação do pedido e não pode deixar o estoque negativo.
- **RN06** — O total do pedido é a soma dos subtotais dos seus itens.
- **RN07** — O risco de churn é classificado em alto, médio ou baixo.
- **RN08** — O scoring de propensão à compra varia de 0 a 100.

## 7. Modelos de IA

### 7.1 Scoring de propensão à compra
Modelo de Random Forest que estima, de 0 a 100, a propensão de recompra do cliente
a partir de frequência de pedidos, ticket médio e tempo como cliente.

### 7.2 Risco de churn
Modelo de Random Forest que classifica o cliente em risco alto, médio ou baixo de
cancelamento, considerando inatividade, tempo desde o último pedido e tipo de plano.

### 7.3 Tratamento dos dados
Antes do treino são removidos registros duplicados, tratados outliers e aplicada
normalização (Z-Score ou Min-Max). A seleção do modelo considera o tamanho da base
e o poder computacional disponível.

## 8. Arquitetura

| Camada | Tecnologia | Responsabilidade |
|--------|-----------|------------------|
| Frontend | Next.js 16 + TypeScript + Tailwind v4 | Interface, gráficos, formulários e consumo da API. |
| Backend | NestJS (TypeScript) | CRUDs, regras de negócio, relatórios e exposição dos resultados da IA. |
| IA | Python + Random Forest | Pré-processamento, treino e geração de scoring e churn. |
| Persistência | Banco relacional | Armazenamento dos dados cadastrais e transacionais. |

A comunicação entre front e back é feita por requisições HTTP em JSON. O backend
roda na porta 3001 com CORS habilitado para o frontend.

## 9. Entidades

- **Cliente** — id, nome, email, cidade, estado, país, data de cadastro.
- **Categoria** — id, nome (Planos ou Suplementos).
- **Produto** — id, nome, preço, estoque, categoria (opcional).
- **Pedido** — id, cliente, data e itens.
- **ItemPedido** — produto e quantidade dentro de um pedido.
