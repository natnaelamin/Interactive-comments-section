"use client";

import Image from "next/image";
import { Create, deleteComment, edit, replyFunction } from "@/app/Action";
import { useState } from "react";
import { Textarea } from "@/components/ui/textarea"
import { FaReplyAll } from "react-icons/fa6";
import { MdDelete } from "react-icons/md";
import { MdModeEditOutline } from "react-icons/md";
import { Button } from "./ui/button";
import Score from "./Score";
import ReplyForm from "./ReplyForm";
import RepButton from "./RepButton";

interface commentProps {
    id: string;
    content: string;
    username: string;
    score: string;
    image: string;
    parentId: string | null;
    isNew: boolean;
    
    // Array of comment objects
  }

  interface repliesProps {
     // Optional replies property
        id: string;
        content: string;
        username: string;
        score: string;
        image: string;
        parentId: string | null;
        isNew: boolean;

      }[];
  


function MainComment({ comment, replies }: { comment: commentProps; replies: repliesProps[] }) {

  const [isVisible, setIsVisible] = useState(false)

    const toggleReply = () =>{
        setIsVisible(!isVisible)
    }

    const renderNestedReplies = (replies: repliesProps[]) => {
      return replies.map((reply) => (
        <div key={reply.id} className="">
          {/* Render the reply */}
          <div className="bg-white mb-5 p-5 rounded-xl flex gap-5 ml-10">
            <Score score={reply.score} />
            <form action={edit}>
              <div className="flex justify-between">
                <div className="flex gap-4 w-full">
                  <Image src={reply.image} width={50} height={50} alt="profile pic" />
                  <h1 className="pt-3 font-semibold">{reply.username}</h1>
                  {reply.isNew && <p className="text-white bg-blue-800 w-8 h-6 mt-3 rounded text-center">you</p>}
                </div>
                <div className="text-right">
                  <input type="text" value={reply.id} name="inputId" hidden />
                  {reply.isNew ? (
                   <div className="flex gap-2">
                      <button formAction={deleteComment} className="text-red-800 flex gap-1">
                        <MdDelete className="mt-1" />delete
                      </button>
                      <button type="submit" className="text-blue-800 flex gap-1 ml-2">
                        <MdModeEditOutline className="mt-1" />edit
                      </button>
                   </div>
                  ) : (
                   <RepButton toggleReply={toggleReply} />
                  )}
                </div>
              </div>
              <Textarea name="editinput" defaultValue={reply.content} className="text-slate-500 md:w-[600px] w-full text-md border-none" />
            </form>
          </div>
  
          {/* Render nested replies */}
          {replies.filter((nestedReply) => nestedReply.parentId === reply.id).map((nestedReply) => (
            <div key={nestedReply.id} className="ml-20">
              {renderNestedReplies([nestedReply])}
            </div>
          ))}
        </div>
      ));
   };
  
   return (
      <div className="grid gap-5">
        <div className="bg-white mb-5 p-5 rounded-xl flex gap-5">
          <Score score={comment.score} />
          <form action={edit} >
            <div className="flex justify-between w-full">
              <div className="flex gap-4 w-full">
                <Image src={comment.image} width={50} height={50} alt="profile pic" />
                <h1 className="pt-3 font-semibold">{comment.username}</h1>
                {comment.isNew && <p className="text-white bg-blue-800 w-8 h-6 mt-3 rounded text-center">you</p>}
              </div>
              <div className="text-right">
                <input type="text" value={comment.id} name="inputId" hidden />
                {comment.isNew ? (
                  <div className="flex gap-2">
                   <button formAction={deleteComment} className="text-red-800 flex gap-1">
                      <MdDelete className="mt-1" />delete
                   </button>
                   <button type="submit" className="text-blue-800 flex gap-1 ml-2">
                      <MdModeEditOutline className="mt-1" />edit
                   </button>
                  </div>
                ) : (
                  <RepButton toggleReply={toggleReply} />
                )}
              </div>
            </div>
            <Textarea name="editinput" defaultValue={comment.content} className="text-slate-500 md:w-[650px] w-full text-md border-none" />
          </form>
        </div>
  
        {isVisible && (
          <div className="w-[600px] mb-10 flex justify-center items-center">
            <ReplyForm toggleReply={toggleReply} parid={comment.id} />
          </div>
        )}
  
        <div className="text-right">
          {replies && renderNestedReplies(replies)}
        </div>
      </div>
   );
  }


export default MainComment
