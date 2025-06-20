"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const prisma_1 = __importDefault(require("./utils/prisma"));
async function testOrderCreation() {
    try {
        console.log('Testing order creation...');
        const branches = await prisma_1.default.branch.findMany();
        console.log('Branches found:', branches.length);
        if (branches.length > 0) {
            console.log('First branch:', branches[0]);
        }
        const menuItems = await prisma_1.default.menuItem.findMany();
        console.log('Menu items found:', menuItems.length);
        if (menuItems.length > 0) {
            console.log('First menu item:', menuItems[0]);
        }
        const customers = await prisma_1.default.user.findMany({ where: { role: 'CUSTOMER' } });
        console.log('Customers found:', customers.length);
        if (customers.length > 0) {
            console.log('First customer:', customers[0]);
        }
        if (branches.length === 0) {
            console.log('ERROR: No branches found. Run seedRBAC.ts first.');
            return;
        }
        if (menuItems.length === 0) {
            console.log('ERROR: No menu items found. Run seedMenu.ts first.');
            return;
        }
        if (customers.length === 0) {
            console.log('ERROR: No customers found. Run seedRBAC.ts first.');
            return;
        }
        const testOrder = await prisma_1.default.order.create({
            data: {
                branchId: branches[0].id,
                customerId: customers[0].id,
                status: 'PENDING',
                totalAmount: 15.00,
                deliveryAddress: '123 Test Street',
                items: {
                    create: {
                        menuItemId: menuItems[0].id,
                        quantity: 1,
                        unitPrice: menuItems[0].price,
                        subtotal: menuItems[0].price
                    }
                }
            }
        });
        console.log('Test order created successfully:', testOrder.id);
        const testPayment = await prisma_1.default.payment.create({
            data: {
                orderId: testOrder.id,
                amount: testOrder.totalAmount,
                method: 'CASH',
                status: 'COMPLETED'
            }
        });
        console.log('Test payment created successfully:', testPayment.id);
        await prisma_1.default.payment.delete({ where: { id: testPayment.id } });
        await prisma_1.default.orderItem.deleteMany({ where: { orderId: testOrder.id } });
        await prisma_1.default.order.delete({ where: { id: testOrder.id } });
        console.log('Test completed successfully - order/payment system is working');
    }
    catch (error) {
        console.error('Test failed:', error);
    }
    finally {
        await prisma_1.default.$disconnect();
    }
}
testOrderCreation();
//# sourceMappingURL=testOrder.js.map