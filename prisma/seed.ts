import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  await prisma.userType.createMany({
    data: [
      {
        type: 'Profissional',
      },
      {
        type: 'Cliente',
      },
    ],
  });
}

main()
  .catch((e) => {
    console.log(e);
    process.exit(1);
  })
  .finally(() => {
    prisma.$disconnect();
  });
