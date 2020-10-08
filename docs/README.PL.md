<img src="https://i.imgur.com/R2wksCG.png" width="400"/>

# 📮 vue-state-store (vss)

> Prosty system zarządzania stanem aplikacji, w pełni wspierający typescript

📬 Rozproszony system zarządzania stanem dla Vue. <u>[Pub & Sub model based]</u>

<br/>

## 🌎 Wsparcie w tłumaczeniach

Dziękuję! @Milesq 😊😊

<br/>

## 📔 Spis treści

-   [😊 Łatwy w użyciu! & Niesamowite możliwości!](#-łatwy-w-użyciu--niesamowite-możliwości)
    -   [💡 Plusy w porównaniu do vuex](#-plusy-w-porównaniu-do-vuex)
    -   [💬 Instalacja](#-instalacja)
    -   [📬 Opis Wzorca Pub & Sub](#-opis-wzorca-pub--sub)
-   [😎 Podstawy](#-podstawy)
    -   [📮 Primitive Type Pub & Sub](#-primitive-type-pub--sub)
    -   [📮 Object Type Pub & Sub](#-object-type-pub--sub)
    -   [📮 Akcje wewnętrzę i store'a jako klasa](#-akcje-wewnętrzę-i-storea-jako-klasa)
    -   [📮 Używanie wraz z Vue component template](#-używanie-wraz-z-vue-component-template)
-   [🚀 Używanie zaawansowane](#-używanie-zaawansowane)
    -   [⏳ Asynchroniczność](#-asynchroniczność)
    -   [💡 Vscode Intellisense](#-vscode-intellisense)
    -   [📮 (Zaawansowane) Wzorzec Funkcja Używająca Stan (and. State Use Function)](#-zaawansowane-wzorzec-funkcja-używająca-stan-and-state-use-function)
-   [🤔 Q&A](#-qa)
    -   [🧲 Q. Czy istnieje globalna zmienna `$store` która zawiera wszystkie pomniejszy store'y jak w vuex?](#-q-czy-istnieje-globalna-zmienna-store-która-zawiera-wszystkie-pomniejszy-storey-jak-w-vuex)
    -   [👀 Q. Czy jeśli wartość `.bind()` zostanie zmieniona, komponent zostanie przerenderowany?](#-q-czy-istnieje-globalna-zmienna-store-która-zawiera-wszystkie-pomniejszy-storey-jak-w-vuex)
    -   [📡 Q. Czy metoda `.bind()` utrzymuje powiązanie dwu-kierunkowe? (ang. two-way binding)](#-q-czy-metoda-bind-utrzymuje-powiązanie-dwu-kierunkowe-ang-two-way-binding)
-   [📔 Licencja](#-license)

<br/>

## 😊 Łatwy w użyciu! & Niesamowite możliwości!

`vue-state-store (vss)` to paczka która ma całkowicie zastąpić moduły (ang. modules) `vuex` które były często używane wraz z `vue`. <u>**Celem tej paczki jest sprawienie, żeby zarządzanie stanem było jak najprostsze, wykorzystując 200% możliwości typescript'a.**</u>

<br/>

### 💡 Plusy w porównaniu do vuex

-   **Szybki start, mało kodu boilerplate** - Use simple publishing & subscription model
-   **Podpowiedzi typów w TypeScript** - Status & Actions & Mutation & When using variables within Templates
-   **Auto-Bind function** - Easy vue template binding.
-   **Pure typescript class based definition** - no need to use mix-in
-   **A unified action structure** - Flexible use with no distinction between action and motion.
-   **Allow flexible state use** - If you omit Mutation, you can use it as Getters.

<br/>

### 💬 Instalacja

> (Zarówno Vue2, Vue3 jak i Nuxt są wspierane. Wspierane jest automatyczne bindowanie funkcji w Composition API : .bind(')'.)

```
npm i vue-state-store
yarn add vue-state-store
```

<br/>

### 📬 Opis Wzorca Pub & Sub

> `vue-state-store` używa wzorca projektowego publish & subscription

`vue-state-store` to pewna przestrzeń wewnątrz pamięci w której przechowywane są dane. Metoda `.subscribe(callback)` pozwala na wychwytywanie zmian stanu poprzez funkcję callback. Możesz też zmienić stan store'a poprzez metody `.set(nowaWartość)` i `.update(staraWartość => nowaWartość)`

<br/>

## 😎 Podstawy

> `vue-state-store` to łatwy sposób na obsługę <u>stanów (ang. atate)</u>, <u>akcji</u> i <u>mutacji</u> poprzez funckcje lub klasy

<br/>

### 📮 Primitive Type Pub & Sub

> Typy podstawowe (ang. primitives) oznaczają pięć podstawowych typów danych (liczba (number), napis (string), typ logiczny tak/nie (boolean), null, undefined).

```typescript
import { store } from 'vue-state-store'

// Tworzenie obiektu aby przechowywać stan
const version = store(0) // Jako pierwszy argument przekaż wartość początkową

version.get() // zwróci 0, czyli wartość początkową.

version.set(1) // Ustawia stan na podaną wartość, czyli w tym przypadku 1.

version.update((data) => {
    // jako argument callback'a otrzymujesz wartość stanu
    // zinkrementuj wartość i zwróć ją
    data += 1
    return data
})

version.subscribe((data) => {
    console.log('Następujące wartości zostały zmienione: ', data)
})

const unsubscribe = version.subscribe((data) => {
    console.log('Następujące wartości zostały zmienione:', data)
})
// Możesz przerwać subkskrybowanie stanu w dowolnym momencie
// poprzez wywołanie funkcji `unsubscribe()`
unsubscribe()
```

> Funkcja `.subscribe()` zwraca funkcję która przerywa subskrybcję

<br/>

### 📮 Object Type Pub & Sub

> Jeśli zerkniesz niżej, możesz zobaczyć, że istnieją pewne rónice między przykładami wyżej
>
> `store` może przyjmować prymitywy lub obiekty.

```typescript
import { store } from 'vue-state-store'

// Stwórz obiekt do przechowywania stanu.
const detail = store({
    version: 0,
    author: 'AhaOfficial',
}) // I jako argument podaj obiekt początkowy

detail.get() // Zwraca obiekt

detail.set({
    version: 1,
    author: 'AhaOfficial',
}) // Ustaw nową wartość stanu

detail.update((data) => {
    // zinkrementuj wartość i zwróć ją
    data.version += 1
    return data
})

detail.subscribe((data) => {
    console.log('Następujące wartości zostały zmienione:', data)
})

const unsubscribe = detail.subscribe((data) => {
    console.log('Następujące wartości zostały zmienione:', data)
})
// Podobnie jak wcześniej możesz przerwać subkskrybowanie
// poprzez wywołanie funkcji `unsubscribe()` w dowolnym momencie
unsubscribe()
```

<br/>

### 📮 Akcje wewnętrzę i store'a jako klasa

> w `vue-state-store` możesz stworzyć nową klasę store'a poprzez dziedziczenie z klasy Store.

`vue-state-store`, nie wymaga rozróżnienia między akcjami i mutacjami

-   Poprzez stworzenie funkcji wewnątrz klasy, tworzysz **<u>Wewnętrzne (ang. Embedded) akcje</u>**.
-   Każda funkcja która zmienia stan niebędąca wewnętrzną (ang. Embedded) akcją, jest nazywana <u>**Akcją Zewnętrzną (ang. outside)**</u>.

```typescript
import { Store } from 'vue-state-store'

// Określanie interface'u dla stanu
export interface IVote {
    upVoteCount: number
    downVoteCount: number
}

// Następnie tworzymy klasę stanu która dziedziczy z klasy `Store`
export class Vote extends Store<IVote> {
    // Teraz możemy zdefiniować wewnętrzne akcje
    // jako metody używające metod .update i .set
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
        // Inne metody również będą
        // dostępne z poziomu instancji.
    }
}

// tworzenie store'a z wartością początkową
export const vote = new Vote({
    upVoteCount: 0,
    downVoteCount: 0,
})

// Przykłady wykorzystywania akcji/mutacji:
vote.upVote()
vote.downVote()
vote.syncWithNetwork()
```

<br/>

### 📮 Używanie wraz z Vue component template

> `vue-state-store` może być w łatwy sposób wykorzystywane wewnątrz tagu template we vue, nadal zachowując wszystkie informacje o typach. Informacje o typach TypeScript są też obsługiwane kiedy używasz _akcji wewnętrznych_ wewnątrz tagu `<script>`

-   Akcje wewnętrzne mogą być łatwo używane poprzez obiekt zaimportowany stanu
-   Metoda `.bind()` utrzymuje reaktywne powiązanie między stanem, a szablonem komponentu
    -   Zalecane jest poprzedzanie nazwy stanu (wewnątrz komponentu) znakiem dolara ('\$') w taki sposób: `{ return $vote: vote.bind() }`
    -   Metoda `.bind()` powinna być używana wraz z <u>**@vue/composition-api**</u>, wewnątrz metody `setup` lub skryptu setup w Vue3

```vue
<template>
    <div>
        <!--
            Informacje o typach są w pełni dostępne w tym miejscu
        -->
        <h1>upVoteCount: {{ $vote.upVoteCount }}</h1>
        <h1>downVoteCount: {{ $vote.downVoteCount }}</h1>
    </div>
</template>

<script lang="ts">
import * as VueAPI from '@vue/composition-api'

// Importujemy instancję store'a
import { vote } from '~/store'

export default VueAPI.defineComponent({
    setup(props, context) {
        // I co każdą sekundę wywołujemy mutację `upVote`
        // (Szblon zmieni się co sekundę)
        setInterval(() => vote.upVote(), 1000)

        // Stwarzamy reaktywne powiązanie pomiędzy zawartością store'a a vue
        return {
            $vote: vote.bind(),
        }
    },
})
</script>
```

<br/>

## 🚀 Używanie zaawansowane

> Objaśnienie nieco bardziej zaawansowanych sposobów używania. (Krzywa uczenia pozostaje taka sama :)

<br/>

### ⏳ Asynchroniczność

> Metody `.update()` i `.set()` zwracają obietnice

<br/>

-   `await` umożliwia zatrzymanie bieżącej funkcji do zakończeniu zadania aktualizacji wartości store'a.

```typescript
// Promise Update
await version.update((data) => {
    data += 1
    return data
})
await version.set({})
```

-   Callback przekazywany do metody `.update()` może zwracać konkretną wartość, ale również obietnicę

```typescript
// Promise Update
await detail.update(async (data) => {
    const response = await fetch('https://~~~')
    data = response.data
    return data
})
```

<br/>

### 💡 Vscode Intellisense

> To use both **vscode** and **typescript** at the same time and need some Intellisense support, you can obtain the module below.
> Żeby **typescript'u** w raz z **vscode'em** trzeba odpowiednio przygotować VsCode. Najpierw (jeśli jeszcze tego nie zrobiłeś ;) zainstaluj poniższe rozszerzenie

[vetur]: https://marketplace.visualstudio.com/items?itemName=octref.vetur

In order to receive support for intellisense in the template after installing vetur, the following option should be added to the vscode setting.

Żeby włączyć wsparcie Intellisense dla typów TypeScript dodaj następującą linię do opcji VsCode (Ctrl+,)

```json
"vetur.experimental.templateInterpolationService": true
```

<br/>

### 📮 (Zaawansowane) Wzorzec Funkcja Używająca Stan (and. State Use Function)

> `vue-state-store` przykłady użycia wzorca funkcji używającej stan. Taka funkcja zaczyna się od "use~" jest to podobne do hooków React'a i umożliwia pełne wykorzystanie możliwości Composition API we Vue3.

Funkcja Używająca Stan oznacza funkcję poprzedzoną słowem `use`, zwracającą stan

> Ten wzorzec pozwala ci m.in. na używanie metod cyklu życia komponentu (ang. life cycle) w metodach store'a.

Jeśli używasz metod dostępu(`.set()` i `.update()`) żeby modyfikować stan, tworzenie złożonej logiki może być bardzo kłopotliwe, w przeciwieństwie do modyfikowania istniejących zmiennych.

`vue-state-store` pozwala na łatwą modyfikację stanu bezpośrednio przez zbindowany obiekt, nie ma potrzeby używać dodatkowych funkcji

`vue-state-store` allows for convenient change of state by directly accessing bindings within the store without the use of such an accessor. Ten wzorzec projektowy to tylko prosty przykład konfigurowania funkcji użycia statusu podczas korzystania z interfejsu Composition API (wzorca można używać bez Composition API), **Jeśli musisz modyfikować stan w bardziej złożony sposób**, lub **If you need to create multiple `compute` objects**.

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
        return this.value.todoList.filter((item) => {
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
                this.value.todoList = JSON.parse(
                    window.localStorage.getItem('todo_list')
                )
            }
        } catch (e) {}
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
        ],
    })

    // Load the state values that
    // were previously stored on local storage.
    todo.getTodos()

    // Store values on local storage
    // when the todolist changes.
    todo.subscribe((data) => {
        try {
            window.localStorage.setItem(
                'todo_list',
                JSON.stringify(data.todoList)
            )
        } catch (e) {}
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
            todo: useTodo(),
        }
    },
})
```

> As shown above, you can use it within the template tag immediately after using useToto(). (Of course Typescript Intellisense is still supported.)

<br/>

<br/>

## 🤔 Q&A

> Pytania możesz zadawać w github issues

  <br/>

### 🧲 Q. Czy istnieje globalna zmienna `$store` która zawiera wszystkie pomniejszy store'y jak w vuex?

> A. Nie, nie ma. Nie jest to rekomendowana praktyka

Zaleca się importowanie i używanie tylko kilku store'ów w każdym pliku

np. `import { vote } from '@/store`

`vue-state-store` ma <u>rozproszoną strukturę</u> i do każdego store'a może się odnosić tylko bezpośrednio.

`vue-state-store` jest całkowicie niezależny od `vue` dopóki nie zostanie użyty wewnątrz vue template poprzez metodę `.bind()`

<br/>

### 👀 Q. Czy jeśli wartość `.bind()` zostanie zmieniona, komponent zostanie przerenderowany?

> A. Taj, zmiany stanu są natychmiastowo odzwierciedlenie wartości w DOM

<br/>

### 📡 Q. Czy metoda `.bind()` utrzymuje powiązanie dwu-kierunkowe? (ang. two-way binding)

> A. Tak, wartość zbindowana (powiązana) ze store'em zmieni się w momencie zmiany wartości w store'rze i odwrotnie

<br/>

<br/>

## 📔 Licencja

> Copyright (c) 2020 AhaOfficial

**Licencja MIT**
