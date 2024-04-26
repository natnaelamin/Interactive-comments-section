
import prisma from "../db";
import CommentForm from "@/components/CommentForm";
import MainComment from "@/components/MainComment";
import { Button } from "@/components/ui/button";
import {LoginLink, getKindeServerSession} from "@kinde-oss/kinde-auth-nextjs/server";
import { RedirectType, redirect } from "next/navigation";

interface Commenttype {
  username: string;
  id: string;
  content: string;
  image: string;
  score: string;
  parentId: string | null;
  isNew: boolean;
 }

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

  const topLevelComments = data.filter((comment: Commenttype) => comment.parentId === null);
  const replies = data.filter((comment: Commenttype) => comment.parentId !== null);

  return { topLevelComments, replies };
}

export default async function DashboardPage() {

  const { topLevelComments, replies } = await getData();

  const {isAuthenticated} = getKindeServerSession();

  
  
  return(await isAuthenticated()) ? (
    <div className="py-[50px] px-2 md:px-[300px]">
      <div className="w-full max-w-[600px] mb-10 flex justify-center items-center">    
        <CommentForm />
      </div>
      {topLevelComments.map((comment: Commenttype) => (
        <div key={comment.id}>
          <div >
            <div >
              <MainComment comment={comment} replies={replies.filter((reply: Commenttype) => reply.parentId === comment.id)}/>
            </div>
          </div>
        </div>
      ))} 
    </div>
  ):
  (
    <div className="flex justify-center items-center pt-24">
      This page is protected, please <Button className="mx-1 h-[4vh]"> <LoginLink postLoginRedirectURL='/dashboard'>Login</LoginLink></Button> to view it
    </div>
  )
}
