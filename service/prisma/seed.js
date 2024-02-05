import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
    const admin = await prisma.user.upsert({
      where: { email: "laurent.bily@admin.net"},
      update: {},
      create: {
        firstName: "Laurent",
        lastName: "Bily",
        password: "1235!",
        email: "laurent.bily@admin.net",
        role: "Admin",
        admin: {
            create: {
                adminId: "1234543241342",
            },
        },
      },
    });

    const bob = await prisma.user.upsert({
      where: { email: "bob.gerald@efrei.net"},
      update: {},
      create: {
        firstName: "bob",
        lastName: "Gerald",
        password: "1231235!",
        email: "bob.gerald@efrei.net",
        role: "Student",
        student: {
            create: {
                promotion: "2028"
            },
        },
      },
    });

    const tutor = await prisma.user.upsert({
      where: { email: "aron.ridou@tutor.net"},
      update: {},
      create: {
        firstName: "Aron",
        lastName: "Ridou",
        password: "1231235!",
        email: "aron.ridou@tutor.net",
        role: "Tutor",
        tutor: {
            create: {},
        },
      },
    });

    console.log({admin, bob, tutor});
    

}


main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })