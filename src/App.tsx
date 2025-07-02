import { useEffect, useState } from "react";
import { useAuthenticator } from "@aws-amplify/ui-react";
import type { Schema } from "../amplify/data/resource";
import { generateClient } from "aws-amplify/data";

const client = generateClient<Schema>();

function App() {
  const { user, signOut } = useAuthenticator();
  const [todos, setTodos] = useState<Array<Schema["Todo"]["type"]>>([]);

  // Live subscription + initial load
  useEffect(() => {
    const subscription = client.models.Todo.observeQuery().subscribe({
      next: ({ items }) => setTodos(items),
    });
    return () => subscription.unsubscribe();
  }, []);

  async function refreshTodos() {
    const { data } = await client.models.Todo.list();
    setTodos(data);
  }

  async function createTodo() {
    const content = window.prompt("Todo content");
    if (content) {
      await client.models.Todo.create({ content });
      refreshTodos(); // observeQuery will also catch this, acts as a fallback
    }
  }

  async function deleteTodo(id: string) {
    await client.models.Todo.delete({ id });
    refreshTodos();
  }

  return (
    <main>
      <h1>{user?.signInDetails?.loginId ?? "User"}'s todos</h1>
      <button onClick={createTodo}>+ new</button>
      <ul>
        {todos.map((todo) => (
          <li
            key={todo.id}
            onClick={() => {
              if (
                window.confirm("Are you sure you want to delete this todo?")
              ) {
                deleteTodo(todo.id);
              }
            }}
          >
            {todo.content}
          </li>
        ))}
      </ul>
      <div>
        🥳 App successfully hosted. Try creating a new todo.
        <br />
        <a href="https://docs.amplify.aws/react/start/quickstart/#make-frontend-updates">
          Review next step of this tutorial.
        </a>
      </div>
      <button onClick={signOut}>Sign out</button>
    </main>
  );
}

export default App;