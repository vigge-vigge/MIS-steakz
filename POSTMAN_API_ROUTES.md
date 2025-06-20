# Postman API Testing Routes for Restaurant Management System

## Authentication Routes (No Auth Required)
Base URL: `http://localhost:3000/api/auth`

### 1. User Registration
- **POST** `/signup`
- **Body (JSON):**
```json
{
  "username": "testuser",
  "email": "test@example.com",
  "password": "password123",
  "role": "CUSTOMER"
}
```

### 2. User Login
- **POST** `/login`
- **Body (JSON):**
```json
{
  "email": "test@example.com",
  "password": "password123"
}
```
- **Response:** Returns JWT token - use this in Authorization header for protected routes

---

## Protected Routes Setup
For all protected routes, add this header:
- **Authorization:** `Bearer YOUR_JWT_TOKEN`

---

## ADMIN Routes
Base URL: `http://localhost:3000/api`

### User Management
- **GET** `/users` - Get all users
- **GET** `/users/:id` - Get user by ID
- **POST** `/users` - Create new user
- **PUT** `/users/:id` - Update user
- **PATCH** `/users/:id/role` - Change user role
- **DELETE** `/users/:id` - Delete user

### Admin Dashboard
- **GET** `/admin-dashboard/statistics` - System statistics
- **GET** `/admin-dashboard/restaurant-status` - Restaurant status grid
- **GET** `/admin-dashboard/live-orders` - Live order activity
- **GET** `/admin-dashboard/financial` - Financial dashboard
- **GET** `/admin-dashboard/health` - System health
- **GET** `/admin-dashboard/activity` - Activity feed
- **GET** `/admin-dashboard/analytics` - Performance analytics
- **GET** `/admin-dashboard/alerts` - System alerts
- **POST** `/admin-dashboard/actions` - Quick actions

### Menu Management (Admin)
- **POST** `/menu` - Create menu item
- **PUT** `/menu/:id` - Update menu item
- **DELETE** `/menu/:id` - Delete menu item

### Staff Management (Admin)
- **GET** `/staff` - Get all staff
- **POST** `/staff` - Create staff member
- **PUT** `/staff/:id` - Update staff member
- **DELETE** `/staff/:id` - Delete staff member

---

## GENERAL_MANAGER Routes
Base URL: `http://localhost:3000/api`

### Dashboard Access
- **GET** `/admin-dashboard/restaurant-status` - Restaurant status
- **GET** `/admin-dashboard/financial` - Financial data
- **GET** `/admin-dashboard/activity` - Activity feed

### Menu Management
- **POST** `/menu` - Create menu item
- **PUT** `/menu/:id` - Update menu item
- **DELETE** `/menu/:id` - Delete menu item

### Staff Management
- **GET** `/staff` - Get staff members
- **POST** `/staff` - Create staff member
- **PUT** `/staff/:id` - Update staff member
- **DELETE** `/staff/:id` - Delete staff member

---

## BRANCH_MANAGER Routes
Base URL: `http://localhost:3000/api`

### Branch Dashboard
- **GET** `/branch-dashboard/dashboard` - Complete dashboard data
- **GET** `/branch-dashboard/daily-sales` - Daily sales data
- **GET** `/branch-dashboard/active-orders` - Active orders
- **GET** `/branch-dashboard/staff-on-shift` - Staff on shift
- **GET** `/branch-dashboard/inventory-alerts` - Inventory alerts
- **GET** `/branch-dashboard/weekly-trend` - Weekly trends
- **GET** `/branch-dashboard/metrics` - Branch metrics

### Reports
- **GET** `/branch-dashboard/reports/sales` - Sales reports
- **GET** `/branch-dashboard/reports/inventory` - Inventory reports
- **GET** `/branch-dashboard/reports/staff-performance` - Staff performance
- **GET** `/branch-dashboard/reports/order-analytics` - Order analytics
- **GET** `/branch-dashboard/reports/export?type=sales&format=json&period=month` - Export reports

### Menu Management (Branch)
- **POST** `/menu` - Create menu item
- **PUT** `/menu/:id` - Update menu item

### Staff Management (Branch)
- **GET** `/staff` - Get staff members
- **PUT** `/staff/:id` - Update staff member

### Branch Management
- **GET** `/branches/my` - Get assigned branch
- **GET** `/branches` - Get all branches (if authorized)

---

## CHEF Routes
Base URL: `http://localhost:3000/api`

### Order Management
- **GET** `/orders` - Get orders (kitchen view)
- **PATCH** `/orders/:id/status` - Update order status
- **Body (JSON):**
```json
{
  "status": "PREPARING" // or "READY", "COMPLETED"
}
```

---

## CASHIER Routes
Base URL: `http://localhost:3000/api`

### Order Management
- **GET** `/orders` - Get orders (cashier view)
- **POST** `/orders` - Create new order
- **Body (JSON):**
```json
{
  "items": [
    {
      "menuItemId": 1,
      "quantity": 2
    }
  ],
  "branchId": 1,
  "customerName": "John Doe",
  "customerPhone": "123-456-7890"
}
```
- **PATCH** `/orders/:id/status` - Update order status

### Dashboard Access
- **GET** `/admin-dashboard/statistics` - Basic statistics

---

## CUSTOMER Routes
Base URL: `http://localhost:3000/api`

### Profile Management
- **GET** `/users/me` - Get current user profile
- **PUT** `/users/me` - Update profile

### Order Management
- **GET** `/orders` - Get my orders
- **POST** `/orders` - Create order
- **POST** `/orders/cart` - Sync cart to database
- **GET** `/orders/cart` - Get cart items

---

## Public Routes (No Auth Required)
Base URL: `http://localhost:3000/api`

### Menu
- **GET** `/menu` - Get all menu items

### Branches
- **GET** `/branches/public` - Get all branches

### Feedback
- **GET** `/branch-dashboard/customer-feedback` - Get customer feedback
- **GET** `/branch-dashboard/feedback/stats` - Get feedback statistics

---

## Sample Test Users
Create these users for testing different roles:

### Admin User
```json
{
  "username": "admin",
  "email": "admin@restaurant.com",
  "password": "admin123",
  "role": "ADMIN"
}
```

### General Manager
```json
{
  "username": "gm",
  "email": "gm@restaurant.com",
  "password": "gm123",
  "role": "GENERAL_MANAGER"
}
```

### Branch Manager
```json
{
  "username": "bm",
  "email": "bm@restaurant.com",
  "password": "bm123",
  "role": "BRANCH_MANAGER"
}
```

### Chef
```json
{
  "username": "chef",
  "email": "chef@restaurant.com",
  "password": "chef123",
  "role": "CHEF"
}
```

### Cashier
```json
{
  "username": "cashier",
  "email": "cashier@restaurant.com",
  "password": "cashier123",
  "role": "CASHIER"
}
```

### Customer
```json
{
  "username": "customer",
  "email": "customer@restaurant.com",
  "password": "customer123",
  "role": "CUSTOMER"
}
```

---

## Testing Workflow

1. **Create test users** using the signup endpoint
2. **Login** with each user to get their JWT token
3. **Test role-specific endpoints** using the appropriate Authorization header
4. **Verify access control** by trying to access routes with wrong roles (should get 403 Forbidden)

## Common Response Codes
- **200** - Success
- **201** - Created
- **400** - Bad Request
- **401** - Unauthorized (no token or invalid token)
- **403** - Forbidden (insufficient permissions)
- **404** - Not Found
- **500** - Internal Server Error
