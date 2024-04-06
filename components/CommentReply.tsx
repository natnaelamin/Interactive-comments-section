import Image from "next/image";
import { Create, deleteComment, edit, replyFunction } from "@/app/Action";
import { useState } from "react";
import { Textarea } from "@/components/ui/textarea"
import { FaReplyAll } from "react-icons/fa6";
import { MdDelete } from "react-icons/md";
import { MdModeEditOutline } from "react-icons/md";
import { Button } from "./ui/button";

interface commentProps {
     
    id: string;
    content: string;
    username: string;
    score: string;
    image: string;
    parentId: string | null;
    isNew: boolean;
  };

function CommentReply(reply: commentProps, comment: commentProps) {
  return (
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
  ) 
}

export default CommentReply
