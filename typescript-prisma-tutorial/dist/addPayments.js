"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const prisma_1 = __importDefault(require("./utils/prisma"));
async function addPaymentsToOrders() {
    try {
        const ordersWithoutPayments = await prisma_1.default.order.findMany({
            where: {
                payment: null
            },
            include: {
                payment: true
            }
        });
        console.log(`Found ${ordersWithoutPayments.length} orders without payments`);
        for (const order of ordersWithoutPayments) {
            await prisma_1.default.payment.create({
                data: {
                    orderId: order.id,
                    amount: order.totalAmount,
                    method: 'CASH',
                    status: 'COMPLETED'
                }
            });
            console.log(`Added payment for order ${order.id}`);
        }
        console.log('All payments added successfully!');
    }
    catch (error) {
        console.error('Error adding payments:', error);
    }
    finally {
        await prisma_1.default.$disconnect();
    }
}
addPaymentsToOrders();
//# sourceMappingURL=addPayments.js.map