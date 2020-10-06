<img src="https://i.imgur.com/R2wksCG.png" width="400"/>

<br/>

# 📮 vue-state-store

> 完全に Typescript をサポートし簡単に使うことができる状態管理ライブラリです。

📬 Vue 向けに作成された分散型の状態管理ライブラリです。 <u>[出版-購読型モデル(Pub & Sub)による]</u>

<br/>

## 🌎 翻訳支援

 @yopinojiさん、ありがとうございます。😊😊

<br/>

## 😊 使いやすく強力な状態管理ライブラリ

`vue-state-store` は、従来の Vue でよく使われた Vuex モジュールを完全に代替するために開発されたモジュールです。 <u>**このモジュールは Type Script の効率を 200% 使用して、状態管理（state management）をとても容易にすることを目標にしています。**</u>

<br/>

### 💡 vuex と比較したときの長所

- **低い学習コスト** - 簡単に使える出版-購読型モデル(Pub & Sub)を使用
- **Typescript Intellisense 対応** - <u>ストア</u>、<u>アクション</u>、<u>ミューテーション</u>などを参照する際にエディタによる補完が有効
- **自動バインディング関数** - 簡単に Vue テンプレートにバインディング可能
- **純粋な TypeScript によるクラス定義** - mix-in を使う必要はありません
- **一元化されたアクション構造** - アクションとミューテーションを区別することなく柔軟に使用可能
- **柔軟な状態の使用が可能** - ミューテーションを省きゲッターとしても使用可能

<br/>

### 💬 インストール方法

> (Vue2、Vue3、Nuxt に対応しており、Composition API のバインディング関数。`.bind()`に対応しています。)

```bash
npm i vue-state-store
```

<br/>

### 🔮 Devtools 適用

> `vue-state-store` は `vue-devtools` をサポートします。 (`vuex` タブで `vue-state-store` を通じて生成された状態を見ることができます。)

