import { comments } from "./comments";
import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

async function main(){
    for (let comment of comments){
        await prisma.comment.create({
            data: comment
        })
    }
}

main().catch(e=> {
    console.log(e);
    process.exit(1)
}).finally(() => {
    prisma.$disconnect();
})