# React Ultimate Starter Template

### Môi trường chạy dự án: Node.js v20.14.0
https://nodejs.org/download/release/v20.14.0/

### Cài Extension
React Developer Tools
Redux DevTools

### Cài Router để chuyển trang
npm i --save-exact react-router-dom@6.23.1

ở file main.jsx:

Bước 1:
import {
 createBrowserRouter,
 RouterProvider,
} from "react-router-dom";

Bước 2:
const router = createBrowserRouter([
 {
 path: "/",
 element: <App />    // <div>Hello world!</div>,
 },        // có thể thêm nhiều trang ở đây
]);

Bước 3:
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} /> //
  </React.StrictMode>
);

### Cài Ant Design
npm i --save-exact antd@5.18.1 @ant-design/icons@5.3.7

### Cài SASS
npm install --save-exact sass@1.78.0

- chạy lại dự án nếu sass ko hoạt động

### Cài axios để gọi API
npm i --save-exact axios@1.7.2

### Cài Redux Toolkit
npm install --save-exact @reduxjs/toolkit@1.9.7 react-redux@8.1.3

- @reduxjs/toolkit => đây là thư viện giúp tạo ra "global state" của redux

- react-redux => sử dụng redux với react component

===

Các bước cài đặt: (chế độ development)
1. clone code
2. cài đặt thư viện: npm i
3. Update file .env.development (nếu cần thiết)
4. Chạy dự án: npm run dev

===

Cách chạy tại chế độ production:
1. clone code
2. cài đặt thư viện: npm i
3. Update file .env.production (nếu cần thiết)
4. Build dự án: npm run build
5. Chạy dự án: npm run preview
