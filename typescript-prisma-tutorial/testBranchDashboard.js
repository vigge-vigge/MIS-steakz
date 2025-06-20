const axios = require('axios');

const API_BASE_URL = 'http://localhost:3001/api';

async function testBranchDashboard() {
  try {
    console.log('🔑 Testing branch manager login...');    // Login as branch manager
    const loginResponse = await axios.post(`${API_BASE_URL.replace('/api', '')}/auth/login`, {
      username: 'manager',
      password: 'manager123'
    });
    
    console.log('✅ Login successful!');
    const token = loginResponse.data.token;
    
    // Set up axios instance with auth
    const authApi = axios.create({
      baseURL: API_BASE_URL,
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    
    console.log('\n📊 Testing dashboard endpoints...');
    
    // Test daily sales
    try {
      const dailySales = await authApi.get('/branch-dashboard/daily-sales');
      console.log('✅ Daily sales:', dailySales.data);
    } catch (error) {
      console.log('❌ Daily sales error:', error.response?.data || error.message);
    }
    
    // Test active orders
    try {
      const activeOrders = await authApi.get('/branch-dashboard/active-orders');
      console.log('✅ Active orders:', activeOrders.data);
    } catch (error) {
      console.log('❌ Active orders error:', error.response?.data || error.message);
    }
    
    // Test staff on shift
    try {
      const staffOnShift = await authApi.get('/branch-dashboard/staff-on-shift');
      console.log('✅ Staff on shift:', staffOnShift.data);
    } catch (error) {
      console.log('❌ Staff on shift error:', error.response?.data || error.message);
    }
    
    // Test inventory alerts
    try {
      const inventoryAlerts = await authApi.get('/branch-dashboard/inventory-alerts');
      console.log('✅ Inventory alerts:', inventoryAlerts.data);
    } catch (error) {
      console.log('❌ Inventory alerts error:', error.response?.data || error.message);
    }
    
    // Test customer feedback
    try {
      const customerFeedback = await authApi.get('/branch-dashboard/customer-feedback');
      console.log('✅ Customer feedback:', customerFeedback.data);
    } catch (error) {
      console.log('❌ Customer feedback error:', error.response?.data || error.message);
    }
    
    // Test metrics
    try {
      const metrics = await authApi.get('/branch-dashboard/metrics');
      console.log('✅ Metrics:', metrics.data);
    } catch (error) {
      console.log('❌ Metrics error:', error.response?.data || error.message);
    }
    
  } catch (error) {
    console.error('❌ Error testing branch dashboard:', error.response?.data || error.message);
  }
}

testBranchDashboard();
