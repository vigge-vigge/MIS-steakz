# Level 1 Data Flow Diagram (DFD) Information
## Restaurant Management System

Based on the comprehensive analysis of the TypeScript Prisma backend code, here is the structured information needed for creating a Level 1 DFD:

## 🎯 **EXTERNAL ENTITIES (Actors)**

### 1. **Customer**
- **Description**: End users who place orders and provide feedback
- **Interactions**: Order food, make payments, leave reviews, manage profile

### 2. **Chef** 
- **Description**: Kitchen staff who prepare food orders
- **Interactions**: View orders, update order status, manage inventory

### 3. **Cashier**
- **Description**: Front-of-house staff who process orders and payments
- **Interactions**: Take orders, process payments, assist customers

### 4. **Branch Manager**
- **Description**: Manages individual restaurant branch operations
- **Interactions**: View analytics, manage staff, track inventory, handle feedback

### 5. **General Manager**
- **Description**: Oversees multiple branches
- **Interactions**: View multi-branch reports, manage branch managers

### 6. **System Administrator**
- **Description**: IT admin who manages the entire system
- **Interactions**: Manage all users, system configuration, data exports

---

## ⚙️ **MAIN PROCESSES (Level 1)**

### **Process 1: User Authentication & Management**
- **Description**: Handle user login, registration, password management, and profile updates
- **Sub-processes**: Login validation, password reset, user registration, profile management
- **Input Data Flows**: Login credentials, registration data, password reset requests
- **Output Data Flows**: Authentication tokens, user profile data, login status

### **Process 2: Order Management** 
- **Description**: Process customer orders from creation to delivery
- **Sub-processes**: Order creation, order tracking, status updates, order completion
- **Input Data Flows**: Order details, menu item selections, customer information
- **Output Data Flows**: Order confirmations, status updates, delivery information

### **Process 3: Menu & Inventory Management**
- **Description**: Manage menu items, pricing, availability, and inventory tracking
- **Sub-processes**: Menu item CRUD, inventory tracking, availability updates, price management
- **Input Data Flows**: Menu item data, inventory updates, availability changes
- **Output Data Flows**: Menu listings, inventory reports, availability status

### **Process 4: Payment Processing**
- **Description**: Handle payment transactions and financial records
- **Sub-processes**: Payment validation, transaction processing, payment confirmation
- **Input Data Flows**: Payment details, order totals, payment methods
- **Output Data Flows**: Payment confirmations, transaction records, receipts

### **Process 5: Staff Management**
- **Description**: Manage staff accounts, roles, and performance tracking
- **Sub-processes**: Staff registration, role assignment, performance tracking, scheduling
- **Input Data Flows**: Staff information, role assignments, performance data
- **Output Data Flows**: Staff listings, performance reports, schedule data

### **Process 6: Branch Operations & Analytics**
- **Description**: Provide branch-specific analytics, reporting, and operational insights
- **Sub-processes**: Sales analytics, performance metrics, report generation, dashboard data
- **Input Data Flows**: Transaction data, operational data, time periods
- **Output Data Flows**: Analytics reports, dashboard data, performance metrics

### **Process 7: Customer Feedback Management**
- **Description**: Collect, manage, and respond to customer feedback and reviews
- **Sub-processes**: Feedback collection, assignment to staff, status tracking, response management
- **Input Data Flows**: Customer reviews, feedback assignments, status updates
- **Output Data Flows**: Feedback reports, response notifications, satisfaction metrics

### **Process 8: Administrative Functions**
- **Description**: System-wide administration, data export, and configuration
- **Sub-processes**: User role management, data export, system configuration, audit logging
- **Input Data Flows**: Admin commands, export requests, configuration changes
- **Output Data Flows**: System reports, exported data, configuration confirmations

---

## 🗄️ **DATA STORES**

### **D1: Users Database**
- **Contents**: User accounts, authentication data, roles, profiles
- **Tables**: User (with security fields like failed login attempts, password reset tokens)

### **D2: Branch Database**
- **Contents**: Branch information, locations, contact details, management assignments
- **Tables**: Branch, manager assignments

### **D3: Menu Database** 
- **Contents**: Menu items, categories, pricing, availability, ingredients
- **Tables**: MenuItem, MenuCategory, ingredient relationships

### **D4: Orders Database**
- **Contents**: Order details, status, items, customer information, delivery data
- **Tables**: Order, OrderItem, order status tracking

### **D5: Inventory Database**
- **Contents**: Inventory items, quantities, thresholds, branch-specific stock
- **Tables**: InventoryItem, stock levels, minimum thresholds

### **D6: Payments Database**
- **Contents**: Payment transactions, methods, status, financial records
- **Tables**: Payment, transaction history, payment methods

### **D7: Feedback Database**
- **Contents**: Customer reviews, ratings, feedback status, assignments
- **Tables**: Post (reviews), Comment, feedback workflow data

### **D8: Analytics Database**
- **Contents**: Aggregated data, reports, performance metrics, trends
- **Tables**: Derived from other tables for reporting purposes

---

## 🔄 **KEY DATA FLOWS**

### **Authentication Flows**
- External Entity → Process 1: Login credentials, registration data
- Process 1 → External Entity: Authentication tokens, login status
- Process 1 ↔ D1: User credentials, authentication data

### **Order Processing Flows**
- Customer → Process 2: Order details, menu selections
- Process 2 → Customer: Order confirmations, status updates
- Process 2 ↔ D4: Order data, status updates
- Process 2 ↔ D3: Menu item availability, pricing
- Process 2 → Process 4: Payment requirements

### **Payment Flows**
- Customer → Process 4: Payment information
- Process 4 → Customer: Payment confirmations, receipts
- Process 4 ↔ D6: Transaction data, payment records

### **Staff Operations Flows**
- Staff (Chef/Cashier) → Process 2: Order status updates
- Staff → Process 3: Inventory updates, menu changes
- Branch Manager → Process 5: Staff management actions
- Process 5 ↔ D1: Staff data, role assignments

### **Analytics & Reporting Flows**
- Process 6 ← D4, D6, D1: Operational data for analysis
- Process 6 → Management: Reports, dashboards, metrics
- Process 6 ↔ D8: Aggregated analytics data

### **Feedback Management Flows**
- Customer → Process 7: Reviews, ratings, feedback
- Process 7 → Staff: Feedback assignments, notifications
- Process 7 ↔ D7: Feedback data, status updates

### **Administrative Flows**
- Admin → Process 8: System configuration, user management
- Process 8 ↔ All Data Stores: Administrative operations, data exports
- Process 8 → Admin: System reports, export files

---

## 🔐 **SECURITY & CONTROL FLOWS**

### **Authentication Controls**
- JWT token validation for all protected processes
- Role-based access control (RBAC) for process authorization
- Password security with hashing and reset mechanisms

### **Data Access Controls**
- Branch-specific data filtering for branch staff
- Role-based data visibility restrictions
- Audit trails for administrative actions

### **Business Rules Enforcement**
- Order validation against menu availability
- Inventory threshold monitoring
- Payment validation and processing rules

---

## 📊 **SYSTEM BOUNDARIES**

### **Included in System**
- User management and authentication
- Order processing and tracking
- Menu and inventory management
- Payment processing
- Staff administration
- Analytics and reporting
- Customer feedback management

### **External Dependencies**
- Database management system (PostgreSQL)
- Frontend applications (React)
- Potential third-party payment processors
- Email services (for password reset)

---

This information provides a comprehensive foundation for creating a Level 1 DFD that accurately represents the restaurant management system's data flows, processes, and data stores.
