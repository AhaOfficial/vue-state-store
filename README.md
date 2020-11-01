# 🇺🇸 MAKE US GREAT AGAIN


VANILLA
```index.js
// * universal-state

// * 바닐라 자바스크립트에서의 사용방법
<script src="https://cdnjs.cloudflare.com/ajax/libs/universal-state/0.0.1/us-vanilla.min.js"></script>

// * 타입스크립트 상태 값 로드
us.load(`
  class Counter {
    count: number = 0
    handle: any = null

    up = () => this.count += 1
    down = () => this.count -= 1

    start = () => {
      this.handle = setInterval(()=> {
        this.count++
      }, 1000)
    }

    stop = () => {
      if(this.handle) clearInterval(this.handle)
    }

    double() {
      return this.count*2
    }
  }
`)

// * 저장소의 줄임말을 등록합니다.
var Counter = us.store.Counter

// * 카운팅을 시작합니다.
Counter.start()

// * 변경점을 구독합니다.
us.subscribe(
  // * 구독할 대상 지정
  [Counter.count],

  // * 변경점이 발생할 때
  function callback () {
    $('#count').text(Counter.count)
  }
)
```