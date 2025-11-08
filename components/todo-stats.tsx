"use client";

import { useTodoStore } from "@/lib/todo-store";
import { useEffect, useState } from "react";


export default function TodoStats() {

  const getTodoStats = useTodoStore((state)=> state.getTodoStats)
  const stats = getTodoStats();

  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, []);

  if(!mounted) {
    return <div className="mb-4 text-gray-500">Loading...</div>
  }
  return (
    <div className="mb-4 text-center">
      <div className="inline-flex items-center gap-4 px-4 py-2 bg-gray-100 rounded-lg text-sm text-gray-600">
        <span>🗒️ Total: {stats.total}</span>
        <span>⌛ Active: {stats.active}</span>
        <span>✅ Completed: {stats.completed}</span>
      </div>
    </div>
  );
}
