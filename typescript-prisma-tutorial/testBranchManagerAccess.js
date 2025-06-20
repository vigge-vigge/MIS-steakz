const axios = require('axios');

// Base URL
const BASE_URL = 'http://localhost:3001';

// Test branch manager staff access
async function testBranchManagerStaffAccess() {
  try {
    console.log('🔑 Testing branch manager login...');
    
    // Login as branch manager
    const loginResponse = await axios.post(`${BASE_URL}/auth/login`, {
      username: 'manager',
      password: 'manager123'
    });
    
    const token = loginResponse.data.token;
    console.log('✅ Branch Manager logged in successfully');
    console.log('   User info:', {
      username: loginResponse.data.user.username,
      role: loginResponse.data.user.role,
      branchId: loginResponse.data.user.branchId
    });
    
    // Get staff members (should only see their branch)
    console.log('\n📋 Getting staff members...');
    const staffResponse = await axios.get(`${BASE_URL}/api/staff`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    
    console.log('✅ Staff members retrieved:');
    staffResponse.data.staff.forEach(staff => {
      console.log(`   - ${staff.username} (${staff.role}) - Branch: ${staff.branchId} (${staff.branch?.name || 'Unknown'})`);
    });
    
    // Check if only shows branch 7 staff
    const onlyBranch7 = staffResponse.data.staff.every(staff => staff.branchId === 7);
    console.log(`\n🔍 All staff from branch 7 only: ${onlyBranch7 ? '✅ YES' : '❌ NO'}`);
    
    // Login as admin to compare
    console.log('\n🔑 Testing admin login for comparison...');
    const adminLoginResponse = await axios.post(`${BASE_URL}/auth/login`, {
      username: 'admin',
      password: 'admin123'
    });
    
    const adminToken = adminLoginResponse.data.token;
    console.log('✅ Admin logged in successfully');
    
    // Get all users as admin
    const allUsersResponse = await axios.get(`${BASE_URL}/api/users?page=1&limit=100`, {
      headers: { Authorization: `Bearer ${adminToken}` }
    });
    
    console.log('\n📋 All users (admin view):');
    const nonCustomers = allUsersResponse.data.users.filter(user => user.role !== 'CUSTOMER');
    nonCustomers.forEach(user => {
      console.log(`   - ${user.username} (${user.role}) - Branch: ${user.branchId || 'None'}`);
    });
    
    console.log(`\n📊 Summary:`);
    console.log(`   Branch Manager sees: ${staffResponse.data.staff.length} staff members`);
    console.log(`   Admin sees: ${nonCustomers.length} total users`);
    console.log(`   Branch filtering working: ${onlyBranch7 ? '✅' : '❌'}`);
    
  } catch (error) {
    console.error('❌ Error testing branch manager staff access:', error.response?.data || error.message);
  }
}

// Run the test
testBranchManagerStaffAccess();
