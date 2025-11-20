import { PrismaClient } from 'generated/prisma';

const prisma = new PrismaClient();

async function main() {
  await prisma.user.createMany({
    data: [{ name: 'admin', email: 'admin@gmail.com' }],
    skipDuplicates: true, // optional
  });

  console.log('Database seeded successfully!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
