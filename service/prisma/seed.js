import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcrypt'
const prisma = new PrismaClient()

async function main() {
  const saltRounds = 10;
  const hashedPasswordAdmin = await bcrypt.hash('1235!', saltRounds);
  const hashedPasswordBob = await bcrypt.hash('1231235!', saltRounds);
  const hashedPasswordTutor = await bcrypt.hash('1231235!', saltRounds);
    const admin = await prisma.user.upsert({
      where: { email: "laurent.bily@admin.net"},
      update: {},
      create: {
        firstName: "Laurent",
        lastName: "Bily",
        password: hasehPasswordAdmin,
        email: "laurent.bily@admin.net",
        role: "Admin",
        admin: {
            create: {
                adminId: "1",
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
        password: hashedPasswordBob,
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
        password: hashedPasswordTutor,
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