
import {
    store, // * Functional
    Store, // * Class
    IStore, // * Typescript Inteface
} from './'


// ? Primitive State
const version = store(0)

// * Get
version.get() // 0

// * Set
version.set(1)

// * Update
version.update((data) => {
    data += 1
    return data
})

// * Subscribe
version.subscribe((data) => {
    console.log('Changed data', data)
})

// * Unsubscribable
const unsubscribe1 =
    version.subscribe((data) => {
        console.log('Changed data', data)
    })
unsubscribe1()



// ? Object State
const detail = store({
    version: 0,
    author: 'AhaOfficial'
})

// * Get
detail.get() // 0

// * Set
detail.set({
    version: 1,
    author: 'AhaOfficial'
})

// * Update
detail.update((data) => {
    data.version += 1
    return data
})

// * Subscribe
detail.subscribe((data) => {
    console.log('Changed data', data)
})

// * Unsubscribable
const unsubscribe2 =
    version.subscribe((data) => {
        console.log('Changed data', data)
    })
unsubscribe2()



// ? Action with State
interface IVoteData {
    upVoteCount: number,
    downVoteCount: number,
}

class Vote extends Store<IVoteData> {
    upVote() {
        this.update((data) => {
            data.upVoteCount++
            return data
        })
    }
    downVote() {
        this.update((data) => {
            data.downVoteCount++
            return data
        })
    }
    syncWithNetwork() {
        // window.axios.update() blablabla
    }
}

const vote = new Vote({
    upVoteCount: 0,
    downVoteCount: 0
})

// * Actions
vote.upVote()
vote.downVote()
vote.syncWithNetwork()