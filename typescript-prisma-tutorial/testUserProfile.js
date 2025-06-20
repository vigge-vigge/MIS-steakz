const axios = require('axios');

// Base URL
const BASE_URL = 'http://localhost:3001';

// Test chef login and profile update
async function testChefProfileUpdate() {
  try {
    console.log('🔑 Testing chef login...');    // Login as chef
    const loginResponse = await axios.post(`${BASE_URL}/auth/login`, {
      username: 'chef',
      password: 'chef123'
    });
    
    const token = loginResponse.data.token;
    console.log('✅ Chef logged in successfully');
    
    // Get current profile
    console.log('\n📄 Getting current profile...');
    const profileResponse = await axios.get(`${BASE_URL}/api/users/me`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    
    console.log('Current profile:', profileResponse.data);
      // Update profile
    console.log('\n✏️  Updating profile...');
    const updateResponse = await axios.put(`${BASE_URL}/api/users/me`, {
      username: 'chef-updated',
      email: 'chef-updated@example.com'
    }, {
      headers: { Authorization: `Bearer ${token}` }
    });
    
    console.log('✅ Profile updated successfully:', updateResponse.data);
    
    // Get updated profile to verify
    console.log('\n🔄 Verifying updated profile...');
    const verifyResponse = await axios.get(`${BASE_URL}/api/users/me`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    
    console.log('Updated profile:', verifyResponse.data);
    
    // Restore original profile
    console.log('\n🔄 Restoring original profile...');
    await axios.put(`${BASE_URL}/api/users/me`, {
      username: 'chef',
      email: 'chef@example.com'
    }, {
      headers: { Authorization: `Bearer ${token}` }
    });
    
    console.log('✅ Profile restored to original values');
    
  } catch (error) {
    console.error('❌ Error testing chef profile update:', error.response?.data || error.message);
  }
}

// Run the test
testChefProfileUpdate();
