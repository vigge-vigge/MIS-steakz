const API_BASE = 'http://localhost:3001/api/auth';

// Test customer signup with proper password requirements
const testCustomerSignup = async () => {
    try {
        const customerData = {
            username: 'testcustomer',
            email: 'testcustomer@example.com',
            password: 'Password123!', // Meets requirements: 8+ chars, number, special char
            role: 'CUSTOMER'
        };

        console.log('Testing customer signup...');
        console.log('Customer data:', customerData);

        const response = await fetch(`${API_BASE}/signup`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(customerData)
        });

        const result = await response.json();
        
        if (response.ok) {
            console.log('✅ Customer signup successful!');
            console.log('Response:', result);
            return result.user;
        } else {
            console.log('❌ Customer signup failed:');
            console.log('Status:', response.status);
            console.log('Error:', result);
            return null;
        }
    } catch (error) {
        console.error('❌ Error during customer signup:', error);
        return null;
    }
};

// Test customer login
const testCustomerLogin = async () => {
    try {
        const loginData = {
            username: 'testcustomer',
            password: 'Password123!'
        };

        console.log('\nTesting customer login...');
        console.log('Login data:', loginData);

        const response = await fetch(`${API_BASE}/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(loginData)
        });

        const result = await response.json();
        
        if (response.ok) {
            console.log('✅ Customer login successful!');
            console.log('User:', result.user);
            console.log('Token present:', !!result.token);
            return { user: result.user, token: result.token };
        } else {
            console.log('❌ Customer login failed:');
            console.log('Status:', response.status);
            console.log('Error:', result);
            return null;
        }
    } catch (error) {
        console.error('❌ Error during customer login:', error);
        return null;
    }
};

// Test with email login
const testEmailLogin = async () => {
    try {
        const loginData = {
            email: 'testcustomer@example.com',
            password: 'Password123!'
        };

        console.log('\nTesting customer login with email...');
        console.log('Login data:', loginData);

        const response = await fetch(`${API_BASE}/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(loginData)
        });

        const result = await response.json();
        
        if (response.ok) {
            console.log('✅ Customer email login successful!');
            console.log('User:', result.user);
            return result;
        } else {
            console.log('❌ Customer email login failed:');
            console.log('Status:', response.status);
            console.log('Error:', result);
            return null;
        }
    } catch (error) {
        console.error('❌ Error during customer email login:', error);
        return null;
    }
};

// Test invalid password validation
const testPasswordValidation = async () => {
    try {
        const invalidPasswordData = {
            username: 'testuser2',
            email: 'testuser2@example.com',
            password: 'weak', // Should fail validation
            role: 'CUSTOMER'
        };

        console.log('\nTesting password validation (should fail)...');
        console.log('Data:', invalidPasswordData);

        const response = await fetch(`${API_BASE}/signup`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(invalidPasswordData)
        });

        const result = await response.json();
        
        if (!response.ok) {
            console.log('✅ Password validation working correctly!');
            console.log('Expected error:', result.message);
        } else {
            console.log('❌ Password validation failed - weak password was accepted');
        }
    } catch (error) {
        console.error('❌ Error during password validation test:', error);
    }
};

// Run all tests
const runTests = async () => {
    console.log('🧪 Starting customer signup and login tests...\n');
    
    // Test password validation first
    await testPasswordValidation();
    
    // Test signup
    const user = await testCustomerSignup();
    
    if (user) {
        // Test login with username
        await testCustomerLogin();
        
        // Test login with email
        await testEmailLogin();
    }
    
    console.log('\n🏁 Tests completed!');
};

runTests().catch(console.error);
