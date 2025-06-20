const axios = require('axios');

// Base URL
const BASE_URL = 'http://localhost:3001';

// Test cashier login and profile update
async function testCashierProfileUpdate() {
  try {
    console.log('🔑 Testing cashier login...');
    
    // Login as cashier
    const loginResponse = await axios.post(`${BASE_URL}/auth/login`, {
      username: 'cashier',
      password: 'cashier123'
    });
    
    const token = loginResponse.data.token;
    console.log('✅ Cashier logged in successfully');
    
    // Get current profile
    console.log('\n📄 Getting current profile...');
    const profileResponse = await axios.get(`${BASE_URL}/api/users/me`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    
    console.log('Current profile:', profileResponse.data);
    
    // Update profile
    console.log('\n✏️  Updating profile...');
    const updateResponse = await axios.put(`${BASE_URL}/api/users/me`, {
      username: 'cashier-updated',
      email: 'cashier-updated@example.com'
    }, {
      headers: { Authorization: `Bearer ${token}` }
    });
    
    console.log('✅ Profile updated successfully:', updateResponse.data);
    
    // Test password update
    console.log('\n🔒 Testing password update...');
    const passwordUpdateResponse = await axios.put(`${BASE_URL}/api/users/me`, {
      password: 'newpassword123'
    }, {
      headers: { Authorization: `Bearer ${token}` }
    });
    
    console.log('✅ Password updated successfully');
    
    // Restore original profile and password
    console.log('\n🔄 Restoring original profile...');
    await axios.put(`${BASE_URL}/api/users/me`, {
      username: 'cashier',
      email: 'cashier@steakz.com',
      password: 'cashier123'
    }, {
      headers: { Authorization: `Bearer ${token}` }
    });
    
    console.log('✅ Profile restored to original values');
    
  } catch (error) {
    console.error('❌ Error testing cashier profile update:', error.response?.data || error.message);
  }
}

// Run the test
testCashierProfileUpdate();