[関連するリンク](https://github.com/AhaOfficial/vue-state-store-devtools)

<br/>

### 📬 出版-購読型モデルの説明

> `vue-state-store` は、出版-購読型モデルによるデザインパターンを使用します。

`vue-state-store` は値を格納するメモリ内に存在するストレージです。`.subscribe(callback)` 関数を通じて、ストレージ内の値が変更されたときにコールバックに変更された値を受け取ることができ、`.set(newValue)`と`.update((data) => data)`を通じて、ストレージ内の値をアップデートすることができます。

<br/>

## 😎 基本的な使い方

>  `vue-state-store`は、関数またはクラスを通じて、<u>ストア</u>・<u>アクション</u>・<u>ミューテーション</u> の両方を簡単に管理することができます。

<br/>

### 📮 基本的な型での出版-購読モデルの構築

> 基本型として 5 つの基本**型（Types）**(number, string, boolean, null, undefined)があります。

```typescript
import { store } from 'vue-state-store'

// ステータスを保存するオブジェクトを作成します。
const version = store(0) // 初期値を挿入します。

// Get
version.get() // 0 が返されます。

// Set
version.set(1) // 状態を 1 に更新します。

// Update
version.update((data) => { // 既存の状態値に 1 を追加します。
    data += 1
    return data
})

// Subscribe
version.subscribe((data)=> {
    console.log('次の値が変更されました。: ', data)
})

// Unsubscribable
const unsubscribe =
    version.subscribe((data) => {
        console.log('次の値が変更されました。:', data)
    })
// 次の機能を呼び出すと、いつでもストレージの
// サブスクリプションを中断することができます。
unsubscribe()
```

<br/>

> `.subscribe()` 関数は実行されると返り値として関数を与えますが、この関数を実行させると好きなときに状態のサブスクリプションを中断させることができます。 そのため返り値として受け取った変数を「unsubscribe」と命名しています。

<br/>

### 📮 オブジェクトでの出版-購読モデルの構築

> 下を見ると、上（基本的な型）と使い方の違いがほとんどないことが分かります。
>
>  `store(value)`へのvalueは<u>基本的な型</u>または<u>オブジェクト</u>になります。

```typescript
import { store } from 'vue-state-store'

// 状態を保存するオブジェクトを作成します。
const detail = store({
  version: 0,
  author: 'AhaOfficial'
}) // 初期値を挿入します。

// Get
detail.get() // オブジェクトを返します。

// Set
detail.set({
  version: 1,
  author: 'AhaOfficial'
}) // 状態をその値に更新します。

// Update
detail.update((data) => { // 既存の状態値に 1 を追加します。
    data.version += 1
    return data
})

// Subscribe
detail.subscribe((data)=> {
    console.log('次の値が変更されました。:', data)
})

// Unsubscribable
const unsubscribe =
    detail.subscribe((data) => {
        console.log('次の値が変更されました。:', data)
    })
// 次の機能を呼び出すと、いつでもストレージの
// サブスクリプションを中断することができます。
unsubscribe()
```



<br/>

### 📮 ステータスおよび組み込みアクション作成

> 「vue-state-store」はクラスを継承することで組み込みアクションを定義することができます。

`vue-state-store`ではアクションとミューテーションの区別は必要ありません。

- クラスに任意の関数を生成することで、**<u>組み込みアクション（Embedded Action）</u>**の構成が可能となります。
- クラスに組み込まずに状態を変化させるすべての関数は外部アクション(Outside Action)と名称します。

```typescript
import { Store } from 'vue-state-store'

// ストアのインターフェイスを事前に定義します。
export interface IVote {
    upVoteCount: number
    downVoteCount: number
}

// ストアを継承してクラスを作成します。
export class Vote extends Store<IVote> {

    // Action または Mutation は、.update および 
    // .set を使用して、スクリプト クラスの関数として自由に定義できます。
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
        // API通信機能も自由にご利用いただけます。
    }
}

// ストアを作成し、初期値を追加します。
export const vote = new Vote({
    upVoteCount: 0,
    downVoteCount: 0,
})

// アクションによる状態の更新を使用する例を示します。
vote.upVote()
vote.downVote()
vote.syncWithNetwork()
```



<br/>

### 📮 Vueテンプレート内でのバインディング

> `vue-state-store` は、保持している状態を vue テンプレートタグに簡単にバインドすることができ、バインドされた状態はテンプレートタグ内で Typescript Intellisense によるサポートを受けられます。Typescript Intellisense は、script タグ内のストアに埋め込まれたアクションを使用する場合にもサポートされます。

-  `import`を通じてストアを持ってくるだけで内蔵されたアクションの呼び出しが可能です。
- `.bind()`関数を通じて状態をテンプレート内に自動的にバインディングすることができます。
  - `return { $vote: vote.bind() }` のように既存のストレージ名の前に「$」を付けることをネーミング規則として推奨します。
  - `.bind()`関数は**<u>@vue/composition-api</u>** の`setup`関数内で使用することが推奨されます。

```typescript
<template>
    <div>
        <!--
        テンプレートタグのストアを使用する場合は、TypeScript
        IntelliSense が引き続きサポートされます。
        -->
        <h1>upVoteCount: {{ $vote.upVoteCount }}</h1>
        <h1>downVoteCount: {{ $vote.downVoteCount }}</h1>
    </div>
</template>

<script lang="ts">
    import * as VueAPI from '@vue/composition-api'

    // ストアインスタンスをインポートします。
    import { vote } from '~/store'

    export default VueAPI.defineComponent({
        setup(props, context) {

            // 毎秒「upVote」を実行します。
            // (値がテンプレートに毎秒反映されることがわかります。)
            setInterval(() => vote.upVote(), 1000)

            // ストア値をテンプレートタグに自動的にバインドします。
            return {
                $vote: vote.bind()
            }
        },
    })
</script>
```

<br/>

## 🚀 応用した使い方を説明

> 応用した使用方法について説明します（<u>学習コストはあまり上がりません</u>）。

<br/>

### ⏳ Async の使用方法

> `.update()` 関数と `.set()` 関数は Promise を返します。

<br/>

- await を通じてストレージの値を更新する際、その更新作業が完了した後、特定のロジックが実行されるようにすることができます。

```typescript
// Promise Update
await version.update((data) => {
    data += 1
    return data
})
await version.set({})
```

<br/>

- update 関数で使われるコールバック関数に async キーワードを付けて定義することもできます。

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

### 💡 Vscode インテリセンス適用方法

>  Vscode で vue と Typescript を同時に使用する場合、intellisense のサポートを受けるためには以下のモジュールを受ける必要があります。

[Vetur]: https://marketplace.visualstudio.com/items?itemName=octref.vetur

Vetur インストール後、テンプレート内の intellisense に対応するためには以下のオプションを Vscode の設定に追加する必要があります。

```json
"vetur.experimental.templateInterpolationService": true
```

<br/>

### 📮 (応用編) 状態管理関数デザインパターン

> `vue-state-store` は、Composition API を極限に活用し、React Hooks と類似した「use~」で始まる状態管理関数のデザインパターンの例を提供します。

状態管理関数は、状態をコンポーネント内部で `useTodo` のように（Todoという状態があれば）前に `use` という単語が付く関数を実行し、その結果返ってきた値で状態を受け取るという使い方を意味します。

> これにより、状態管理にコンポーネントのライフサイクルを使用することができます。

アクセサ(`.set()や.update()`)を使って状態を変更する場合、既存の一般変数を変更する場合とは異なり、複雑なロジックを作成するのが非常に面倒になります。

`vue-state-store` を使うと、このようなアクセサを使わなくても、ストア内のバインディングに直接アクセスすることで、便利に状態を変更することができます。この設計パターンは、コンポジションAPIを使用する際に状態利用機能を設定する際の単純な例に過ぎません(必ずしもそうではありません)、**複雑な方法で状態を変更する必要がある場合**や、**複数の`computed`オブジェクトを作成する必要がある場合**などが考えられます。

バインドされた値を変更した場合でも、値が変更されるたびに、その変更は自動的に購読しているコールバック関数により更新されます。

```typescript
import { Store } from 'vue-state-store'
import * as VueAPI from '@vue/composition-api'

// ステータス値の規格を定義します。
export interface ITodo {
    todoList: string[]
}

// ステータスクラスを定義します。
export class Todo extends Store<ITodo> {

    // 状態値をストア クラス内でバインドします。
    value = this.bind()

    // 計算された値を定義します。
    pending = VueAPI.computed(() => {
        return this.value.todoList.filter(item => {
            return item.indexOf('(DONE)') == -1
        })
    })

 	  // Todo を追加します。
    addItem(newTodo) {
        this.value.todoList.unshift(newTodo)
    }
  
    // Todo を消します。
    deleteItem(item: string) {
        this.value.todoList.splice(this.value.todoList.indexOf(item), 1)
    }

    // ローカル ストレージに保存されているスケジュールを読み込みます。
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



> コールバック関数でバインドされたストアの値を `computed` でラップしたコールバック関数で参照すると、ストアの値が変わるたびにコールバック関数が再実行されます。これにより、関数が呼び出されるたびに各関数を再計算する疲労が軽減され、ストアを使用する際のパフォーマンスが向上します。

```typescript
// 状態管理関数を定義します。
export const useTodo = () => {

    // state 使用関数を定義します。
    const todo = new Todo({
        todoList: [
            'リスにピーナッツをあげる',
            '猫にチュールをあげる',
            'Vueによる例を作成する必要がある',
        ]
    })

    // 以前にローカル ストレージに
    // 保存されていた状態値をロードします。
    todo.getTodos()

    // ToDo リストが変更されたときに、
    // 値をローカル ストレージに保存します。
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



> Vue のライフサイクルや `computed` を定義するには、必ず `useTodo` のように隔離された関数を一つ作ってから、この関数をコンポーネントの中から呼び出して使う必要があります。

```typescript
import * as VueAPI from '@vue/composition-api'
import { useTodo } from '~/store'

export default VueAPI.defineComponent({
    setup(props, context) {
        return {
            // Todo状態をこのコンポーネントで使用します。
            todo: useTodo()
        }
    }
})
```



> 上記のように `useTodo()` を使用後、すぐに template タグの中で使うこともできます。 （勿論、この場合にも Typescript Intellisense はサポートされます。）

<br/>

### 📮 (応用編) 宣言-定義-注入-使用デザインパターン

> 該当デザインパターンは、別途のページでご確認ください。

[説明リンク](https://github.com/AhaOfficial/vue-state-store/blob/master/docs/0.advanced/README.JP.md)

<br/>

## 🤔 Q&A

> Github Issues 欄での質問も可能です。

  <br/>

### 🧲 Q. vuexのように全てのストレージの状態を持っている$storeはないのですか？

>  A. はい、ありません。 非推奨パターンです。

任意の index.ts ファイルを作成した後、`import { vote } from '~/store` のように一部のストアだけを持ってきて使用することをお勧めします。 `vue-state-store` は分散した構造を持ち、各ストレージが必要な場合に限って個別に参照することができます。

`.bind（）`関数を介してvueテンプレートタグ内で使用されるまで `vue-state-store` は `vue` と完全に独立した状態で構成されます。

<br/>

### 👀 Q. `.bind()`した値が変更されると、変更された値は再びレンダリングされますか？

> A. はい、Vue の ref によって変更されたリポジトリの値がリアルタイムでテンプレートタグを通じて DOM に反映されます。

<br/>

### 📡 Q. `.bind()` した値は双方向バインディングですか？

> A. はい、双方向バインディングです。格納されている値が変更されればバインディングされている値も変化しますし、バインディングされている値が変化すれば格納されている値も変更されます。

<br/>

<br/>

## 📔 ライセンス

> Copyright (c) 2020 AhaOfficial

**MIT Licensed**

