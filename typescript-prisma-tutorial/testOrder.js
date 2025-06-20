const axios = require('axios');

async function testOrderCreation() {
  try {    // First, login as a customer
    console.log('Logging in as customer...');
    const loginResponse = await axios.post('http://localhost:3001/auth/login', {
      username: 'testcustomer',
      password: 'password123'
    });
    
    const token = loginResponse.data.token;
    console.log('Login successful, token received');    // Try to create an order
    console.log('Creating order...');
    const orderData = {
      branchId: 7, // Use existing branch ID
      items: [
        { menuItemId: 127, quantity: 1 } // Bruschetta
      ],
      deliveryAddress: 'Test Address 123'
    };
    
    const orderResponse = await axios.post('http://localhost:3001/api/orders', orderData, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    });
    
    console.log('Order created successfully:', orderResponse.data);
    
  } catch (error) {
    console.error('Error details:');
    if (error.response) {
      console.error('Status:', error.response.status);
      console.error('Message:', error.response.data);
    } else {
      console.error('Error:', error.message);
    }
  }
}

testOrderCreation();
