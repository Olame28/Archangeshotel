const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function main() {
  const rooms = [
    { id: 1, name: "Chambre Standard", type: "standard", price: 50, description: "Confortable et accueillante" },
    { id: 2, name: "Chambre Deluxe", type: "deluxe", price: 100, description: "Spacieuse et luxueuse" },
    { id: 3, name: "Suite VIP", type: "vip", price: 150, description: "L'excellence du luxe" },
  ];

  for (const room of rooms) {
    await prisma.room.upsert({
      where: { id: room.id },
      update: room,
      create: room,
    });
  }

  const halls = [
    { id: 1, name: "Salle Malaika", capacity: 100, price: 200, description: "Réunions & Séminaires" },
    { id: 2, name: "Salle Arche de Noé", capacity: 500, price: 500, description: "Mariages & Grands événements" },
  ];

  for (const hall of halls) {
    await prisma.hall.upsert({
      where: { id: hall.id },
      update: hall,
      create: hall,
    });
  }

  console.log("Database seeded successfully!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
