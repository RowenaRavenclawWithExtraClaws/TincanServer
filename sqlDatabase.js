'use strict'

const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function addCan(can) {
    await prisma.cans.create({
        data: can,
    });
}

async function findCanByID(id) {
    const can = await prisma.cans.findOne({
        where: {
            id: id
        }
    });

    return can; // json or null
}

async function findCanByPhone(phone) {
    const can = await prisma.cans.findOne({
        where: {
            phone: phone
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
module.exports.findCanByID = findCanByID;
module.exports.findCanByPhone = findCanByPhone