import { Todo } from "@/types/todo";
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface TodoStore {
  todos: Todo[];
  addTodo: (text: string) => void;
  deleteTodo: (id: string) => void;
  toggleTodo: (id: string) => void;
  updateTodo: (id: string, text: string) => void;
  getTodoStats: () => { total: number; active: number; completed: number };
}

export const useTodoStore = create<TodoStore>()(
  persist((set, get) => ({
    todos: [
      // {
      //   id: "1",
      //   text: "Learn Zustand",
      //   completed: false,
      //   createdAt: new Date("2024-01-01"),
      // },
      // {
      //   id: "2",
      //   text: "Implement with Next.js",
      //   completed: true,
      //   createdAt: new Date("2024-01-02"),
      // },
    ],
    // create
    addTodo: (text: string) =>
      set((state) => ({
        todos: [
          ...state.todos,
          {
            id: Date.now().toString(),
            text: text.trim(),
            completed: false,
            createdAt: new Date(),
          },
        ],
      })),
    //DELETE
    deleteTodo: (id: string) =>
      set((state) => ({
        todos: state.todos.filter((todo) => todo.id !== id),
      })),
    //Update
    toggleTodo: (id: string) =>
      set((state) => ({
        todos: state.todos.map(
          (todo) =>
            todo.id === id
              ? { ...todo, completed: !todo.completed } //Update specific todo)
              : todo //keep other todos unchanged
        ),
      })),
    //UPDATE - text todo
    updateTodo: (id: string, text: string) =>
      set((state) => ({
        todos: state.todos.map((todo) =>
          todo.id === id ? { ...todo, text: text.trim() } : todo
        ),
      })),
    // COMPUTE VALUE
    getTodoStats: () => {
      const { todos } = get();
      return {
        total: todos.length,
        active: todos.filter((todo) => !todo.completed).length,
        completed: todos.filter((todo) => todo.completed).length,
      };
    },
  }),
  {
    name: 'todo-storage', // unique name
  }
)

);
