import { HashService } from '../src/shared/hash/hash.service';
import { UserType } from '../src/user/types/user-type.enum';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
const hashService = new HashService();

async function main() {
  const clientType = await prisma.userType.create({
    data: {
      type: UserType.CLIENT,
    },
  });

  const professionalType = await prisma.userType.create({
    data: {
      type: UserType.PROFESSIONAL,
    },
  });

  const password = await hashService.generateHash('123123');

  await prisma.user.createMany({
    data: [
      {
        name: 'John Doe',
        email: 'john@doe.com',
        password,
        userTypeId: clientType.id,
      },
      {
        name: 'Jane Doe',
        email: 'jane@doe.com',
        password,
        userTypeId: professionalType.id,
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
