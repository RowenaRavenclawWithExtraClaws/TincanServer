'use strict'

const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function addCan(can) {
    await prisma.cans.create({
        data: can,
    });
}

async function findCan(id) {
    const can = await prisma.cans.findOne({
        where: {
            id: id
        }
    });

    return can; // json or null
}

/*findCan().catch(e => {
    throw e;
}).finally(async () => {
    await prisma.disconnect();
})*/

module.exports.prisma = prisma;
module.exports.addCan = addCan;
module.exports.findCan = findCan;