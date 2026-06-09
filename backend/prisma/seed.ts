import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  const email = process.env.ADMIN_EMAIL ?? 'admin@beast.com';
  const senha = process.env.ADMIN_SENHA ?? 'beast2026';

  const ja_existe = await prisma.usuario.findUnique({ where: { email } });
  if (ja_existe) {
    console.log(`Usuário ${email} já existe.`);
    return;
  }

  const hash = await bcrypt.hash(senha, 10);
  await prisma.usuario.create({ data: { email, senha: hash } });
  console.log(`Usuário admin criado: ${email}`);
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
