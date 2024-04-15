"use client";

import { useState } from "react";

interface ScoreProps {
    score: string;
  }

function Score({ score }: ScoreProps) {

    const [count, setCount] = useState(parseInt(score)) 

    const increase = () => {
        setCount(count + 1);
      };

    const decrease = () => {
        setCount(count - 1);
      };  

  return (
    <div className="grid gap-2 bg-zinc-300 px-1  rounded md:w-[60px] w-[20px] text-center py-5">
      <button onClick={increase} className="text-blue-500 text-xl">+</button>
      <p className="text-blue-800">{count}</p>
      <button onClick={decrease} className="text-blue-500 text-xl">-</button>
    </div>
  )
}

export default Score
