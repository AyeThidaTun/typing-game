import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function main() {
  await prisma.user.deleteMany();
  await prisma.user.createMany({
    data: [
      { name: "User1", email: "user1@example.com", password: "password123" },
      { name: "User2", email: "user2@example.com", password: "password456" },
    ],
  });
  console.log("🌱 Database seeded!");
}

main()
  .then(() => prisma.$disconnect())
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
