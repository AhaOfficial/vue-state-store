<img src="https://i.imgur.com/R2wksCG.png" width="400"/>

<br/>

# 📮 vue-state-store

> 完全にTypescriptをサポートする簡単なstate management体系です。

📬 Vue専用に分散された状態管理モジュール体系です。 <u>[発行-購読(Pub & Sub)モデル基盤]</u>

<br/>

## 🌎 翻訳支援

 @yopinojiさん、ありがとうございます。😊😊

<br/>

## 😊 手軽に使用！ & 強力な応用！

「vue-state-store」は、従来の「vue」でよく使われた「vuex」モジュールを完全に代替するために開発されたモジュールです。 <u>**このモジュールはType scriptの効率を200%使用してstate managementをとても容易にすることを目標にしています。**</u>

<br/>

### 💡 vuexと比較したときの長所

- **低いランニングカーブ** - 簡単な発行&購読モデルを使用
- **Typescript Intellisense対応** - <u>ステータス</u> & <u>アクション</u> & <u>テンプレート内で変数を使用する場合</u>
- **自動バインディング関数** - 簡単なvue template Binding が可能
- **純粋タイプスクリプトクラス基盤定義** - mix-in使用不要
- **一元化 されたアクション構造** - ActionとMutationの区別なく柔軟に使用可能
- **柔軟な状態使用許可** - Mutationを省略するとGettersとして使用可能

<br/>

### 💬 設置方法

> (Vue2、Vue3、Nuxtに対応しており、Composition APIで自動バインディング関数「 」です。`.bind()`を支援します。)

```bash
npm i vue-state-store
```

<br/>

### 🔮 Devtools 適用

> 「vue-state-store」は「vue-devtools」をサポートします。 (「vuex」タブで「vue-state-store」を通じて生成された「ステータスリポジトリ」の情報を見ることができます。)

