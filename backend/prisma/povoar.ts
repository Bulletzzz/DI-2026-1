import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

function gerador(semente: number) {
  return () => {
    semente |= 0;
    semente = (semente + 0x6d2b79f5) | 0;
    let t = Math.imul(semente ^ (semente >>> 15), 1 | semente);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

const aleatorio = gerador(42);
const inteiro = (min: number, max: number) => Math.floor(aleatorio() * (max - min + 1)) + min;
const escolher = <T>(lista: T[]): T => lista[inteiro(0, lista.length - 1)];
const sortear = (chance: number) => aleatorio() < chance;

const HOJE = new Date();
function diasAtras(dias: number): Date {
  const data = new Date(HOJE);
  data.setDate(data.getDate() - dias);
  return data;
}

const NOMES = [
  'Bernardo', 'Eduardo', 'Rafael', 'Gustavo', 'Thiago', 'Lucas', 'Matheus', 'Felipe',
  'Bruno', 'Diego', 'Vinicius', 'Caio', 'Andre', 'Rodrigo', 'Leonardo', 'Henrique',
  'Igor', 'Otavio', 'Marcelo', 'Fernanda', 'Juliana', 'Camila', 'Beatriz', 'Larissa',
  'Amanda', 'Carolina', 'Mariana', 'Aline', 'Patricia', 'Vanessa', 'Leticia', 'Gabriela',
];
const SOBRENOMES = [
  'Barbosa', 'Manga', 'Moaca', 'Souza', 'Oliveira', 'Pereira', 'Costa', 'Almeida',
  'Nunes', 'Rocha', 'Carvalho', 'Ribeiro', 'Gomes', 'Martins', 'Araujo', 'Teixeira',
  'Cardoso', 'Moreira', 'Barros', 'Pinto', 'Dias', 'Freitas', 'Mendes', 'Lima',
];

const LOCAIS_BR: [string, string][] = [
  ['Sao Paulo', 'SP'], ['Rio de Janeiro', 'RJ'], ['Belo Horizonte', 'MG'], ['Curitiba', 'PR'],
  ['Porto Alegre', 'RS'], ['Salvador', 'BA'], ['Recife', 'PE'], ['Fortaleza', 'CE'],
  ['Brasilia', 'DF'], ['Florianopolis', 'SC'], ['Goiania', 'GO'], ['Manaus', 'AM'],
  ['Belem', 'PA'], ['Vitoria', 'ES'], ['Natal', 'RN'], ['Campinas', 'SP'],
  ['Londrina', 'PR'], ['Uberlandia', 'MG'],
];
const LOCAIS_EXTERIOR: [string, string, string][] = [
  ['Buenos Aires', 'Buenos Aires', 'Argentina'], ['Lisboa', 'Lisboa', 'Portugal'],
  ['Miami', 'Florida', 'Estados Unidos'], ['Santiago', 'Santiago', 'Chile'],
  ['Montevideu', 'Montevideu', 'Uruguai'],
];

const PLANOS: [string, number][] = [
  ['Plano Mensal', 99.9], ['Plano Trimestral', 269.9], ['Plano Semestral', 539.9], ['Plano Anual', 959.9],
];
const SUPLEMENTOS: [string, number][] = [
  ['Whey Protein Concentrado - Chocolate 900g', 129.9],
  ['Whey Protein Isolado - Baunilha 900g', 159.9],
  ['Whey Protein Isolado - Morango 900g', 159.9],
  ['Creatina Monohidratada 300g', 119.9],
  ['Creatina Creapure 250g', 149.9],
  ['BCAA 2:1:1 200g', 79.9],
  ['Glutamina 300g', 89.9],
  ['Pre-Treino Insano 300g', 99.9],
  ['Albumina 500g', 39.9],
  ['Hipercalorico Mass 3kg', 139.9],
  ['Termogenico Hot 60caps', 89.9],
  ['Omega 3 1000mg 120caps', 49.9],
  ['Multivitaminico 90caps', 59.9],
  ['Pasta de Amendoim 1kg', 29.9],
  ['Barra de Proteina Chocolate cx12', 69.9],
  ['Cafeina 200mg 60caps', 34.9],
  ['ZMA 120caps', 64.9],
  ['Colageno 300g', 54.9],
];

const ARQUETIPOS = {
  fiel: { pedidos: [10, 40], recencia: [0, 30], chancePlano: 0.9, cadastro: [300, 1500] },
  regular: { pedidos: [3, 10], recencia: [30, 120], chancePlano: 0.6, cadastro: [200, 1200] },
  emRisco: { pedidos: [1, 5], recencia: [150, 400], chancePlano: 0.2, cadastro: [200, 1500] },
  novo: { pedidos: [1, 3], recencia: [0, 60], chancePlano: 0.5, cadastro: [30, 120] },
};

type ClienteGerado = {
  nome: string;
  email: string;
  cidade: string;
  estado: string;
  pais: string;
  temPlano: boolean;
  criadoEm: Date;
  cadastroDias: number;
  recencia: number;
  quantidadePedidos: number;
};

function arquetipoDe(indice: number) {
  const fracao = indice / 500;
  if (fracao < 0.2) return ARQUETIPOS.fiel;
  if (fracao < 0.55) return ARQUETIPOS.regular;
  if (fracao < 0.85) return ARQUETIPOS.emRisco;
  return ARQUETIPOS.novo;
}

async function limpar() {
  await prisma.itemPedido.deleteMany();
  await prisma.pedido.deleteMany();
  await prisma.produto.deleteMany();
  await prisma.categoria.deleteMany();
  await prisma.cliente.deleteMany();
}

async function criarProdutos() {
  const planos = await prisma.categoria.create({ data: { nome: 'Planos' } });
  const suplementos = await prisma.categoria.create({ data: { nome: 'Suplementos' } });

  await prisma.produto.createMany({
    data: [
      ...PLANOS.map(([nome, preco]) => ({ nome, preco, estoque: 9999, categoriaId: planos.id })),
      ...SUPLEMENTOS.map(([nome, preco]) => ({ nome, preco, estoque: inteiro(40, 500), categoriaId: suplementos.id })),
    ],
  });

  return prisma.produto.findMany({ select: { id: true, preco: true } });
}

function gerarClientes(): ClienteGerado[] {
  const usados = new Set<string>();
  const clientes: ClienteGerado[] = [];

  for (let i = 0; i < 500; i++) {
    const arquetipo = arquetipoDe(i);
    const nome = `${escolher(NOMES)} ${escolher(SOBRENOMES)}`;
    const exterior = sortear(0.12);
    const [cidade, estado, pais] = exterior
      ? escolher(LOCAIS_EXTERIOR)
      : [...escolher(LOCAIS_BR), 'Brasil'];

    let email = `${nome.toLowerCase().replace(/ /g, '.')}${i}@beast-mail.com`;
    while (usados.has(email)) email = `${nome.toLowerCase().replace(/ /g, '.')}${i}.${inteiro(1, 999)}@beast-mail.com`;
    usados.add(email);

    const cadastroDias = inteiro(arquetipo.cadastro[0], arquetipo.cadastro[1]);
    const recencia = Math.min(inteiro(arquetipo.recencia[0], arquetipo.recencia[1]), cadastroDias);

    clientes.push({
      nome,
      email,
      cidade,
      estado,
      pais,
      temPlano: sortear(arquetipo.chancePlano),
      criadoEm: diasAtras(cadastroDias),
      cadastroDias,
      recencia,
      quantidadePedidos: inteiro(arquetipo.pedidos[0], arquetipo.pedidos[1]),
    });
  }

  return clientes;
}

async function criarClientes(clientes: ClienteGerado[]) {
  await prisma.cliente.createMany({
    data: clientes.map(({ nome, email, cidade, estado, pais, temPlano, criadoEm }) => ({
      nome, email, cidade, estado, pais, temPlano, criadoEm,
    })),
  });
  return prisma.cliente.findMany({ orderBy: { id: 'asc' }, select: { id: true } });
}

async function criarPedidos(
  clientes: ClienteGerado[],
  ids: { id: number }[],
  produtos: { id: number; preco: number }[],
) {
  const pedidos: { clienteId: number; total: number; criadoEm: Date }[] = [];
  const itensPorPedido: { produtoId: number; quantidade: number }[][] = [];

  clientes.forEach((cliente, indice) => {
    const clienteId = ids[indice].id;
    const dias = [cliente.recencia];
    for (let p = 1; p < cliente.quantidadePedidos; p++) {
      dias.push(inteiro(cliente.recencia, cliente.cadastroDias));
    }

    for (const d of dias) {
      const itens: { produtoId: number; quantidade: number }[] = [];
      const quantos = inteiro(1, 4);
      const escolhidos = new Set<number>();
      for (let k = 0; k < quantos; k++) {
        const produto = escolher(produtos);
        if (escolhidos.has(produto.id)) continue;
        escolhidos.add(produto.id);
        itens.push({ produtoId: produto.id, quantidade: inteiro(1, 3) });
      }
      const total = itens.reduce((soma, item) => {
        const produto = produtos.find((p) => p.id === item.produtoId)!;
        return soma + produto.preco * item.quantidade;
      }, 0);

      pedidos.push({ clienteId, total: Math.round(total * 100) / 100, criadoEm: diasAtras(d) });
      itensPorPedido.push(itens);
    }
  });

  await prisma.pedido.createMany({ data: pedidos });
  const criados = await prisma.pedido.findMany({ orderBy: { id: 'asc' }, select: { id: true } });

  const itens = criados.flatMap((pedido, indice) =>
    itensPorPedido[indice].map((item) => ({ pedidoId: pedido.id, ...item })),
  );
  await prisma.itemPedido.createMany({ data: itens });

  return { pedidos: pedidos.length, itens: itens.length };
}

async function main() {
  console.log('Limpando banco...');
  await limpar();

  console.log('Criando produtos...');
  const produtos = await criarProdutos();

  console.log('Gerando 500 clientes...');
  const clientes = gerarClientes();
  const ids = await criarClientes(clientes);

  console.log('Gerando pedidos...');
  const resumo = await criarPedidos(clientes, ids, produtos);

  console.log(`Pronto: ${clientes.length} clientes, ${resumo.pedidos} pedidos, ${resumo.itens} itens.`);
}

main()
  .catch((erro) => {
    console.error(erro);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
