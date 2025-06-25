import React from 'react';
import ReactDOM from 'react-dom/client';
import './styles/index.css';
import './i18n';
import App from './App';

// // 只在开发环境启用 vConsole
// if (import.meta.env.DEV) {
//   import('vconsole').then(({ default: VConsole }) => {
//     new VConsole();
//   });
// }

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
