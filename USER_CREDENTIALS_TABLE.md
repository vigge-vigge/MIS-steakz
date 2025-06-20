# User Roles and Credentials Table

Based on the seeding scripts and user creation files in your backend, here are all the roles with their login credentials:

## Main User Credentials Table

| Role | Username | Email | Password | Branch ID | Notes |
|------|----------|-------|----------|-----------|-------|
| **ADMIN** | admin | admin@example.com | admin123 | - | System administrator |
| **GENERAL_MANAGER** | hqmanager | hqmanager@example.com | hqmanager123 | 1 (HQ) | Headquarters manager |
| **BRANCH_MANAGER** | branchmanager | branchmanager@example.com | branchmanager123 | 2 (Downtown) | Original branch manager |
| **BRANCH_MANAGER** | manager | manager@steakz.com | manager123 | 7 | Additional branch manager |
| **CHEF** | chef | chef@example.com | chef123 | 2 (Downtown) | Original chef |
| **CHEF** | chef | chef@steakz.com | chef123 | 7 | Updated chef (same username) |
| **CASHIER** | cashier | cashier@example.com | cashier123 | 2 (Downtown) | Original cashier |
| **CASHIER** | cashier | cashier@steakz.com | cashier123 | 7 | Updated cashier (same username) |

## Role Descriptions

### ADMIN
- **Access Level:** Full system access
- **Permissions:** All operations, user management, system configuration
- **Dashboard:** Admin dashboard with system-wide statistics

### GENERAL_MANAGER (HQ Manager)
- **Access Level:** Multi-branch oversight
- **Permissions:** Branch management, staff oversight, financial reports
- **Dashboard:** HQ dashboard with company-wide overview

### BRANCH_MANAGER
- **Access Level:** Single branch management
- **Permissions:** Branch-specific operations, local staff management, reports
- **Dashboard:** Branch dashboard with branch-specific metrics

### CHEF
- **Access Level:** Kitchen operations
- **Permissions:** Order management, menu item updates, kitchen workflow
- **Dashboard:** Kitchen view with active orders

### CASHIER
- **Access Level:** Point of sale operations
- **Permissions:** Order creation, payment processing, customer service
- **Dashboard:** POS interface with order management

## Authentication Instructions for Postman

1. **Login Endpoint:** `POST http://localhost:3000/api/auth/login`
2. **Request Body:**
```json
{
  "email": "admin@example.com",
  "password": "admin123"
}
```
3. **Copy the JWT token from response**
4. **Add to headers:** `Authorization: Bearer YOUR_JWT_TOKEN`

## Quick Test Credentials

For quick testing, use these simplified credentials:

```
Admin: admin@example.com / admin123
HQ Manager: hqmanager@example.com / hqmanager123
Branch Manager: branchmanager@example.com / branchmanager123
Chef: chef@example.com / chef123
Cashier: cashier@example.com / cashier123
```

## Additional Notes

- Some users may have been updated with newer email domains (@steakz.com vs @example.com)
- Branch IDs: 1 = HQ, 2 = Downtown, 7 = Additional branch
- All passwords are hashed in the database using bcrypt
- CUSTOMER role users can be created via the signup endpoint
