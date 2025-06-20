const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const bcrypt = require('bcrypt');

async function fullCleanupAndSeed() {
  try {
    // Delete all dependent data in correct order
    await prisma.payment.deleteMany();
    await prisma.orderItem.deleteMany();
    await prisma.order.deleteMany();
    await prisma.menuItem.deleteMany();
    await prisma.inventoryItem.deleteMany();
    await prisma.post.deleteMany();
    await prisma.comment.deleteMany();
    await prisma.menuCategory.deleteMany();
    await prisma.branch.deleteMany();
    await prisma.user.deleteMany();

    // Create HQ branch
    const hqBranch = await prisma.branch.create({
      data: {
        name: 'HQ',
        address: '123 Main St',
        phone: '123-456-7890',
        manager: {
          create: {
            username: 'hqmanager',
            password: await bcrypt.hash('hqmanager123', 10),
            email: 'hqmanager@example.com',
            role: 'GENERAL_MANAGER',
          },
        },
      },
      include: { manager: true },
    });

    // Create branch and branch manager
    const branch = await prisma.branch.create({
      data: {
        name: 'Downtown',
        address: '456 Center Ave',
        phone: '555-123-4567',
        manager: {
          create: {
            username: 'branchmanager',
            password: await bcrypt.hash('branchmanager123', 10),
            email: 'branchmanager@example.com',
            role: 'BRANCH_MANAGER',
          },
        },
      },
      include: { manager: true },
    });

    // Create admin
    const admin = await prisma.user.create({
      data: {
        username: 'admin',
        password: await bcrypt.hash('admin123', 10),
        email: 'admin@example.com',
        role: 'ADMIN',
      },
    });

    // Create chef
    const chef = await prisma.user.create({
      data: {
        username: 'chef',
        password: await bcrypt.hash('chef123', 10),
        email: 'chef@example.com',
        role: 'CHEF',
        branchId: branch.id,
      },
    });

    // Create cashier
    const cashier = await prisma.user.create({
      data: {
        username: 'cashier',
        password: await bcrypt.hash('cashier123', 10),
        email: 'cashier@example.com',
        role: 'CASHIER',
        branchId: branch.id,
      },
    });

    console.log('Seeded users and branches.');
    console.table([
      { role: 'Admin', username: 'admin', password: 'admin123' },
      { role: 'HQ Manager', username: 'hqmanager', password: 'hqmanager123' },
      { role: 'Branch Manager', username: 'branchmanager', password: 'branchmanager123' },
      { role: 'Chef', username: 'chef', password: 'chef123' },
      { role: 'Cashier', username: 'cashier', password: 'cashier123' },
    ]);
  } catch (err) {
    console.error(err);
  } finally {
    await prisma.$disconnect();
  }
}

fullCleanupAndSeed();
