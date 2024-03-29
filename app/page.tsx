import Image from "next/image";
import prisma from "./db";
import { Textarea } from "@/components/ui/textarea"
import { FaReplyAll } from "react-icons/fa6";
import { MdDelete } from "react-icons/md";
import { MdModeEditOutline } from "react-icons/md";
import { Button } from "@/components/ui/button";
import { revalidatePath } from "next/cache";
import Score from "@/components/Score";



async function getData(){
  const data = await prisma.comment.findMany({
    select:{
      username: true,
      id: true,
      content: true,
      image: true,
      score: true,
      parentId: true,
      isNew: true,
    },
    orderBy: {
      createdAt: 'asc', 
    },
  });

  return data;  
}

export default async function Home() {

  const data = await getData();

  async function Create(formData: FormData){
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


  
  return (
    <div className="py-[200px] px-[300px] bg-zinc-300">

      <div className="w-[600px] mb-10 flex justify-center items-center">
        <form action={Create} className="grid gap-1 w-full max-w-[600px] rounded">
          <Textarea placeholder="write your thoughts..." name="content" className="h-[120px] text-lg"/>
          <div className="text-right">
            <Button variant="outline"  className=" w-24 rounded bg-blue-600 text-white hover:bg-blue-300"
            type="submit">Post</Button>
          </div>
        </form>
      </div>

      {data.map((comment) => (
        <div key={comment.id}>
          {comment.parentId === null && <div >
            <div className=" bg-white mb-5 p-5 rounded-xl flex gap-5">
              <Score score={comment.score}/>
              
              <div>
                <div className="flex justify-between w-full">
                  <div className="flex gap-4 w-full">
                    <Image src={comment.image} width={50} height={50} alt="profile pic"/>
                    <h1 className="pt-3 font-semibold">{comment.username}</h1>
                    {comment.isNew && <p className="text-white bg-blue-800 w-8 h-6 mt-3 rounded text-center ">you</p>}
                  </div>
                  <div className="text-right">
                    {comment.isNew ? (<div className="flex gap-2"><button className="text-red-800 flex gap-1"><MdDelete  className="mt-1"/>delete</button>
                    <button className="text-blue-800 flex gap-1 ml-2"><MdModeEditOutline  className="mt-1"/>edit</button> </div>)
                    :<button className="text-blue-800 flex gap-1"><FaReplyAll className="mt-1"/>Replay</button>}
                  </div>
                </div>
                <p className="text-slate-500 md:w-[650px] w-full">{comment.content}</p> {/* Render content */}
              </div>
            </div>

            <div>
              {data.map((reply) =>(
                <div key={reply.id}>
                  {reply.parentId === comment.id && 
                  <div className=" bg-white mb-5 p-5 rounded-xl flex gap-5 ml-10">
                    <div className="grid gap-2 bg-zinc-300  rounded w-[60px] text-center py-5">
                      <button className="text-blue-500 text-xl">+</button>
                      <p className="text-blue-800">{reply.score}</p>
                      <button className="text-blue-500 text-xl">-</button>
                    </div>
                    <div>
                      <div className="flex justify-between">
                        <div className="flex gap-4">
                          <Image src={reply.image} width={50} height={50} alt="profile pic"/>
                          <h1 className="pt-3 font-semibold">{reply.username}</h1>
                          {reply.isNew && <p className="text-white bg-blue-800 w-8 h-6 mt-3 rounded text-center ">you</p>}
                        </div>
                          {comment.isNew ? (<div className="flex gap-2"><button className="text-red-800 flex gap-1"><MdDelete  className="mt-1"/>delete</button>
                          <button className="text-blue-800 flex gap-1"><MdModeEditOutline  className="mt-1"/>edit</button> </div>)
                          :<button className="text-blue-800 flex gap-1"><FaReplyAll className="mt-1"/>Replay</button>}
                      </div>
                      <p className="text-slate-500 "><span className="text-blue-800">@{comment.username} </span>{reply.content}</p> {/* Render content */}
                    </div>
                  </div>
                  }
                </div>
              ))}
            </div>
          </div>}
  
        </div>
      ))}
    </div>
  );
}
