const { PrismaClient } = require('@prisma/client');

async function addInventoryItems() {
  const prisma = new PrismaClient({
    datasources: {
      db: {
        url: "file:../typescript-prisma-tutorial/prisma/dev.db"
      }
    }
  });

  try {
    const ingredients = [
      { name: 'Beef Sirloin', quantity: 50, unit: 'kg', minThreshold: 10, branchId: 1 },
      { name: 'Chicken Breast', quantity: 30, unit: 'kg', minThreshold: 8, branchId: 1 },
      { name: 'Salmon Fillet', quantity: 20, unit: 'kg', minThreshold: 5, branchId: 1 },
      { name: 'Potatoes', quantity: 100, unit: 'kg', minThreshold: 20, branchId: 1 },
      { name: 'Tomatoes', quantity: 25, unit: 'kg', minThreshold: 5, branchId: 1 },
      { name: 'Lettuce', quantity: 15, unit: 'kg', minThreshold: 3, branchId: 1 },
      { name: 'Onions', quantity: 40, unit: 'kg', minThreshold: 8, branchId: 1 },
      { name: 'Olive Oil', quantity: 10, unit: 'liters', minThreshold: 2, branchId: 1 },
      { name: 'Garlic', quantity: 5, unit: 'kg', minThreshold: 1, branchId: 1 },
      { name: 'Salt', quantity: 20, unit: 'kg', minThreshold: 5, branchId: 1 }
    ];

    console.log('Adding inventory items...');
    
    for (const ingredient of ingredients) {
      try {
        await prisma.inventoryItem.create({
          data: ingredient
        });
        console.log(`Created: ${ingredient.name}`);
      } catch (error) {
        console.log(`Skipped existing: ${ingredient.name}`);
      }
    }

    const inventory = await prisma.inventoryItem.findMany({ where: { branchId: 1 } });
    console.log(`Total inventory items: ${inventory.length}`);
    
  } catch (error) {
    console.error('Error:', error);
  } finally {
    await prisma.$disconnect();
  }
}

addInventoryItems();
