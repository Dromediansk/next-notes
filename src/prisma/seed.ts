import { testNotes, testUsers } from "./testData";
import { prisma } from "./db";

async function main() {
  console.log(`Start seeding ...`);
  // Users
  await Promise.all(
    testUsers.map(async (user) =>
      prisma.user.upsert({
        where: { id: user.id },
        update: {},
        create: user,
      })
    )
  );

  // Notes
  await Promise.all(
    testNotes.map(async (note) =>
      prisma.note.upsert({
        where: { id: note.id },
        update: {},
        create: note,
      })
    )
  );

  console.log("Data added successfully!");
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
