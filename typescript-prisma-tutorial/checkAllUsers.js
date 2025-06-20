const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function checkAllUsers() {
  try {
    console.log('=== ALL USERS AND THEIR BRANCH ASSIGNMENTS ===\n');
    
    const users = await prisma.user.findMany({
      select: {
        id: true,
        username: true,
        role: true,
        branchId: true,
        branch: {
          select: {
            name: true
          }
        }
      },
      orderBy: [
        { branchId: 'asc' },
        { role: 'asc' },
        { username: 'asc' }
      ]
    });
    
    console.log('📊 User Summary:');
    console.log(`Total users: ${users.length}\n`);
    
    // Group by branch
    const usersByBranch = users.reduce((acc, user) => {
      const branchKey = user.branchId ? `Branch ${user.branchId} (${user.branch?.name || 'Unknown'})` : 'No Branch';
      if (!acc[branchKey]) acc[branchKey] = [];
      acc[branchKey].push(user);
      return acc;
    }, {});
    
    Object.entries(usersByBranch).forEach(([branchKey, branchUsers]) => {
      console.log(`🏢 ${branchKey}:`);
      branchUsers.forEach(user => {
        console.log(`   - ${user.username} (${user.role}) [ID: ${user.id}]`);
      });
      console.log('');
    });
    
    // Show what branch manager should see
    const branchManager = users.find(u => u.username === 'manager');
    if (branchManager) {
      console.log('🎯 Branch Manager View (manager):');
      console.log(`   Branch Manager: ${branchManager.username} - Branch ${branchManager.branchId} (${branchManager.branch?.name})`);
      
      const branchStaff = users.filter(u => u.branchId === branchManager.branchId && u.role !== 'CUSTOMER');
      console.log(`   Should see ${branchStaff.length} staff members:`);
      branchStaff.forEach(user => {
        console.log(`   - ${user.username} (${user.role})`);
      });
    }
    
    await prisma.$disconnect();
  } catch (e) {
    console.error('Error:', e);
  }
}

checkAllUsers();
