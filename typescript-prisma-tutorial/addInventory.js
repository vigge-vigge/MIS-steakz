const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function addInventoryItems() {
  try {
    // Add basic ingredients for common restaurant items
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
      { name: 'Salt', quantity: 20, unit: 'kg', minThreshold: 5, branchId: 1 },
      { name: 'Black Pepper', quantity: 2, unit: 'kg', minThreshold: 0.5, branchId: 1 },
      { name: 'Pasta', quantity: 30, unit: 'kg', minThreshold: 5, branchId: 1 },
      { name: 'Rice', quantity: 50, unit: 'kg', minThreshold: 10, branchId: 1 },
      { name: 'Flour', quantity: 25, unit: 'kg', minThreshold: 5, branchId: 1 },
      { name: 'Butter', quantity: 8, unit: 'kg', minThreshold: 2, branchId: 1 },
      { name: 'Cheese', quantity: 12, unit: 'kg', minThreshold: 3, branchId: 1 },
      { name: 'Milk', quantity: 20, unit: 'liters', minThreshold: 5, branchId: 1 },
      { name: 'Eggs', quantity: 200, unit: 'pieces', minThreshold: 50, branchId: 1 },
      { name: 'Bread', quantity: 30, unit: 'loaves', minThreshold: 10, branchId: 1 },
      { name: 'Mushrooms', quantity: 8, unit: 'kg', minThreshold: 2, branchId: 1 },
      { name: 'Bell Peppers', quantity: 12, unit: 'kg', minThreshold: 3, branchId: 1 },
      { name: 'Carrots', quantity: 20, unit: 'kg', minThreshold: 5, branchId: 1 },
      { name: 'Lemon', quantity: 5, unit: 'kg', minThreshold: 1, branchId: 1 },
      { name: 'Herbs (Mixed)', quantity: 3, unit: 'kg', minThreshold: 0.5, branchId: 1 },
      { name: 'Wine', quantity: 12, unit: 'bottles', minThreshold: 3, branchId: 1 }
    ];

    console.log('Adding inventory items...');
    
    for (const ingredient of ingredients) {
      try {
        await prisma.inventoryItem.upsert({
          where: { 
            name_branchId: {
              name: ingredient.name,
              branchId: ingredient.branchId
            }
          },
          update: {},
          create: ingredient
        });
        console.log(`Added: ${ingredient.name}`);
      } catch (error) {
        // If compound unique constraint doesn't exist, try simple create
        try {
          await prisma.inventoryItem.create({
            data: ingredient
          });
          console.log(`Created: ${ingredient.name}`);
        } catch (createError) {
          console.log(`Skipped existing: ${ingredient.name}`);
        }
      }
    }

    console.log('Finished adding inventory items');
    
    // Show current inventory
    const inventory = await prisma.inventoryItem.findMany({ where: { branchId: 1 } });
    console.log(`Total inventory items: ${inventory.length}`);
    
  } catch (error) {
    console.error('Error:', error);
  } finally {
    await prisma.$disconnect();
  }
}

addInventoryItems();
