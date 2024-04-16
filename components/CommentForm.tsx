"use client"
import React, { useRef, useState } from 'react';
import { Create } from "@/app/Action";
import { Textarea } from "./ui/textarea";
import { Button } from "./ui/button";

function CommentForm() {
    const formRef = useRef<HTMLFormElement>(null);
    const [inputValue, setInputValue] = useState('');

    const handleInputChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        setInputValue(event.target.value);
    };

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault(); // Prevent the default form submission behavior
        if (formRef.current) {
            const formData = new FormData(formRef.current);
            await Create(formData);
            // Reset the form and the inputValue state after submission
            formRef.current.reset();
            setInputValue('');
        }
    };

    return (
        <form onSubmit={handleSubmit} className="grid gap-1 w-full max-w-[600px] rounded" ref={formRef}>
            <Textarea onChange={handleInputChange} placeholder="Add a comment" name="content" className="h-[120px] text-base md:text-lg px-3"/> 
            <div className="text-right">
                <Button variant="outline" className="w-24 rounded bg-blue-600 text-white hover:bg-blue-300"
                        type="submit" disabled={!inputValue}>Post</Button> 
            </div>   
        </form>
    );
}

export default CommentForm;
