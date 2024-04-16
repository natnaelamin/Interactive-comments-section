"use client";

import Image from "next/image";
import {deleteComment, edit} from "@/app/Action";
import { useState } from "react";
import { Textarea } from "@/components/ui/textarea"
import { MdDelete } from "react-icons/md";
import { MdModeEditOutline } from "react-icons/md";
import Score from "./Score";
import ReplyForm from "./ReplyForm";
import RepButton from "./RepButton";
import NestedRepForm from "./NestedRepForm";
import NestedRepButton from "./NestedRepButton";

interface commentProps {
    id: string;
    content: string;
    username: string;
    score: string;
    image: string;
    parentId: string | null;
    isNew: boolean;
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
  const [store, setStore] = useState("")
  const [show, setShow] = useState(false)
  const [replyingToReply, setReplyingToReply] = useState(false);


  const toggleReply = () =>{
    setIsVisible(!isVisible)
}

const toggleInputField = () => {
  setShow(!show);
}

console.log(replyingToReply)

const renderNestedReplies = (replies: repliesProps[]) => {
  return replies.map((reply) => (
    <div key={reply.id} className="">
      {/* Render the reply */}  
      <div className="bg-white mb-5 md:p-5 p-2 rounded-xl flex md:gap-5 gap-2 md:w-[710px] w-[320px] ml-8 md:ml-10">
        <Score score={reply.score} />
        <form action={edit}>
          <div className="flex justify-between">
            <div className="flex gap-2 md:gap-4 pt-1 w-full">
              <Image src={reply.image} width={50} height={50} alt="profile pic" />
              <h1 className="pt-3 font-semibold text-sm md:text-base">{reply.username}</h1>
              {reply.isNew && <p className="text-white bg-blue-800 text-xs md:text-base pb-3 md:pb-0 w-8 h-4 md:h-6 mt-4 md:mt-3 rounded text-center">you</p>}
            </div>
            <div className="text-right">
              <input type="text" value={reply.id} name="inputId" hidden />
              {reply.isNew ? (
               <div className="flex gap-1 md:gap-2">
                  <button formAction={deleteComment} className="text-red-800 text-sm md:text-base flex gap-1">
                    <MdDelete className="mt-1" />delete
                  </button>
                  <button type="submit" className="text-blue-800 flex text-sm md:text-base gap-1 ml-1 md:ml-2">
                    <MdModeEditOutline className="mt-1" />edit
                  </button>
               </div>
              ) : (
               <NestedRepButton toggleReply={toggleInputField} user={reply.username} setuser={setStore} setReplyingToReply={setReplyingToReply}/>
              )}
            </div>
          </div>
          {replyingToReply  ? <div className="flex flex-grow w-[280px] text-sm md:text-base px-2 md:w-[640px]">
          <Textarea name="editinput" defaultValue={`@${store} ${reply.content}`} className="text-slate-500 text-md border-none"/>
         </div>:
          <div className="flex flex-grow w-[280px] text-sm md:text-base px-2 md:w-[640px]">
          <Textarea name="editinput" defaultValue={`@${comment.username} ${reply.content}`} className="text-slate-500 text-md border-none"/>
         </div>}
        </form>
      </div>

      {(show && !reply.isNew) && (
      <div className="md:w-[600px] w-full mb-10 px-5 md:px-0 flex justify-center items-center">
        <NestedRepForm toggleReply={toggleInputField} parid={comment.id} setReplyingToReply={setReplyingToReply}/>
      </div>
      )}  
    </div>
  ));
};

return (
  <div className="grid gap-5">
    <div className="bg-white mb-5 md:p-5 p-2 rounded-xl flex gap-2 md:w-full w-[350px] md:gap-5">
      <Score score={comment.score} />
      <form action={edit} className="flex-grow">
        <div className="flex justify-between w-full">
          <div className="flex gap-2 md:gap-4 w-full">
            <Image src={comment.image} width={50} height={50} alt="profile pic" />
            <h1 className="pt-3 font-semibold text-sm md:text-base">{comment.username}</h1>
            {comment.isNew && <p className="text-white bg-blue-800 text-xs md:text-base pb-3 md:pb-0 w-8 h-4 md:h-6 mt-4 md:mt-3 rounded text-center">you</p>}
          </div>
          <div className="text-right">
            <input type="text" value={comment.id} name="inputId" hidden />
            {comment.isNew ? (
              <div className="flex gap-1 md:gap-2 pb-2">
               <button formAction={deleteComment} className="text-red-800 text-sm md:text-base flex gap-1">
                  <MdDelete className="mt-1" />delete
               </button>
               <button type="submit" className="text-blue-800 text-sm md:text-base flex gap-1 ml-1 md:ml-2">
                  <MdModeEditOutline className="mt-1" />edit
               </button>
              </div>
            ) : (
              <RepButton toggleReply={toggleReply} />
            )}
          </div>
        </div>
        <div className="flex flex-grow w-full px-2 text-sm md:text-base md:w-[650px]">
         <Textarea name="editinput" defaultValue={comment.content} className="text-slate-500 text-md border-none" />
        </div>
      </form>
    </div>

    {isVisible && (
      <div className="max-w-[600px] w-full px-5 md:px-0 mb-10 flex justify-center items-center"> 
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