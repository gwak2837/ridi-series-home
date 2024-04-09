# RIDI 작품 홈 클론

## 개발 환경

- Chrome 122.0
- NPM 10.2
- Node.js 20.10
- macOS 14.1
- Apple M1 Pro

## Getting Started

#### Install dependencies

```bash
npm i
```

#### 개발 모드

파일 변경 사항 반영 빠름, 페이지 로딩 속도 느림

```bash
npm run dev
```

#### 배포 모드

파일 변경 사항 반영 불가, 페이지 로딩 속도 빠름

```bash
npm run build && npm run start
```

#### 접속

```
http://localhost:3000
```

## 라이브러리

- CSS: TailwindCSS ([이유](https://dev.to/srmagura/why-were-breaking-up-wiht-css-in-js-4g9b))
- 네트워크 상태 관리: React Query ([이유](https://tech.kakaopay.com/post/react-query-1/))
- 날짜: date-fns ([이유](https://medium.com/naver-biz-dev/date-fns-64c962200506))
