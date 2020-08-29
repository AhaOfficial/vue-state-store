<img src="https://i.imgur.com/R2wksCG.png" width="400"/>



# 📮 vue-state-store

> Simple state management system that full supports for typescript.

📬 Distributed state management module system for Vue. <u>[Pub & Sub model based]</u>

<br/>

## ⚗️ Recommended Design Pattern

> Describes the recommended design patterns for developing state storage with `vue-state-store`.

When defining components, it is recommended that they be implemented in the following ways:

Declare → Define → Inject → Use

<br/>

### 📐 Declare

> The Declare process actually refers to the process of defining a data type to be contained in a state store as a typescript interface in advance. 'export' all elements for reference in other files.

<br/>

```typescript
/**
 * Declaration of standards for to-do
 */
export interface ITodoItem {
  /**
   * Sequence number of work to be done
   */
  id: number
  /**
   * Title of to-do
   */
  title: string
  /**
   * Completion Status
   */
  done: boolean
}

/**
 * To Do List Status Specification Declaration
 */
export interface ITodo {
  /**
   * Todo List (Array)
   */
  todoList: ITodoItem[]
  /**
   * * Variable of typing in a new to do title
   */
  newTodo: ''
  /**
   * * Whether to show the work to be completed
   */
  showComplete: boolean
}

```

<br/>

### 📦 Define

> The Define process is the process of defining what typescript type values the state store will contain and what values will initially be contained. 'export' all elements for reference in other files.

<br/>

```typescript
import { Store } from 'vue-state-store'
import { ITodo, ITodoItem } from './declare'

/**
 * To Do List State Storage Specification Definition
 */
export class Todo extends Store<ITodo> {}

/**
 * * To Do List State Storage Initialize
 */
export const todo = new Todo({
  todoList: [
    {
      id: 0,
      title: 'Giving peanuts to squirrels',
      done: false
    },
    {
      id: 1,
      title: 'Giving Churu to a Cat',
      done: false
    },
    {
      id: 4,
      title: 'Create Vue Example',
      done: true
    }
  ],
  newTodo: '',
  showComplete: false
})

```



<br/>

### 💉 Inject

> The injection process is logic that can only exist within a component, which defines logic for later injection into the component.The reason of why need to be as a class is because is need to increase the reuse of component logic. (This is a method to resolve the Mix-in pattern of Vue as a typescript while reducing complexity.) 'export' all elements for reference in other files.

<br/>

```typescript
import { ITodoItem } from './declare'
import { todo } from './define'
import { VueAPI } from '~/core'

/**
 * To Do List State Injection Class
 */
export class UseTodo {
  /**
   * To Do List State Store
   */
  todo = todo
  /**
   * Binded To Do Status Store
   */
  $todo = todo.bind()

  /**
   * Work in Progress List
   */
  pending = VueAPI.computed(() => {
    return this.$todo.todoList.filter(item => {
      return !item.done
    })
  })

  /**
   * Completed Task List
   */
  completed = VueAPI.computed(() => {
    return this.$todo.todoList.filter(item => {
      return item.done
    })
  })
}
```

<br/>

### 💊 Use

> The use process is to define a function that, when you actually try to use this state store within a component, injects that store and its associated component logic so that it can be used immediately. 'export' all elements for reference in other files.

<br/>

```typescript
import { todo } from './define'
import { UseTodo } from './inject'

/**
 * To Do List State Use Function
 */
export const useTodo = () => {
  // Create an instance of a class for using state.
  const todoInstance = new UseTodo()

  // Load previously stored local storage values.
  todoInstance.getTodos()

  // Store values on local storage as todolist changes.
  todo.subscribe(data => {
    try {
      if (window) {
        window.localStorage.setItem('todo_list', JSON.stringify(data.todoList))
      }
    } catch (e) {}
  })

  return todoInstance
}

```

<br/>

## 🍱 Separation rule

> Basically, 'declare' → 'define' → 'inject' → 'use' process is implemented in a single file format that matches each English name. However, if a specific process becomes very long, please define the name of the course as a folder and flexibly separate the code from one file for reference through the 'index.ts' file.

<br/>

<img src="https://tva1.sinaimg.cn/large/007S8ZIlgy1gi6hntmsf9j30fc0k279j.jpg" width="200"/>

<br/>

<img src="https://tva1.sinaimg.cn/large/007S8ZIlgy1gi6hoktamdj30j807uq5z.jpg" width="400"/>



## 🤔 Single File Example

> If the state store and its associated logic are simple, or if you need to just create it quickly, you can put all of the logic in one file, as shown below. However, please make sure to specify the 4th step as much as possible.

<br/>

```typescript
import { Store } from 'vue-state-store'

/**
 * Counter State Declaration
 */
export interface ICounter {
  /**
   * A number that is counted one by one.
   */
  count: number
}

/**
 * Define Counter State Storage Specifications
 */
export class Counter extends Store<ICounter> {}

/**
 * Counter State Storage Definition
 */
export const counter = new Counter({
  count: 0
})

/**
 * Counter State Injection Class
 */
export class UseCount {
  /**
   * The counter state store.
   */
  counter = counter
  /**
   * Binded counter state store.
   */
  $counter = counter.bind()
  /**
   * The action that raises the counter by 1.
   */
  up = () => this.$counter.count++
  /**
   * The action that drops the counter by 1.
   */
  down = () => this.$counter.count--
}

/**
 * Counter state use function
 */
export const useCount = () => {
  const countInstance = new UseCount()
  return countInstance
}

```



