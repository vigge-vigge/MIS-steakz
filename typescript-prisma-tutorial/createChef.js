const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcrypt');
const prisma = new PrismaClient();

async function createChef() {
  try {
    const hashedPassword = await bcrypt.hash('chef123', 10);
    
    const chef = await prisma.user.upsert({
      where: { username: 'chef' },
      update: {
        branchId: 7,
        role: 'CHEF'
      },
      create: {
        username: 'chef',
        email: 'chef@steakz.com',
        password: hashedPassword,
        role: 'CHEF',
        branchId: 7
      }
    });
    
    console.log('Chef created/updated:', { id: chef.id, username: chef.username, branchId: chef.branchId });
    
    await prisma.$disconnect();
  } catch (e) {
    console.error(e);
  }
}

createChef();
