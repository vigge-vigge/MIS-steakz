const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function removeDuplicates() {
  try {
    const items = await prisma.inventoryItem.findMany();
    const seen = new Map();
    const toDelete = [];
    
    for (const item of items) {
      const key = `${item.name}-${item.branchId}`;
      if (seen.has(key)) {
        toDelete.push(item.id);
      } else {
        seen.set(key, item.id);
      }
    }
    
    for (const id of toDelete) {
      await prisma.inventoryItem.delete({ where: { id } });
    }
    
    console.log(`Removed ${toDelete.length} duplicates`);
    const remaining = await prisma.inventoryItem.count();
    console.log(`Remaining items: ${remaining}`);
  } catch (error) {
    console.error('Error:', error);
  } finally {
    await prisma.$disconnect();
  }
}

removeDuplicates();
