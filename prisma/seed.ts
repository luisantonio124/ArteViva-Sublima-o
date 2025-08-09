import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const categories = [
    {
      name: "Camisetas",
      products: [
        {
          name: "Camiseta Básica",
          description: "Camiseta de algodão para sublimação",
          price: 39.9,
          imageUrl: "/images/camiseta-basica.jpg",
        },
        {
          name: "Camiseta Premium",
          description: "Camiseta premium pronta para personalização",
          price: 59.9,
          imageUrl: "/images/camiseta-premium.jpg",
        },
      ],
    },
    {
      name: "Canecas",
      products: [
        {
          name: "Caneca de Cerâmica",
          description: "Caneca branca para sublimação",
          price: 19.9,
          imageUrl: "/images/caneca-ceramica.jpg",
        },
        {
          name: "Caneca Mágica",
          description: "Caneca que revela a estampa com líquido quente",
          price: 29.9,
          imageUrl: "/images/caneca-magica.jpg",
        },
      ],
    },
  ];

  for (const category of categories) {
    await prisma.category.create({
      data: {
        name: category.name,
        products: {
          create: category.products,
        },
      },
    });
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
