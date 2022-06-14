import React, { useState } from "react"
import { createTodo } from "../lib/api/todos"
import { Todo } from "../interfaces/index"

interface TodoFormProps {
  todos: Todo[]
  setTodos: Function
}

export const TodoForm: React.FC<TodoFormProps> = ({ todos, setTodos }) => {
  // const [状態変数, 状態を変更するための関数] = useState(状態の初期値);
  const [title, setTitle] = useState<string>("")

  // async 非同期関数定義
  const handleCreateTodo = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const data: Todo = {
      title: title
    }

    try {
      const res = await createTodo(data)
      console.log(res)

      if (res.status == 200) {
        // ... スプレッド演算子 オブジェクトを展開する
        setTodos([...todos, res.data.todo])
      } else {
        console.log(res.data.message)
      }
    } catch (err) {
      console.log(err)
    }

    // titleを空に
    setTitle("")
  }

  return (
    <form onSubmit={handleCreateTodo}>
      <input
        type="text"
        value={title}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
          setTitle(e.target.value)
        }}
      />
      <input type="submit" value="Add" disabled={!title} />
    </form>
  )
}
