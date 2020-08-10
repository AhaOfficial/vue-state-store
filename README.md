<img src="https://i.imgur.com/R2wksCG.png" width="400"/>





# 📮 vue-state-store

> Simple state management system that full supports for typescript.

📬 Distributed state management module system for Vue. <u>[Pub & Sub model based]</u>

<br/>

## 🌎 Global

> The following multilingual documents are provided. (need pull request help)

([한국어 문서 보기](https://github.com/AhaOfficial/vue-state-store/blob/master/docs/README.KR.md))

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
* [🤔 Q&A](#-qa)
  * [🧲 Q. Doesn't have a $store with all the state stores like vuex?](#-q-doesnt-have-a-store-with-all-the-state-stores-like-vuex)
  * [👀 Q. Will the changed value be rendered again if the `.bind()` value is changed?](#-q-will-the-changed-value-be-rendered-again-if-the-bind-value-is-changed)
  * [📡 Q. Is the `.bind()` value work two way binding?]()
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

<img src="https://i.imgur.com/9qXpXfS.png" width="600"/>

> The `.subscribe()` function, when the execution, gives a function as a return value, which can interrupt the storage subscription at any time. So I write that value name of "unsubscribe".

<br/>

### 📮 Object Type Pub & Sub

> If you look below, you can see that there is little difference between the top and the usage.
>
>  In `store(value)`, the value can be a primary type or object.

<img src="https://i.imgur.com/tuxGorv.png" width="600"/>

<br/>

### 📮 Create state & embedded action

> `vue-state-store` can define embedded actions by inheriting classes.

In `vue-state-store`, the distinction between action and motion is not required.

- By creating any function in the class, you can configure **<u>Embedded action</u>**.
- Any function that transforms a state without being embedded in the class is called <u>**Outside Action**</u>.

<img src="https://i.imgur.com/dDVAN8t.png" width="600"/>

<br/>

### 📮 Binding within the Vue template

> `vue-state-store` can easily bind the repository to the vue template tag, and the bound store continues to support Typescript Intellisense within the template tag. Typescript Intellisense is also supported when using embedded actions into the storage within the <script> tag.

-  The embedded action can be called just by calling the state through `import`.
- The '`bind()` function automatically binds the storage into the template.
  - It is recommended to put '$' in front of the existing storage name as a naming rule, as shown in `return { $vote: vote.bind() }` .
  - The `.bind()` function is recommended to be used within the `setup` function of <u>**@vue/composition-api**</u>.

<img src="https://i.imgur.com/SQKJWe3.png" width="600"/>

<br/>

## 🚀 Advanced Usage

> Explain the advanced ways to use it. (This does not raise the learning curve.)

<br/>

### ⏳ Asynchronous-tic Usage

> The function `.update()` and '.set()' return Promise.

<br/>

- `await` allows certain logic to run after the update job completes when you update the storage values.

<img src="https://i.imgur.com/aKrhrFQ.png" width="600"/>

  

- You can also define callbacks to async that are passed to the update function.

<img src="https://i.imgur.com/B4oHDnG.png" width="600"/>

<br/>

### 💡 Vscode Intellisense Usage

>  To use both **vscode** and **typescript** at the same time and need some Intellisense support, you can obtain the module below.

[Vetur]: https://marketplace.visualstudio.com/items?itemName=octref.vetur

In order to receive support for intellisense in the template after installing vetur, the following option should be added to the vscode setting.

```json
"vetur.experimental.templateInterpolationService": true
```

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

