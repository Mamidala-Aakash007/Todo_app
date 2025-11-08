import React, { use, useState } from "react";
import { Todo } from "@/types/todo";
import { useTodoStore } from "@/lib/todo-store";

export default function TodoItems({ todo }: { todo: Todo }) {
  const deleteTodo = useTodoStore((state) => state.deleteTodo);
  const toggleTodo = useTodoStore((state) => state.toggleTodo);
  const updateTodo = useTodoStore((state) => state.updateTodo);
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(todo.text);

  const handleSaveEdit = ()=> {
    if(editText.trim()){
      updateTodo(todo.id, editText)
      setIsEditing(false)
    }
  }

  const handleCencelEdit = ()=>{
    setEditText(todo.text)
    setIsEditing(false)
  }

  return (
    <div
      className={`flex items-center gap-3 p-3 border rounded-lg ${
        todo.completed
          ? "bg-gray-50 border-gray-200"
          : "bg-white border-gray-300"
      }`}
    >
      {/* checkbox */}
      <input
        type="checkbox"
        className="w-5 h-5 text-blue-600"
        checked={todo.completed}
        onChange={() => toggleTodo(todo.id)}
      />
      {/* text todo */}
      <div className="flex-1">
        {isEditing ? (
          <input className="w-full px-2 py-1 border rounded" autoFocus
          value={editText}
          onChange={(e) => setEditText(e.target.value)}
          onKeyDown={(e)=> e.key === "Enter" && handleSaveEdit()}
          />
        ) : (
          <span
            className={`${
              todo.completed ? "line-through text-gray-500" : "text-gray-80"
            }`}
          >
            {todo.text}
          </span>
        )}
      </div>
      {/* action button */}
      <div className="flex gap-1">
        {isEditing ? (
          <>
          <button
            onClick={() => handleSaveEdit()}
            className="p-1 text-blue-600 hover:bg-blue-100 rounded"
          >
            ✅
          </button>
          <button
            onClick={() => handleCencelEdit()}
            className="p-1 text-red-600 hover:bg-red-100 rounded"
          >
            ❌
          </button>
        </>
        ): (
           <>
          <button
            onClick={() => setIsEditing(true)}
            className="p-1 text-blue-600 hover:bg-blue-100 rounded"
          >
            ✏️
          </button>
          <button
            onClick={() => deleteTodo(todo.id)}
            className="p-1 text-red-600 hover:bg-red-100 rounded"
          >
            🗑️
          </button>
        </>
        )}
       
      </div>
    </div>
  );
}
