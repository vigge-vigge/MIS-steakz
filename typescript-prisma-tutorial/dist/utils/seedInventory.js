"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const prisma_1 = __importDefault(require("../utils/prisma"));
async function seedInventory() {
    const branch = await prisma_1.default.branch.findFirst();
    if (!branch) {
        console.log('No branch found. Create a branch first.');
        return;
    }
    const inventoryItems = [
        { name: 'Kött (Beef)', quantity: 50, unit: 'kg', minThreshold: 10, branchId: branch.id },
        { name: 'Kyckling (Chicken)', quantity: 30, unit: 'kg', minThreshold: 5, branchId: branch.id },
        { name: 'Sallad (Lettuce)', quantity: 20, unit: 'kg', minThreshold: 3, branchId: branch.id },
        { name: 'Potatis (Potatoes)', quantity: 40, unit: 'kg', minThreshold: 8, branchId: branch.id },
        { name: 'Lök (Onions)', quantity: 15, unit: 'kg', minThreshold: 2, branchId: branch.id },
        { name: 'Vitlök (Garlic)', quantity: 5, unit: 'kg', minThreshold: 1, branchId: branch.id },
        { name: 'Salt', quantity: 10, unit: 'kg', minThreshold: 2, branchId: branch.id },
        { name: 'Peppar (Pepper)', quantity: 3, unit: 'kg', minThreshold: 1, branchId: branch.id },
    ];
    for (const item of inventoryItems) {
        await prisma_1.default.inventoryItem.upsert({
            where: { id: (await prisma_1.default.inventoryItem.findFirst({ where: { name: item.name, branchId: item.branchId } }))?.id || 0 },
            update: item,
            create: item,
        });
    }
    console.log('Inventory seeded!');
}
seedInventory().finally(() => prisma_1.default.$disconnect());
//# sourceMappingURL=seedInventory.js.map