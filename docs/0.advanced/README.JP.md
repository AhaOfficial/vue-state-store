<img src="https://i.imgur.com/R2wksCG.png" width="400"/>

<br/>

# 📮 vue-state-store

> 完全にTypescriptをサポートする簡単なstate management体系です。

📬 Vue専用に分散された状態管理モジュール体系です。 <u>[発行-購読(Pub & Sub)モデル基盤]</u>

<br/>

## 🌎 翻訳支援

 @yopinojiさん、ありがとうございます。😊😊

<br/>

## ⚗️ 推奨デザインパターン

> `vue-state-store` による状態リポジトリ開発時に推奨されるデザインパターンを説明します。

コンポーネントを定義する際、以下の方式を通じて実装することをお勧めします。

宣言(declare) → 定義(decline) → 注入(inject) → 使用(use)

<br/>

### 📐 宣言 (declare)

> 宣言(declare)とは、実際にステータスリポジトリに入れられる資料型を予めタイプスクリプトインタフェースで定義する過程を意味します。 他のファイルで参照できるようにすべての要素を「エクスポート」します。

<br/>

```typescript
/**
 * すべきことの規格を宣言します.
 */
export interface ITodoItem {
  /**
   * 実行する作業のシーケンス番号です。
   */
  id: number
  /**
   * ToDoのタイトルです。
   */
  title: string
  /**
   * 完了ステータスです。
   */
  done: boolean
}

/**
 * すべきことリストのステータスを宣言します。
 */
export interface ITodo {
  /**
   * Todo List (Array)
   */
  todoList: ITodoItem[]
  /**
   * * 新しいToDoタイトルを入力する変数です。
   */
  newTodo: ''
  /**
   * * 完成する作業を表示するかどうかを指定します。
   */
  showComplete: boolean
}
```

<br/>

### 📦 定義 (define)

> 定義(define)プロセスは、ステータスリポジトリがどのようなタイプのスクリプトタイプの値を入れるのか、初期にどのような値を入れるのか、定義するプロセスです。 他のファイルで参照できるようにすべての要素を「エクスポート」します。

<br/>

```typescript
import { Store } from 'vue-state-store'
import { ITodo, ITodoItem } from './declare'

/**
 * やることリストの状態、リポジトリ規格の定義です。
 */
export class Todo extends Store<ITodo> {}

/**
 * * することリスト状態のリポジトリの初期化過程です。
 */
export const todo = new Todo({
  todoList: [
    {
      id: 0,
      title: 'リスにピーナッツをあげなければなりません。',
      done: false
    },
    {
      id: 1,
      title: '猫にChuruをあげなければなりません。',
      done: false
    },
    {
      id: 4,
      title: 'Vue例を作成する必要があります。',
      done: true
    }
  ],
  newTodo: '',
  showComplete: false
})
```



<br/>

### 💉 注入 (inject)

> 注入(inject)過程はコンポーネント内でのみ存在するロジックで、後でコンポーネントの中に注入されるためのロジックを定義する過程です。 クラスで構成する理由は，コンポーネントロジックのリユース性を高めるためです。 (VueのMix-inパターンをタイプスクリプト的に解決しながらも、複雑度を下げるための方法です。)他のファイルで参照されるように全ての要素を「エクスポート」します。

<br/>

```typescript
import { ITodoItem } from './declare'
import { todo } from './define'
import { VueAPI } from '~/core'

/**
 * することリストステータス使用注入クラスです。
 */
export class UseTodo {
  /**
   * することリストステータスリポジトリ
   */
  todo = todo
  /**
   * バインディングされたすることリストのステータスリポジトリ
   */
  $todo = todo.bind()

  /**
   * 作業中のリスト
   */
  pending = VueAPI.computed(() => {
    return this.$todo.todoList.filter(item => {
      return !item.done
    })
  })

  /**
   * 完了した作業リスト
   */
  completed = VueAPI.computed(() => {
    return this.$todo.todoList.filter(item => {
      return item.done
    })
  })
}
```



<br/>

### 💊 使用 (use)

> 使用（use）プロセスとは、コンポーネント内で実際にこの状態のリポジトリを使用しようとするときに呼び出すだけで該当リポジトリとそれに関連するコンポーネントロジックを注入し、リポジトリに関連するコンポーネントロジックをすぐに使用できるようにしてくれる関数を定義するプロセスです。 他のファイルで参照できるようにすべての要素を「エクスポート」します。

<br/>

```typescript
import { todo } from './define'
import { UseTodo } from './inject'

/**
 * することリストステータス使用関数
 */
export const useTodo = () => {
  // 状態を使用するクラスのインスタンスを作成します。
  const todoInstance = new UseTodo()

  // 以前に保存されたローカルストレージの値をロードします。
  todoInstance.getTodos()

  // リストの変更に応じて、値をローカル ストレージに保存します。
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

## 🍱 分離規則

> 基本的には「宣言(declare)」「定義(declare)」「→「注入(inject)」「使用(use)」プロセスがそれぞれ英語名で一致する単一ファイル形態で実現します。 ですが、特定のプロセスのコードが長くなる場合、そのプロセス名をフォルダで定義してから、「index.ts」ファイルで参照されるようにコードをひとつのファイルから柔軟に分離してください。

<br/>

<img src="https://tva1.sinaimg.cn/large/007S8ZIlgy1gi6hntmsf9j30fc0k279j.jpg" width="200"/>

<br/>

<img src="https://tva1.sinaimg.cn/large/007S8ZIlgy1gi6hoktamdj30j807uq5z.jpg" width="400"/>



## 🤔 単一ファイルの例

> もしステータス リポジトリとそれに関連するロジックが簡単な場合や、いったん素早い作成が必要な場合、以下のように一つのファイルにすべてのロジックを収めることができます。 ただし、4段階の過程を最大限必ず明示してください。

<br/>

```typescript
import { Store } from 'vue-state-store'

/**
 * カウンターステート宣言です。
 */
export interface ICounter {
  /**
   * 1ずつカウンティングされる数字です。
   */
  count: number
}

/**
 * カウンターステートストレージ仕様を定義します。
 */
export class Counter extends Store<ICounter> {}

/**
 * カウンターステートストレージの定義です。
 */
export const counter = new Counter({
  count: 0
})

/**
 * Counter State Injection クラスです。
 */
export class UseCount {
  /**
   * カウンタ ステート ストアです。
   */
  counter = counter
  /**
   * バインドされたカウンタ ステート ストアです。
   */
  $counter = counter.bind()
  /**
   * カウンタを 1 だけ上げるアクションです。
   */
  up = () => this.$counter.count++
  /**
   * カウンタを 1 だけドロップするアクションです。
   */
  down = () => this.$counter.count--
}

/**
 * カウンタ状態を使用する関数です。
 */
export const useCount = () => {
  const countInstance = new UseCount()
  return countInstance
}
```

