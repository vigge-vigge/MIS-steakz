const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcrypt');
const prisma = new PrismaClient();

async function createTestStaff() {
  try {
    const hashedPassword = await bcrypt.hash('test123', 10);
    
    // Create a chef for Branch 8 (Downtown)
    const chef2 = await prisma.user.upsert({
      where: { username: 'chef2' },
      update: {
        branchId: 8,
        role: 'CHEF'
      },
      create: {
        username: 'chef2',
        email: 'chef2@steakz.com',
        password: hashedPassword,
        role: 'CHEF',
        branchId: 8
      }
    });
    
    // Create a cashier for Branch 8 (Downtown)
    const cashier2 = await prisma.user.upsert({
      where: { username: 'cashier2' },
      update: {
        branchId: 8,
        role: 'CASHIER'
      },
      create: {
        username: 'cashier2',
        email: 'cashier2@steakz.com',
        password: hashedPassword,
        role: 'CASHIER',
        branchId: 8
      }
    });
    
    console.log('Test staff created:');
    console.log('Chef2:', { id: chef2.id, username: chef2.username, branchId: chef2.branchId });
    console.log('Cashier2:', { id: cashier2.id, username: cashier2.username, branchId: cashier2.branchId });
    
    await prisma.$disconnect();
  } catch (e) {
    console.error(e);
  }
}

createTestStaff();
