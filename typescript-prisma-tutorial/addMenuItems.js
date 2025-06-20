const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function addMenuItems() {
  try {
    // Get all branches
    const branches = await prisma.branch.findMany();
    if (!branches.length) throw new Error('No branches found');

    // Get all inventory items for each branch
    for (const branch of branches) {
      const inventory = await prisma.inventoryItem.findMany({ where: { branchId: branch.id } });
      // Map ingredient names to ids for easy lookup
      const ingredientMap = {};
      for (const item of inventory) ingredientMap[item.name] = item.id;

      // Example menu items for seeding
      const menuItems = [
        {
          name: 'BBQ Chicken Wings',
          description: 'Crispy chicken wings with BBQ sauce.',
          price: 15.0,
          category: 'Appetizer',
          ingredientNames: ['Chicken Breast', 'Salt', 'Black Pepper', 'Garlic'],
        },
        {
          name: 'Beef Tenderloin',
          description: 'Tender center-cut beef tenderloin that melts in your mouth.',
          price: 32.0,
          category: 'Main Course',
          ingredientNames: ['Beef Sirloin', 'Salt', 'Black Pepper', 'Butter'],
        },
        {
          name: 'Caesar Salad',
          description: 'Classic salad with chicken, parmesan, and croutons.',
          price: 14.0,
          category: 'Salad',
          ingredientNames: ['Chicken Breast', 'Lettuce', 'Cheese', 'Bread', 'Eggs'],
        },
        {
          name: 'Chocolate Fondant',
          description: 'Warm chocolate cake with molten center.',
          price: 12.0,
          category: 'Dessert',
          ingredientNames: ['Flour', 'Eggs', 'Butter', 'Milk', 'Chocolate'],
        },
      ];

      for (const item of menuItems) {
        // Get ingredient IDs for this branch
        const ingredientIds = item.ingredientNames.map(name => ingredientMap[name]).filter(Boolean);
        if (!ingredientIds.length) continue;
        await prisma.menuItem.upsert({
          where: { name_branchId: { name: item.name, branchId: branch.id } },
          update: {},
          create: {
            name: item.name,
            description: item.description,
            price: item.price,
            category: item.category,
            isAvailable: true,
            branchId: branch.id,
            ingredients: { connect: ingredientIds.map(id => ({ id })) },
          },
        });
        console.log(`Seeded menu item: ${item.name} for branch ${branch.name}`);
      }
    }
  } catch (err) {
    console.error(err);
  } finally {
    await prisma.$disconnect();
  }
}

addMenuItems();
