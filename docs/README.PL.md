<img src="https://i.imgur.com/R2wksCG.png" width="400"/>





# 📮 vue-state-store

> Simple state management system that full supports for typescript.

📬 Distributed state management module system for Vue. <u>[Pub & Sub model based]</u>

<br/>

## 📔 Table of Contents

* [😊 Easy use! & Powerful application!](#-easy-use--powerful-application)
  * [💡 Advantages compared to vuex](#-advantages-compared-to-vuex)
  * [💬 Installation](#-installation)
  * [📬 Pub & Sub Model Description](#-pub--sub-model-description)
* [😎 Basic Usage](#-basic-usage)
  * [📮 Primitive Type Pub & Sub](#-primitive-type-pub--sub)
  * [📮 Object Type Pub & Sub](#-object-type-pub--sub)
  * [📮 Create state & embedded action](#-create-state--embedded-action)
  * [📮 Binding within the Vue template](#-binding-within-the-vue-template)
* [🚀 Advanced Usage](#-advanced-usage)
  * [⏳ Asynchronous-tic Usage](#-asynchronous-tic-usage)
  * [💡 Vscode Intellisense Usage](#-vscode-intellisense-usage)
  * [📮 (Advanced) State Use Function Design Pattern](#-advanced-state-use-function-design-pattern)
* [🤔 Q&A](#-qa)
  * [🧲 Q. Doesn't have a $store with all the state stores like vuex?](#-q-doesnt-have-a-store-with-all-the-state-stores-like-vuex)
  * [👀 Q. Will the changed value be rendered again if the `.bind()` value is changed?](#-q-will-the-changed-value-be-rendered-again-if-the-bind-value-is-changed)
  * [📡 Q. Is the `.bind()` value work two way binding?](#-q-is-the-bind-value-work-two-way-binding)
* [📔 License](#-license)

<br/>

## 😊 Easy use! & Powerful application!

`vue-state-store` is a module that is intended to completely replace the `vuex` modules that were popular with the `vue`. <u>**The purpose of this module is to make state management very easy by using 200% efficiency of typescript.**</u>

<br/>

### 💡 Advantages compared to vuex

- **Low running curve** - Use simple publishing & subscription model
- **Supports Typescript Intellisense** - Status & Actions & Mutation & When using variables within Templates
- **Auto-Bind function** - Easy vue template binding.
- **Pure typescript class based definition** - no need to use mix-in
- **A unified action structure** - Flexible use with no distinction between action and motion.
- **Allow flexible state use** - If you omit Mutation, you can use it as Getters.

<br/>

### 💬 Installation

> (Vue2, Vue3, Nuxt is supported. Automatic binding function in Composition API : .bind(')' is supported.)

```
npm i vue-state-store
```

<br/>

### 📬 Pub & Sub Model Description

> vue-state-store uses publish & subscription design patterns.

`vue-state-store` is a storage that exists in the memory where values are stored. The `.subscribe (callback)` function allows you to receive changed values in a callback when values in the storage change, and you can update the values in the storage through `.set (newValue)` and `.update((data) => data)`.

<br/>

## 😎 Basic Usage

>  `vue-state-store` is an easy way to manage both <u>state</u> and <u>actions</u> and <u>mutations</u> through a `function` or `class`.

<br/>

### 📮 Primitive Type Pub & Sub

> Primitive type means five basic types (number, string, boolean, null, undefined).  

```typescript
import { store } from 'vue-state-store'

// Create an object to store its state.
const version = store(0) // Inserts the initial value.

// Get
version.get() // returns 0.

// Set
version.set(1) // Update state to 1.

// Update
version.update((data) => { // Add 1 to the existing state value.
    data += 1
    return data
})

// Subscribe
version.subscribe((data)=> {
    console.log('The following values have been changed:: ', data)
})

// Unsubscribable
const unsubscribe =
    version.subscribe((data) => {
        console.log('The following values have been changed:', data)
    })
// You can abort a storage subscription at
// any time by invoking the function below.
unsubscribe()
```



> The `.subscribe()` function, when the execution, gives a function as a return value, which can interrupt the storage subscription at any time. So I write that value name of "unsubscribe".

<br/>

### 📮 Object Type Pub & Sub

> If you look below, you can see that there is little difference between the top and the usage.
>
>  In `store(value)`, the value can be a primary type or object.

```typescript
import { store } from 'vue-state-store'

// Create an object to store its state.
const detail = store({
  version: 0,
  author: 'AhaOfficial'
}) // Inserts the initial value.

// Get
detail.get() // returns object.

// Set
detail.set({
  version: 1,
  author: 'AhaOfficial'
}) // Update the state to that value.

// Update
detail.update((data) => { // Add 1 to the existing state value.
    data.version += 1
    return data
})

// Subscribe
detail.subscribe((data)=> {
    console.log('The following values have been changed:', data)
})

// Unsubscribable
const unsubscribe =
    detail.subscribe((data) => {
        console.log('The following values have been changed:', data)
    })
// You can abort a storage subscription at
// any time by invoking the function below.
unsubscribe()
```



<br/>

### 📮 Create state & embedded action

> `vue-state-store` can define embedded actions by inheriting classes.

In `vue-state-store`, the distinction between action and motion is not required.

- By creating any function in the class, you can configure **<u>Embedded action</u>**.
- Any function that transforms a state without being embedded in the class is called <u>**Outside Action**</u>.

```typescript
import { Store } from 'vue-state-store'

// Predefine the interface for the state.
export interface IVote {
    upVoteCount: number
    downVoteCount: number
}

// Inherit the Store to create the class.
export class Vote extends Store<IVote> {

    // Action or Mutation can be freely
    // defined as a function of typescript
    // class using .update and .set
    async upVote() {
        await this.update((data) => {
            data.upVoteCount += 1
            return data
        })
    }
    async downVote() {
        await this.update((data) => {
            data.upVoteCount -= 1
            return data
        })
    }
    syncWithNetwork() {
        // API communication function
        // is also freely available.
    }
}

// create a state store and add the initial value.
export const vote = new Vote({
    upVoteCount: 0,
    downVoteCount: 0,
})

// Examples of using actions and mutations
vote.upVote()
vote.downVote()
vote.syncWithNetwork()
```



<br/>

### 📮 Binding within the Vue template

> `vue-state-store` can easily bind the repository to the vue template tag, and the bound store continues to support Typescript Intellisense within the template tag. Typescript Intellisense is also supported when using embedded actions into the storage within the script tag.

-  The embedded action can be called just by calling the state through `import`.
- The '`bind()` function automatically binds the storage into the template.
  - It is recommended to put '$' in front of the existing storage name as a naming rule, as shown in `return { $vote: vote.bind() }` .
  - The `.bind()` function is recommended to be used within the `setup` function of <u>**@vue/composition-api**</u>.

```typescript
<template>
    <div>
        <!--
        TypeScript Intellisense is still supported
        when using stores in template tags.
        -->
        <h1>upVoteCount: {{ $vote.upVoteCount }}</h1>
        <h1>downVoteCount: {{ $vote.downVoteCount }}</h1>
    </div>
</template>

<script lang="ts">
    import * as VueAPI from '@vue/composition-api'

    // Import a store instance.
    import { vote } from '~/store'

    export default VueAPI.defineComponent({
        setup(props, context) {

            // Run upVote every second.
            // (You can see that values are reflected
            // in the template every second.)
            setInterval(() => vote.upVote(), 1000)

            // Bind store values to template tags automatically.
            return {
                $vote: vote.bind()
            }
        },
    })
</script>
```



<br/>

## 🚀 Advanced Usage

> Explain the advanced ways to use it. (This does not raise the learning curve.)

<br/>

### ⏳ Asynchronous-tic Usage

> The function `.update()` and '.set()' return Promise.

<br/>

- `await` allows certain logic to run after the update job completes when you update the storage values.

```typescript
// Promise Update
await version.update((data) => {
    data += 1
    return data
})
await version.set({})
```



  

- You can also define callbacks to async that are passed to the update function.

```typescript
// Promise Update
await detail.update(
    async (data) => {
        const response = await fetch('https://~~~')
        data = response.data
        return data
    }
)
```



<br/>

### 💡 Vscode Intellisense Usage

>  To use both **vscode** and **typescript** at the same time and need some Intellisense support, you can obtain the module below.

[Vetur]: https://marketplace.visualstudio.com/items?itemName=octref.vetur

In order to receive support for intellisense in the template after installing vetur, the following option should be added to the vscode setting.

```json
"vetur.experimental.templateInterpolationService": true
```

<br/>

### 📮 (Advanced) State Use Function Design Pattern

> `vue-state-store` provides examples of design patterns of functions that begin with `use~` similar to React Hooks to make the most of the composition API.

State Use Function refers to the use of a function that is preceded by the word `use` (if there is a state called `useTodo` inside the component and receives the status store as a result).

> This allows you to use the life cycle of the component in the state store.

If you use the accessor(`.set() and .update()`)  to modify the state, it can be very cumbersome to create complex logic, unlike when you modify the existing general variables.

`vue-state-store` allows for convenient change of state by directly accessing bindings within the store without the use of such an accessor. This design pattern is only a simple example of configuring the status usage function when using the Composition API (not necessarily), **If you need to modify the state in a complex way**, or **If you need to create multiple `compute` objects**.

Even if you modify a bound value, the changes are automatically distributed to the callbacks you are subscribing to each time the value changes.

```typescript
import { Store } from 'vue-state-store'
import * as VueAPI from '@vue/composition-api'

// Defines the specification of the state value.
export interface ITodo {
    todoList: string[]
}

// Defines the state class.
export class Todo extends Store<ITodo> {

    // Bind the state value within the store class.
    value = this.bind()

    // Defines the computed value.
    pending = VueAPI.computed(() => {
        return this.value.todoList.filter(item => {
            return item.indexOf('(DONE)') == -1
        })
    })

 	  // Add a Todo.
    addItem(newTodo) {
        this.value.todoList.unshift(newTodo)
    }
  
    // Delete A todo
    deleteItem(item: string) {
        this.value.todoList.splice(this.value.todoList.indexOf(item), 1)
    }

    // Load schedules stored on local storage.
    getTodos() {
        try {
            if (window.localStorage.getItem('todo_list')) {
                this.value.todoList =
                    JSON.parse(
                        window.localStorage.getItem('todo_list')
                    )
            }
        } catch (e) { }
    }

}
```



> If you refer to the value of a bound store in a callback wrapped in `computed` , the callback will occur again whenever the value of that store changes. This reduces the fatigue of re-calculating each function as it is called, thus improving performance when using a state.

```typescript
// Defines the state use function.
export const useTodo = () => {

    // Defines the initial value of the store.
    const todo = new Todo({
        todoList: [
            'Give the peanuts to squirrel.',
            'Giving Churu to a Cat.',
            'Create Vue Example.',
        ]
    })

    // Load the state values that
    // were previously stored on local storage.
    todo.getTodos()

    // Store values on local storage
    // when the todolist changes.
    todo.subscribe(data => {
        try {
            window.localStorage.setItem(
                'todo_list',
                JSON.stringify(data.todoList))
        } catch (e) { }
    })

    return todo
}
```



> To define Vue's lifecycle or `computed`, you must create one isolated function, such as `useTodo`, and must be call within the component.

```typescript
import * as VueAPI from '@vue/composition-api'
import { useTodo } from '~/store'

export default VueAPI.defineComponent({
    setup(props, context) {
        return {
            // Use the Todo state in this component.
            todo: useTodo()
        }
    }
})
```



> As shown above, you can use it within the template tag immediately after using useToto(). (Of course Typescript Intellisense is still supported.)

<br/>

<br/>

## 🤔 Q&A

> Questions can also be asked through the Github Issue section.

  <br/>

### 🧲 Q. Doesn't have a $store with all the state stores like vuex?

>  A. No, it's not. It's a non-recommended design pattern.

it's recommended that you import and use only a few stores after creating any index.ts file, , such as `import { vote } from '~/store`. `vue-state-store` has a distributed structure and can only refer to each other individually if each storage is required.

`vue-state-store` consists of `vue` completely independent (until it is used within the vue template tag through the `.bind()` function).

<br/>

### 👀 Q. Will the changed value be rendered again if the `.bind()` value is changed?

> A. Yes, the storage values changed through the ref of vue are reflected in the DOM through template tags in real time.

<br/>

### 📡 Q. Is the `.bind()` value work two way binding?

> A. Yes, the binding value changes as the storage value changes, and the storage value changes as the binding value changes.

<br/>

<br/>

## 📔 License

> Copyright (c) 2020 AhaOfficial

**MIT Licensed**

