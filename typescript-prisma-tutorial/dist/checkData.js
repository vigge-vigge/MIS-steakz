"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const prisma_1 = __importDefault(require("./utils/prisma"));
async function checkData() {
    try {
        const orders = await prisma_1.default.order.findMany({
            include: {
                payment: true,
                items: { include: { menuItem: true } },
                customer: true
            }
        });
        console.log('Orders found:', orders.length);
        orders.forEach(order => {
            console.log(`Order ${order.id}: Total $${order.totalAmount}, Payment: ${order.payment ? `$${order.payment.amount}` : 'No'}, Customer: ${order.customer?.username || 'Unknown'}`);
        });
        const payments = await prisma_1.default.payment.findMany();
        console.log('Total payments:', payments.length);
    }
    catch (error) {
        console.error('Error:', error);
    }
    finally {
        await prisma_1.default.$disconnect();
    }
}
checkData();
//# sourceMappingURL=checkData.js.map