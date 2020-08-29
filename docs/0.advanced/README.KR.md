<img src="https://i.imgur.com/R2wksCG.png" width="400"/>



# 📮 vue-state-store

> 완전히 타입스크립트를 지원하는 간단한 상태관리 체계

📬 뷰 전용 분산된 상태관리 모듈 체계 <u>[발행-구독(Pub & Sub) 모델 기반]</u>

<br/>

## ⚗️ 권장 디자인 패턴

> `vue-state-store` 를 통한 상태 저장소 개발 시 권장되는 디자인 패턴을 설명합니다.

컴포넌트 정의 시  아래와 같은 방식을 통해서 구현하는 것을 권장합니다.

선언(declare) → 정의(define) → 주입(inject) → 사용(use)

<br/>

### 📐 선언 (declare)

> 선언 (declare) 과정은 실제로 상태 저장소에 담길 자료형을 미리 타입스크립트 인터페이스로 정의하는 과정을 의미합니다. 다른 파일에서 참조 될 수 있도록 모든 요소를 `export` 합니다.

<br/>

<img src="https://tva1.sinaimg.cn/large/007S8ZIlgy1gi6h5ggmecj30de0omh8s.jpg" width="400"/>

<br/>

### 📦 정의 (define)

> 정의 (define) 과정은 상태 저장소가 어떠한 타입스크립트 타입인 값을 담을지, 초기에 어떠한 값을 담을 정의하는 과정입니다. 다른 파일에서 참조 될 수 있도록 모든 요소를 `export` 합니다.

<br/>

<img src="https://tva1.sinaimg.cn/large/007S8ZIlgy1gi6h6nt30bj30ec0natw2.jpg" width="400"/>

<br/>

### 💉 주입 (inject)

> 주입 (inject) 과정은 컴포넌트 내에서만 존재할 수 있는 로직들로로, 나중에 컴포넌트 안으로 주입되기 위한 로직들을 정의하는 과정입니다. 클래스로 구성하는 이유는, 컴포넌트 로직의 재사용성을 높이기 위해서 입니다. (Vue 의 Mix-in 패턴을 타입스크립트 적으로 해결하면서도 복잡도를 낮추기 위한 방법입니다.) 다른 파일에서 참조 될 수 있도록 모든 요소를 `export` 합니다.

<br/>

<img src="https://tva1.sinaimg.cn/large/007S8ZIlgy1gi6helbtbyj30ds0mmnhe.jpg" width="400"/>

<br/>

### 💊 사용 (use)

> 사용 (use) 과정은 컴포넌트 내에서 실제로 이 상태 저장소를 사용하려 할 때 호출만 하면 해당 저장소와 그와 관련된 컴포넌트 로직들을 주입해주어서 저장소와 관련 컴포넌트 로직들을 바로 사용 할 수 있게 해주는 함수를 정의하는 과정입니다. 다른 파일에서 참조 될 수 있도록 모든 요소를 `export` 합니다.

<br/>

<img src="https://tva1.sinaimg.cn/large/007S8ZIlgy1gi6hjtftdkj30p40k61kx.jpg" width="600"/>

<br/>

## 🍱 분리 규칙

> 기본적으로는 `선언(declare)` → `정의(define)` →  `주입(inject)` → `사용(use)` 과정을 각각 영어명으로 일치하는 단일 파일 형태로 구현합니다. 하지만 특정 과정이 매우 코드가 길어지는 경우 해당 과정 명을 폴더로 정의해주신 후 `index.ts` 파일을 통해서 참조되도록 코드를 하나의 파일에서 유연하게 분리해주시기 바랍니다.

<br/>

<img src="https://tva1.sinaimg.cn/large/007S8ZIlgy1gi6hntmsf9j30fc0k279j.jpg" width="200"/>

<br/>

<img src="https://tva1.sinaimg.cn/large/007S8ZIlgy1gi6hoktamdj30j807uq5z.jpg" width="400"/>



## 🤔 단일 파일 예시

> 만약 상태 저장소와 그와 관련된 로직이 간단한 경우나, 일단 빠른 작성이 필요한 경우 아래와 같이 한 파일에 모든 로직을  담을 수 있습니다. 다만 4단계 과정을 최대한 꼭 명시 해주세요.

<br/>

<img src="https://tva1.sinaimg.cn/large/007S8ZIlgy1gi6i1ubk1aj30bs0rpjwi.jpg" width="500"/>

