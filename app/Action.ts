"use server";

import prisma from "./db";
import { revalidatePath } from "next/cache";

export async function Create(formData: FormData){
    "use server";

    const content = formData.get("content") as string;
    const username = "Anonymous" as string; 
    const score =  "0" as string; 
    const image = "/images/avatars/image-maxblagun.png" as string;

    await prisma.comment.create({
      data:{
        content,
        username,
        score,
        image,
        isNew: true,
        
      },
    });

    revalidatePath('/') 

  }

  export async function deleteComment(formData: FormData){
    "use server";

    const inputId = formData.get("inputId") as string;

    await prisma.comment.delete({
      where:{
        id: inputId
      },
    });

    revalidatePath("/")
  }

  export async function edit(formData: FormData){
    "use server"

    const content = formData.get("editinput") as string;
    const inputId = formData.get("inputId") as string;

    await prisma.comment.update({
      where: {
        id: inputId,
      },
      data:{
          content 
      },
    });

    revalidatePath('/')
  }

  export async function replyFunction(formData: FormData){
    "use server";

    const content = formData.get("content") as string;
    const username = "Anonymous" as string; 
    const score =  "0" as string; 
    const image = "/images/avatars/image-maxblagun.png" as string;
    const parentId = formData.get("inputParentId") as string;
    
    
    await prisma.comment.create({
      data:{
        content,
        username,
        score,
        image,
        parentId,
        isNew: true, 
      },
    });

    revalidatePath('/') 

  }