const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcrypt');
const prisma = new PrismaClient();

async function createCashier() {
  try {
    const hashedPassword = await bcrypt.hash('cashier123', 10);
    
    const cashier = await prisma.user.upsert({
      where: { username: 'cashier' },
      update: {
        branchId: 7,
        role: 'CASHIER'
      },
      create: {
        username: 'cashier',
        email: 'cashier@steakz.com',
        password: hashedPassword,
        role: 'CASHIER',
        branchId: 7
      }
    });
    
    console.log('Cashier created/updated:', { id: cashier.id, username: cashier.username, branchId: cashier.branchId });
    
    await prisma.$disconnect();
  } catch (e) {
    console.error(e);
  }
}

createCashier();
