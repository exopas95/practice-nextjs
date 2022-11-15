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
    <Link
        href="/about"
        className={router.pathname === "/about" ? styles.active : ""}
    >
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

NEXT.js 에서는 디자인 패턴으로 Layout 패턴을 많이 쓴다. \_app.js 에 모든 것들을 설정하기에는 파일이 너무 커지기 때문에, Layout과 관련된 것들은 모두 Layout.js 파일에 정리한다. HTML의 구조를 Layout에 정의한 후, 이를 \_app.js에서 세팅해주는 형식으로 나눠서 관리한다. 이는 특히 Header와 Footer를 적용할때 자주 사용된다.

### Redirect and Rewrite

[**1. next.config.js**](https://nextjs.org/docs/api-reference/next.config.js/introduction)  
Next.js에서 커스텀 설정을 하기 위해서는 프로젝트 디렉터리의 루트(package.json 옆)에 next.config.js 또는 next.config.mjs 파일을 만들 수 있다. next.config.js는 JSON 파일이 아닌 일반 Node.js 모듈dl다.  
Next.js 서버 및 빌드 단계에서 사용되며 브라우저 빌드에는 포함되지 않는다.

[**2. Redirects (URL변경됨)**](https://nextjs.org/docs/api-reference/next.config.js/redirects)
Redirect을 사용하면 들어오는 request 경로를 다른 destination 경로로 Redirect할 수 있다. Redirect을 사용하려면 next.config.js에서 redirects 키를 사용할 수 있다. redirects은 source, destination 및 permanent 속성이 있는 객체를 포함하는 배열을 반환하는 비동기 함수이다.

-   source: 들어오는 request 경로 패턴 (request 경로)
-   destination: 라우팅하려는 경로 (redirect할 경로)
-   permanent: true인 경우 클라이언트와 search 엔진에 redirect를 영구적으로 cache하도록 지시하는 308 status code를 사용하고, false인 경우 일시적이고 cache되지 않은 307 status code를 사용합니다.

**[3. Rewrites (URL변경되지 않음)](https://nextjs.org/docs/api-reference/next.config.js/rewrites)**  
Rewrites를 사용하면 들어오는 request 경로를 다른 destination 경로에 매핑할 수 있습니다.  
Rewrites은 URL 프록시 역할을 하고 destination 경로를 mask하여 사용자가 사이트에서 위치를 변경하지 않은 것처럼 보이게 합니다. 반대로 redirects은 새 페이지로 reroute되고 URL 변경 사항을 표시합니다.

주의! fetch할 때 /api/movies 또는 http://localhost:3000/api/movies 둘 다 가능하지만 http가 아닌 https로 fetch하게 되면 오류가 발생합니다.

### Server Side Rendering

[**1. getServerSideProps**](https://nextjs.org/docs/basic-features/data-fetching/get-server-side-props)  
page에서 서버 측 랜더링 함수인 getServerSideProps함수를 export하는 경우 Next.js는 getServerSideProps에서 반환된 데이터를 사용하여 각 request에서 이 페이지를 pre-render합니다. getServerSideProps는 서버 측에서만 실행되며 브라우저에서는 실행되지 않습니다.

[**2. getServerSideProps를 사용하여 request시 데이터 fetch하기**](https://nextjs.org/docs/basic-features/data-fetching/get-server-side-props#using-getserversideprops-to-fetch-data-at-request-time)  
다음 예는 request 시 데이터를 fetch하고 결과를 pre-render하는 방법을 보여줍니다.  
(fetch할 때 오류 뜨시는 분들은 https를 http로 바꿔주시면 됩니다.)

```javascript
export default function Home({ data }) {
    // 데이터 랜더링
}

// 매 request마다 실행됩니다.
export async function getServerSideProps() {
    const res = await fetch(`https://.../data`);
    const data = await res.json();

    // props를 통해 page에 data전달
    return { props: { data } };
}
```

**[3. getServerSideProps (타입스크립트와 함께 사용하기)](https://nextjs.org/docs/api-reference/data-fetching/get-server-side-props#getserversideprops-with-typescript)**

### Dynamic Routes

### Catch All

### 404 Pages
