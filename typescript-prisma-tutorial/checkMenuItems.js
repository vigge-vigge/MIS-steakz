const { PrismaClient } = require('@prisma/client');

async function checkMenuItems() {
  const prisma = new PrismaClient();
  try {
    const menuItems = await prisma.menuItem.findMany({
      select: {
        id: true,
        name: true,
        price: true,
        isAvailable: true
      }
    });
    console.log('Menu Items:', JSON.stringify(menuItems, null, 2));
  } catch (error) {
    console.error('Error:', error);
  } finally {
    await prisma.$disconnect();
  }
}

checkMenuItems();
