# High-Level Use Case Diagram Information
## Restaurant Management System - Fish Level Use Cases

---

## 🎭 **ACTORS (External Entities)**

### **Primary Actors (Direct System Users)**

#### 1. **Customer**
- **Description**: End users who interact with the system to order food and manage their account
- **System Boundary**: External entity accessing the system through web interface

#### 2. **Chef**  
- **Description**: Kitchen staff responsible for food preparation and order fulfillment
- **System Boundary**: Internal staff user with kitchen-focused access

#### 3. **Cashier**
- **Description**: Front-of-house staff handling order processing and customer payments
- **System Boundary**: Internal staff user with point-of-sale access

#### 4. **Branch Manager**
- **Description**: Manager of individual restaurant branch with operational oversight
- **System Boundary**: Internal management user with branch-level administrative access

#### 5. **General Manager**
- **Description**: Executive oversight of multiple branches with company-wide responsibilities
- **System Boundary**: Internal management user with multi-branch administrative access

#### 6. **System Administrator**
- **Description**: Technical administrator with full system access and configuration rights
- **System Boundary**: Internal technical user with complete system control

---

## 🎯 **HIGH-LEVEL USE CASES (Main System Functions)**

### **🛒 Customer Management**
1. **Manage Customer Account**
   - Register new account
   - Login/logout
   - Update profile information
   - Change password

2. **Browse and Order Food**
   - View menu items
   - Add items to cart
   - Place food orders
   - Specify delivery address
   - Select payment method

3. **Track Orders**
   - View order status
   - Access order history
   - Cancel pending orders

### **🍳 Kitchen Operations**
4. **Manage Food Preparation**
   - View pending orders
   - Update order status (Preparing → Ready)
   - Monitor order queue
   - Manage kitchen workflow

5. **Monitor Inventory**
   - View inventory levels
   - Track low stock items
   - Update ingredient availability

### **💰 Point of Sale Operations**
6. **Process Customer Orders**
   - Create orders for walk-in customers
   - Process payments
   - Handle customer inquiries
   - Manage order modifications

7. **Handle Transactions**
   - Process cash payments
   - Process card payments
   - Generate receipts
   - Handle refunds

### **📊 Branch Management**
8. **Oversee Branch Operations**
   - View branch dashboard
   - Monitor daily sales
   - Track active orders
   - View staff performance

9. **Manage Branch Staff**
   - Create staff accounts (Chef, Cashier)
   - Update staff information
   - Monitor staff activity
   - Assign staff to shifts

10. **Generate Branch Reports**
    - Sales reports
    - Inventory reports
    - Staff performance reports
    - Order analytics

### **🏢 Executive Management**
11. **Monitor Company Operations**
    - View multi-branch analytics
    - Access company-wide reports
    - Monitor financial performance
    - Track growth metrics

12. **Manage Branch Managers**
    - Create branch manager accounts
    - Assign managers to branches
    - Monitor branch performance
    - Coordinate between branches

### **⚙️ System Administration**
13. **Manage System Users**
    - Create user accounts (all roles)
    - Modify user permissions
    - Deactivate/reactivate accounts
    - Reset user passwords

14. **Configure System Settings**
    - Manage branch information
    - Configure menu items
    - Set up payment methods
    - Maintain system security

15. **Generate System Reports**
    - User activity reports
    - System performance metrics
    - Security audit logs
    - Data export functionality

### **📋 Menu Management**
16. **Maintain Menu Items**
    - Add new menu items
    - Update item descriptions
    - Set pricing
    - Manage item availability
    - Upload item images

### **📦 Inventory Management**
17. **Track Inventory Levels**
    - Monitor stock quantities
    - Set minimum thresholds
    - Generate low stock alerts
    - Update inventory counts

### **📈 Analytics and Reporting**
18. **Generate Business Intelligence**
    - Sales trend analysis
    - Customer behavior patterns
    - Inventory turnover reports
    - Staff productivity metrics

---

## 🔗 **ACTOR-USE CASE RELATIONSHIPS**

### **Customer** participates in:
- Manage Customer Account
- Browse and Order Food  
- Track Orders

### **Chef** participates in:
- Manage Food Preparation
- Monitor Inventory (branch-specific)

### **Cashier** participates in:
- Process Customer Orders
- Handle Transactions
- Monitor Inventory (branch-specific)

### **Branch Manager** participates in:
- Oversee Branch Operations
- Manage Branch Staff
- Generate Branch Reports
- Maintain Menu Items (branch-specific)
- Track Inventory Levels (branch-specific)

### **General Manager** participates in:
- Monitor Company Operations
- Manage Branch Managers
- Generate Business Intelligence (company-wide)
- Maintain Menu Items (all branches)

### **System Administrator** participates in:
- Manage System Users
- Configure System Settings
- Generate System Reports
- All administrative functions

---

## 🎨 **FISH LEVEL DIAGRAM NOTES**

### **System Boundary**
- **Internal**: All staff roles (Chef, Cashier, Branch Manager, General Manager, Admin)
- **External**: Customer (primary external actor)

### **Primary Use Case Groups**
1. **Customer Services** (Customer-facing)
2. **Operations Management** (Daily operations)
3. **Administrative Functions** (Management and configuration)
4. **Reporting and Analytics** (Business intelligence)

### **Key Relationships**
- **Includes**: Common authentication and authorization across all use cases
- **Extends**: Advanced features like analytics extend basic reporting
- **Inheritance**: Different management levels inherit base management capabilities

### **System Goals**
- **Primary**: Facilitate food ordering and delivery
- **Secondary**: Optimize restaurant operations and staff management
- **Tertiary**: Provide business intelligence and growth insights

---

*This fish-level Use Case Diagram provides a high-level overview of the main system functions and actor interactions for the Restaurant Management System. Each use case represents a major system capability that delivers value to the respective actors.*
