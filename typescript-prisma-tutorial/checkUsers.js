const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function getCustomers() {
  try {
    const users = await prisma.user.findMany({
      where: { role: 'CUSTOMER' },
      select: { id: true, username: true, email: true, createdAt: true }
    });
    console.log('\n=== CUSTOMER ACCOUNTS ===');
    console.table(users);
    console.log('\nNote: Passwords are hashed in database for security.');
    console.log('Use the passwords you set during signup for these accounts.\n');
    
    console.log('For Postman testing, use:');
    users.forEach((user, index) => {
      console.log(`${index + 1}. Username: "${user.username}" OR Email: "${user.email}"`);
    });
    
  } catch (e) {
    console.error('Error:', e);
  } finally {
    await prisma.$disconnect();
  }
}

getCustomers();
