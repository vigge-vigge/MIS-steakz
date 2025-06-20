const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcrypt');
const prisma = new PrismaClient();

async function createBranchManager() {
  try {
    const hashedPassword = await bcrypt.hash('manager123', 10);
    
    const branchManager = await prisma.user.upsert({
      where: { username: 'manager' },
      update: {
        branchId: 7,
        role: 'BRANCH_MANAGER'
      },
      create: {
        username: 'manager',
        email: 'manager@steakz.com',
        password: hashedPassword,
        role: 'BRANCH_MANAGER',
        branchId: 7
      }
    });
    
    console.log('Branch Manager created/updated:', { 
      id: branchManager.id, 
      username: branchManager.username, 
      role: branchManager.role,
      branchId: branchManager.branchId 
    });
    
    await prisma.$disconnect();
  } catch (e) {
    console.error(e);
  }
}

createBranchManager();
