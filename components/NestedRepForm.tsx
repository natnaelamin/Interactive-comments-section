"use client";

import React, { useRef, useState} from 'react';
import { replyFunction } from "@/app/Action";
import { Textarea } from "./ui/textarea";
import { Button } from "./ui/button";

interface ReplyFormProps {
    toggleReply: () => void; // Function that doesn't take any arguments and doesn't return anything
    parid: string;
    setReplyingToReply: any;
}

function NestedRepForm({ toggleReply, parid, setReplyingToReply }: ReplyFormProps) {
    const formRef = useRef<HTMLFormElement>(null);
    const [inputValue, setInputValue] = useState("");

    const handleInput = (event: React.ChangeEvent<HTMLTextAreaElement>) =>{
        setInputValue(event.target.value)
    }

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (formRef.current) {
            const formData = new FormData(formRef.current);
            await replyFunction(formData);
            formRef.current.reset();  
        }
        setTimeout(() => {
            toggleReply(); // Toggle visibility after form submission
            setReplyingToReply(false);
        }, 1000);  
    };

    return (
      <form onSubmit={handleSubmit} className="grid gap-1 w-full ml-5 md:ml-10  max-w-[600px] rounded" ref={formRef}>
          <Textarea placeholder="Add a comment" onChange={handleInput} name="content" className="h-[80px] md:h-[120px] text-sm md:text-lg px-3"/> 
          <input type="text" value={parid} name="inputParentId" hidden/>
          <div className="text-right">
            <Button variant="outline" disabled={!inputValue} className="md:w-24 w-14 text-xs md:text-base rounded bg-blue-600 text-white hover:bg-blue-300"
            type="submit">Post</Button>
          </div>
      </form>
    ); 
}

export default NestedRepForm