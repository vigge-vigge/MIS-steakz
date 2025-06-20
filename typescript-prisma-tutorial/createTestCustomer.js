const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcrypt');

async function createTestCustomer() {
  const prisma = new PrismaClient();
  try {
    // Check if test customer already exists
    const existingUser = await prisma.user.findUnique({
      where: { username: 'testcustomer' }
    });
    
    if (existingUser) {
      console.log('Test customer already exists');
      return;
    }
    
    // Create a test customer with known password
    const hashedPassword = await bcrypt.hash('password123', 10);
    const user = await prisma.user.create({
      data: {
        username: 'testcustomer',
        email: 'testcustomer@example.com',
        password: hashedPassword,
        role: 'CUSTOMER'
      }
    });
    
    console.log('Test customer created:', {
      id: user.id,
      username: user.username,
      email: user.email,
      role: user.role,
      password: 'password123' // Show the plaintext password for testing
    });
    
  } catch (error) {
    console.error('Error creating test customer:', error);
  } finally {
    await prisma.$disconnect();
  }
}

createTestCustomer();
