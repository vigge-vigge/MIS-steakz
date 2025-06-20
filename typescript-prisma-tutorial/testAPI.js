const axios = require('axios');

async function testAPI() {
  try {
    // Test login
    console.log('Testing chef login...');
    const loginResponse = await axios.post('http://localhost:3001/auth/login', {
      username: 'chef',
      password: 'chef123'
    });
    
    console.log('Login successful:', loginResponse.data.user);
    const token = loginResponse.data.token;
    
    // Test inventory API
    console.log('Testing inventory API...');
    const inventoryResponse = await axios.get('http://localhost:3001/api/inventory', {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    
    console.log('Inventory items:', inventoryResponse.data.length);
    console.log('First item:', inventoryResponse.data[0]);
    
  } catch (error) {
    console.error('Error:', error.response?.data || error.message);
  }
}

testAPI();
