const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function forceAddInventory() {
  try {
    // Delete all existing inventory first
    await prisma.inventoryItem.deleteMany();
    
    const items = [
      { name: 'Beef Sirloin', quantity: 15, unit: 'kg', minThreshold: 3, branchId: 7 },
      { name: 'Chicken Breast', quantity: 20, unit: 'kg', minThreshold: 5, branchId: 7 },
      { name: 'Salmon Fillet', quantity: 10, unit: 'kg', minThreshold: 2, branchId: 7 },
      { name: 'Potatoes', quantity: 50, unit: 'kg', minThreshold: 10, branchId: 7 },
      { name: 'Tomatoes', quantity: 25, unit: 'kg', minThreshold: 5, branchId: 7 },
      { name: 'Lettuce', quantity: 30, unit: 'heads', minThreshold: 8, branchId: 7 },
      { name: 'Onions', quantity: 40, unit: 'kg', minThreshold: 8, branchId: 7 },
      { name: 'Olive Oil', quantity: 12, unit: 'liters', minThreshold: 3, branchId: 7 },
      { name: 'Garlic', quantity: 8, unit: 'kg', minThreshold: 2, branchId: 7 },
      { name: 'Salt', quantity: 10, unit: 'kg', minThreshold: 2, branchId: 7 },
      { name: 'Black Pepper', quantity: 2, unit: 'kg', minThreshold: 0.5, branchId: 7 },
      { name: 'Pasta', quantity: 30, unit: 'kg', minThreshold: 6, branchId: 7 },
      { name: 'Rice', quantity: 35, unit: 'kg', minThreshold: 7, branchId: 7 },
      { name: 'Flour', quantity: 25, unit: 'kg', minThreshold: 5, branchId: 7 },
      { name: 'Butter', quantity: 8, unit: 'kg', minThreshold: 2, branchId: 7 },
      { name: 'Cheese', quantity: 12, unit: 'kg', minThreshold: 3, branchId: 7 },
      { name: 'Milk', quantity: 20, unit: 'liters', minThreshold: 5, branchId: 7 },
      { name: 'Eggs', quantity: 200, unit: 'pieces', minThreshold: 50, branchId: 7 },
      { name: 'Bread', quantity: 30, unit: 'loaves', minThreshold: 10, branchId: 7 },
      { name: 'Mushrooms', quantity: 8, unit: 'kg', minThreshold: 2, branchId: 7 }
    ];
    
    for (const item of items) {
      await prisma.inventoryItem.create({ data: item });
      console.log(`Created: ${item.name}`);
    }
    
    const count = await prisma.inventoryItem.count();
    console.log(`Total items created: ${count}`);
    
    await prisma.$disconnect();
  } catch (e) {
    console.error(e);
  }
}

forceAddInventory();
