"use client";

import React, { useRef } from 'react';
import { replyFunction } from "@/app/Action";
import { Textarea } from "./ui/textarea";
import { Button } from "./ui/button";

interface ReplyFormProps {
    toggleReply: () => void; // Function that doesn't take any arguments and doesn't return anything
    parid: string;
}

function ReplyForm({ toggleReply, parid }: ReplyFormProps) {
    const formRef = useRef<HTMLFormElement>(null);

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (formRef.current) {
            const formData = new FormData(formRef.current);
            await replyFunction(formData);
            formRef.current.reset();
        }
        toggleReply(); // Toggle visibility after form submission  
    };

    return (
      <form onSubmit={handleSubmit} className="grid gap-1 w-full max-w-[600px] rounded" ref={formRef}>
          <Textarea placeholder="write your thoughts..." name="content" className="h-[120px] text-lg"/> 
          <input type="text" value={parid} name="inputParentId" hidden/>
          <div className="text-right">
            <Button variant="outline" className="w-24 rounded bg-blue-600 text-white hover:bg-blue-300"
            type="submit">Post</Button>
            <Button variant="outline" onClick={toggleReply} className="w-24 rounded bg-green-600 text-white hover:bg-blue-300">Cancel</Button>
          </div>
      </form>
    ); 
}

export default ReplyForm;
