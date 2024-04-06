"use client";

import React, { useRef } from 'react'
import { Create } from "@/app/Action"
import { useFormState } from "react-dom"
import { Textarea } from "./ui/textarea";
import { Button } from "./ui/button";

function CommentForm() {

    const formRef = useRef<HTMLFormElement>(null);
    
  return (
    <form action={async (formData: FormData)=>{
        await Create(formData);
        formRef.current?.reset();
    }}  className="grid gap-1 w-full max-w-[600px] rounded" ref={formRef}>
        <Textarea placeholder="write your thoughts..." name="content" className="h-[120px] text-lg"/> 
        <div className="text-right">
            <Button variant="outline"  className=" w-24 rounded bg-blue-600 text-white hover:bg-blue-300"
            type="submit">Post</Button>
        </div>
        
    </form>
  )
}

export default CommentForm
