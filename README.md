# Next JS 튜토리얼

본 문서는 노마드코더의 Next 무료 강의인 [NextJS 시작하기](https://nomadcoders.co/nextjs-fundamentals)를 기반으로 작성되었다.

## Contents - Framework Overview

### Library vs Framework

> React - Library
> NEXT.js - Framework

React는 라이브러리로 메서드를 호출하여 사용자가 제어할 수 있지만 NEXT.js는 프레임워크로 프레임워크가 사용자를 호출한다. 따라서 NEXT.js는 React처럼 `ReactDOM.render()`와 같은 리엑트 라이브러리를 불러서 렌더링을 해줄 필요가 없다. 프레임워크이기 때문에 프레임워크의 규칙만 따른다면 알아서 렌더링이 된다.

### Pages

Next.js는 매우 편리하게도 pages 폴더 안의 파일명에 따라 route가 결정이 된다. 파일명이 곧 하나의 route이라고 보면된다. 파일안의 함수 명은 자유롭게 작성하여도 되지만, 파일명이 하나의 route이기 때문에 파일명은 경로의 이름을 따라야 한다.

### Static Pre Rendering

리엑트는 기본적으로 Client-Side-Rendering(CSR) 방식이다. 브라우저는 리엑트 파일을 요청을 하게 되고, 리엑 트파일에서 받은 내용을 토대로 HTML을 그리기 때문에 인터넷 통신이 매우 느린 곳에서는 자바스크립트 로딩이 끝날 때 까지 흰 화면만 보이게 된다. 또한 HTML에는 아무런 내용이 없기 때문에 SEO에 취약하다는 단점이 있다.

반면 Next.js는 CSR과 SSR(Server-Side-Rendering) 방식을 동시에 사용할 수 있다. 기본적으로 Next.js는 SSR 방식을 통해 HTML을 모두 생성한 후에 자바스크립트 로딩이되면 그 즉시 리엑트로 권한을 넘기게 되면서 동작하게 된다. API 콜을 받아야 하는 데이터를 제외한 모든 요소들이 초기에 HTML로 작성이 되어있기 때문에 로딩이 매우 빠르며, 유저들이 빈 화면을 볼 일이 없다. 추가로 SEO에도 강점을 가지고 있다.

### Routing

NEXT.js 에서도 React와 마찬가지로 `a href` 의 anchor 방식으로 라우팅을 하지 않으며 , 리엑트의 `Link`를 사용하여 라우팅을 한다. anchor 방식으로 라우팅을 하게 되면 전체 웹페이지가 새로고침이 되어서 속도가 매우 느려지지만, `Link`를 사용하면 바뀐 부분만 로딩이 되기 때문에 속도가 매우 빠르다.

```jsx
<nav>
	<Link href="/">Home</Link>
	<Link href="/about">About</Link>
</nav>
```

### CSS Modules

CSS 적용은 React와 유사하게 styles 폴더에 {파일명}.module.css 파일을 생성하고 이를 import 하는 방식으로 사용할 수 있다. 그러나 아래 방법은 많이 사용하지 않으며 보통 styled JSX 방식을 사용하여 CSS를 사용한다.

```css
// NavBar.module.css
.active {
    display: flex;
    justify-content: space-between;
    background-color: tomato;
}

.link {
    text-decoration: none;
}
```

```jsx
// NavBar.js
<nav>
	<Link href="/" className={router.pathname === "/" ? styles.active : ""}>
		Home
	</Link>
	<Link href="/about" className={router.pathname === "/about" ? styles.active : ""}>
		About
	</Link>
</nav>
```

### Styled JSX

Styled JSX는 별도의 CSS 파일이 필요 없다. 함수 return 시 style jsx 태그에 CSS를 구현하고 넘겨주면 구현이 끝난다. Styled JSX의 장점은, 별도의 파일이 필요 없는 것도 있지만, 각 컴포넌트에만 적용이 되기 때문에 className 등에 영향을 받지 않는다는 장점이 있다.

```javascript
import Link from "next/link";
import { useRouter } from "next/router";

export default function NavBar() {
    const router = useRouter();
    return (
        <nav>
            <Link
                href="/"
                className={router.pathname === "/about" ? "active" : ""}
            >
                Home
            </Link>
            <Link
                href="/about"
                className={router.pathname === "/about" ? "active" : ""}
            >
                About
            </Link>

            <style jsx>{`
                nav {
                    background-color: tomato;
                }
                a {
                    text-decoration: none;
                }
                .active {
                    color: yellow;
                }
            `}</style>
        </nav>
    );
}
```

### Custom App

그럼 CSS를 전역으로 설정하고 싶으면 어떻게 해야할까? 앞서 배운대로 styled JSX는 각 컴포넌트에서만 작용하기 때문에 다른 컴포넌트에는 영향을 끼치지 못한다. 아울러 각 페이지별로 불필요하게 NavBar를 계속 반복해서 선언해주는 것도 매우 불편하다. 이때 필요한 것이 **App Compnent** 이다. App Component는 컴포넌트들의 blueprint로써 모든 페이지들이 불려오기 전에 가장 먼저 실행이된다. 파일명은 `_app.js`로 고정이 되어야 한다. 아래 코드처럼 모든 컴포넌트 위에 네비게이션 바를 넣어주면서 전역으로 네비게이션 바를 설정해 줄 수도 있으며, 여기에 styled JSX를 선언하여 전역으로 스타일을 설정해줄 수도 있다.

CSS를 설정할 수 있는 또 다른 방법은 global.css 파일을 import 하는 것이다. global.css 파일은 \_app.js 에서만 import를 할 수 있으며, 다른 컴포넌트에서는 import할 수 없다.

```javascript
import NavBar from "./NavBar";
import "../styles/globals.css";

export default function App({ Component, pageProps }) {
    return (
        <div>
            <NavBar />
            <Component {...pageProps} />
        </div>
    );
}
```

## Contents - Practice Project

### Patterns

### Fetching Data

### Redirect and Rewrite

### Server Side Rendering

### Recap

### Dynamic Routes

### Catch All

### 404 Pages
