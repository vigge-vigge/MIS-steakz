const { PrismaClient } = require('@prisma/client');

async function checkBranches() {
  const prisma = new PrismaClient();
  try {
    const branches = await prisma.branch.findMany({
      select: {
        id: true,
        name: true,
        address: true
      }
    });
    console.log('Branches:', JSON.stringify(branches, null, 2));
  } catch (error) {
    console.error('Error:', error);
  } finally {
    await prisma.$disconnect();
  }
}

checkBranches();