[関連する内容リンク](https://github.com/AhaOfficial/vue-state-store-devtools)

<br/>

### 📬 発行 & 購読モデルの説明

> vue-state-storeは、発行&購読デザインパターンを使用します。

`「vue-state-store」`は値を保存したメモリ上に存在するリポジトリです。 `.subscribe(callback)`関数を通じて、リポジトリ内の値が変更されたときにコールバックに変更された値を受け取ることができ、`.set(newValue)`と`.update((data) => data)`を通じて、リポジトリ内の値をアップデートすることができます。

<br/>

## 😎 基本的な使い方

>  ` 「vue-state-store」`は、関数またはクラスを通じて、<u>状態</u> & <u>アクション</u> & <u>ミューテーション</u> の両方を簡単に管理することができます。

<br/>

### 📮 基本タイプ発行&購読

> 基本タイプは5つの基本**タイプ**(number, string, boolean, null, undefined)を意味します。

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

> `.subscribe()`関数は実行されると返り値で関数を与えますが、この関数を実行させると好きなときにリポジトリ購読を中断させることができます。 それで名前を「unsubscribe」と一緒に書きます。

<br/>

### 📮 オブジェクトタイプ発行 & 購読

> 下を見ると、上と使い方の違いがほとんどないことが分かります。
>
>  `store(value)`からvalueは<u>基本タイプ</u>または<u>オブジェクト</u>になります。

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

### 📮 ステータスおよび内蔵アクション作成

> 「vue-state-store」はクラスを継承することで内蔵アクションを定義することができます。

`vue-state-store`ではActionとMutationの区別は必要ありません。

- クラスに任意の関数を生成することで、**<u>組み込まれたアクション（Embedded Action）</u>**の構成が可能となります。
- クラスに組み込まれないまま状態を変形するすべての関数は外部アクション(Outside Action)と名称します。

```typescript
import { Store } from 'vue-state-store'

// ステートのインターフェイスを事前に定義します。
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

// ステート ストアを作成し、初期値を追加します。
export const vote = new Vote({
    upVoteCount: 0,
    downVoteCount: 0,
})

// アクションと変換を使用する例を示します。
vote.upVote()
vote.downVote()
vote.syncWithNetwork()
```



<br/>

### 📮 Vueテンプレート内でのバインディング

> `vue-state-store`は、vue templateタグにリポジトリを簡単にバインディングでき、バインディングされたストアは、テンプレートタグ内でもTypescript Intellisenseがサポートされています。 また、scriptタグ内でリポジトリに組み込まれたアクションを使用するときにもTypescript Intellisenseがサポートされます。

-  `import`を通じて状態を持ってくるだけで内蔵されたアクションの呼び出しが可能です。
- `.bind()`関数を通じてリポジトリをテンプレート内に自動的にバインディングすることができます。
  - `return { $vote: vote.bind() }` のように既存のリポジトリ名の前に「$」を付けることをネーミング規則として推奨します。
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

## 🚀 高級な使い方を説明

> 高級な使用方法について説明します（<u>Learning Curveを高くしません</u>）。

<br/>

### ⏳ Async の使用方法

> `.update()`関数と`.set()`関数はPromise を返します。

<br/>

- await を通じてリポジトリ値を更新する際、その更新作業が完了した後、特定のロジックが実行されるようにすることができます。

```typescript
// Promise Update
await version.update((data) => {
    data += 1
    return data
})
await version.set({})
```

<br/>

- update 関数に送られるコールバックを async キーワードを付けて定義することもできます。

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

### 💡 vscodeインテリセンス適用方法

>  vscodeでvueとtypescriptを同時に使用する場合、intellisenseのサポートを受けるためには以下のモジュールを受ける必要があります。

[Vetur]: https://marketplace.visualstudio.com/items?itemName=octref.vetur

veturインストール後、テンプレート内のintellisenseに対応するためには以下のオプションをvscode設定に追加する必要があります。

```json
"vetur.experimental.templateInterpolationService": true
```

<br/>

### 📮 (高級) 状態使用関数デザインパターン

> `vue-state-store`は、Composition APIを極限に活用し、React Hooksと類似した「use~」で始まる状態使用関数のデザインパターンの例を提供します。

状態使用関数は、状態をコンポーネント内部で`useTodo`のように（Todoという状態があれば）前に`use`という単語が付く関数を実行し、その結果値で状態リポジトリを受け取るという使い方を意味します。

> このような過程で状態リポジトリでコンポーネントの生命周期を使用することができます。

`.set()`と`update()`を通じて状態を変形を進めていくと、従来の一般変数を修正するときとは異なり、複雑なロジックを作成するときはとても手間がかかることがあります。

「vue-state-store」は、ストア内でバインディングを内蔵して直接アクセスし、便利に状態を変更することができます。 このようなデザインのパターンは、コンポジションAPI を使用する際の状態使用関数を構成する単純例であり、必ずしも使用しなければならないわけではなく、`複雑に状態を変形する場合`や`computed オブジェクトを複数作る必要がある場合`に使用すればよいのです。

バインディングされた値を変更しても、値が変わるたびに購読しているコールバックに変わった点が自動的に配布されます。

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



> `computed` で包まれたコールバックからバインディングされたストア値を参照すると、そのストア値が変更されるたびにそのコールバックが再び発生します。 これは、毎関数が呼ばれるたびに演算する疲労度を減らし、状態使用時の性能を高めることができます。

<img src="https://i.imgur.com/NYRNad8.png" width="600"/>

```typescript
// ステータス使用関数を定義します。
export const useTodo = () => {

    // state 使用関数を定義します。
    const todo = new Todo({
        todoList: [
            'リスにピーナッツをあげなければなりません。',
            '猫にChuruをあげなければなりません。',
            'Vue例を作成する必要があります。',
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



> Vue のライフサイクルや `computed` を定義するには、必ず `useTodo` のように隔離された関数を一つ作ってから、この関数をコンポーネントの中から呼び出して使うことを定義する必要があります。

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



> 上記のようにuseTodo()を使用後、すぐにtemplateタグの中で使うことができます。 （勿論、この場合にもTypescript Intellisenseはサポートされます。）

<br/>

### 📮 (高級) 宣言-定義-注入-使用デザインパターン

> 該当デザインパターンは、別途のページでご確認ください。

[説明リンク](https://github.com/AhaOfficial/vue-state-store/blob/master/docs/0.advanced/README.JP.md)

<br/>

## 🤔 Q&A

> Github Issues 欄での質問も可能です。

  <br/>

### 🧲 Q. vuexのように全ての状態のリポジトリを持っている$storeはないのですか？

>  A. はい、ありません。 非推奨パターンです。

任意の index.ts ファイルを作成した後、`import { vote } from '~/store` のように一部のストアだけを持ってきて使用することをお勧めします。 `vue-state-store`は分散した構造を持ち、各リポジトリが必要な場合に限って個別に参照することができます。

 `.bind()` 함수를 통해서 vue 템플릿 태그 내에서 사용되기 전까지 `vue-state-store` 는 `vue` 와 완전히 독립된 상태로 구성됩니다.

<br/>

### 👀 Q. `.bind()`になった値が変更されると、変更された値が再びレンダリングされますか？

> A. はい、vueのrefによって変更されたリポジトリの値がリアルタイムでテンプレートタグを通じてDOMに反映されます。

<br/>

### 📡 Q. `.bind()`になった値は双方向バインディングですか？

> A. はい、バインディング値は、リポジトリ値が変更されれば、バインディング値も変化するだけでなく、バインディング値が変化すれば、リポジトリ値も変更されます。

<br/>

<br/>

## 📔 ライセンス

> Copyright (c) 2020 AhaOfficial

**MIT Licensed**

