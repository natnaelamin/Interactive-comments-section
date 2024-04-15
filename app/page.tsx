
import prisma from "./db";
import CommentForm from "@/components/CommentForm";
import MainComment from "@/components/MainComment";


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

  const topLevelComments = data.filter((comment) => comment.parentId === null);
  const replies = data.filter((comment) => comment.parentId !== null);

  return { topLevelComments, replies };
}

export default async function Home() {

  const { topLevelComments, replies } = await getData();
  
  return (
    <div className="py-[50px] px-2 md:px-[300px] bg-zinc-300">
      <div className="w-full max-w-[600px] mb-10 flex justify-center items-center">    
        <CommentForm />
      </div>
      {topLevelComments.map((comment) => (
        <div key={comment.id}>
          <div >
            <div >
              <MainComment comment={comment} replies={replies.filter((reply) => reply.parentId === comment.id)}/>
            </div>
          </div>
        </div>
      ))} 
    </div>
  );
}
