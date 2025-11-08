"use client";

import { useTodoStore } from "@/lib/todo-store";
import { useState } from "react";

export default function AddTodoForm() {
  const [input, setInput] = useState("");
  const addTodo =useTodoStore((state)=> state.addTodo)

 const handleSubmit = ()=>{
  console.log("Submitted todo:", input);
  if(input.trim()){
    addTodo(input)
    setInput("")
  }
 }

  return (
    <div className="mb-6 flex gap-2">
      <input
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={(e)=> e.key === "Enter" && handleSubmit()}
        value={input}
        type="text"
        className="flex-1 px-4 py-2 border rounded-lg"
      />
      <button onClick={handleSubmit} className="flex items-center justify-center px-4 py-2 bg-blue-500 text-white text-lg rounded-lg">
      +
      </button>
    </div>
  );
}
 