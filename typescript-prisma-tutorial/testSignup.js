const fetch = require('node-fetch');
const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcrypt');

const prisma = new PrismaClient();

async function testSignup() {
  console.log('Testing signup functionality...');
  
  const testUser = {
    username: 'testuser123',
    email: 'testuser123@example.com',
    password: 'testpass123!'
  };

  try {
    // Test signup
    const signupResponse = await fetch('http://localhost:3000/api/auth/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(testUser)
    });

    const signupResult = await signupResponse.json();
    console.log('Signup response:', signupResult);

    if (signupResponse.ok) {
      // Check if password was hashed in database
      const user = await prisma.user.findUnique({
        where: { username: testUser.username },
        select: { id: true, username: true, email: true, password: true }
      });

      if (user) {
        console.log('\n=== PASSWORD HASHING VERIFICATION ===');
        console.log('Original password:', testUser.password);
        console.log('Hashed password in DB:', user.password);
        console.log('Password starts with $2b$ (bcrypt):', user.password.startsWith('$2b$'));
        
        // Verify password can be compared
        const isValid = await bcrypt.compare(testUser.password, user.password);
        console.log('Password verification works:', isValid);
        
        // Test login
        console.log('\n=== TESTING LOGIN ===');
        const loginResponse = await fetch('http://localhost:3000/api/auth/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            username: testUser.username,
            password: testUser.password
          })
        });

        const loginResult = await loginResponse.json();
        console.log('Login response:', loginResponse.status, loginResult);

        // Cleanup test user
        await prisma.user.delete({
          where: { username: testUser.username }
        });
        console.log('\nTest user cleaned up');
      }
    }
  } catch (error) {
    console.error('Test error:', error);
  } finally {
    await prisma.$disconnect();
  }
}

testSignup();
