const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function checkDB() {
  try {
    const count = await prisma.inventoryItem.count();
    console.log('Total inventory items:', count);
    
    const items = await prisma.inventoryItem.findMany({ take: 3 });
    console.log('Sample items:', JSON.stringify(items, null, 2));
    
    const branches = await prisma.branch.findMany();
    console.log('Branches:', branches.map(b => ({id: b.id, name: b.name})));
    
    await prisma.$disconnect();
  } catch (e) { 
    console.error(e); 
  }
}

checkDB();
