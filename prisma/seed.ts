import * as bcrypt from 'bcrypt';
import { PrismaClient, Role } from '../generated/prisma';
import { SAMPLE_ITEM_CATEGORIES } from './constants/item-categories';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Seeding database...');

  // ---- RESET TABLES ----
  await prisma.item.deleteMany();
  await prisma.invoice.deleteMany();
  await prisma.shift.deleteMany();
  await prisma.userProfile.deleteMany();
  await prisma.user.deleteMany();
  await prisma.customer.deleteMany();
  await prisma.itemCategory.deleteMany();
  await prisma.platform.deleteMany();

  // ---- CREATE ADMIN USER ----
  const hashedPassword = await bcrypt.hash('password', 10);

  await prisma.user.create({
    data: {
      name: 'admin',
      email: 'admin@gmail.com',
      role: Role.ADMIN,
      password: hashedPassword,
      userProfile: {
        create: {
          color: '#FF5733',
          avatarUrl: null,
          rate: 400,
        },
      },
    },
  });

  // ---- CREATE PLATFORMS ----
  await prisma.platform.createMany({
    data: [
      { name: 'Shopee' },
      { name: 'Lazada' },
      { name: 'Facebook Marketplace' },
    ],
    skipDuplicates: true,
  });

  // ---- CREATE ITEM CATEGORIES ----
  await prisma.itemCategory.createMany({
    data: SAMPLE_ITEM_CATEGORIES,
    skipDuplicates: true,
  });

  console.log('✅ Database seeded successfully!');
}

main()
  .catch((e) => {
    console.error('❌ Seed error:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
