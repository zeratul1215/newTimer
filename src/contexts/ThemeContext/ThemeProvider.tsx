import { useEffect, useState } from 'react';
import { Theme, ThemeProviderProps } from './ThemeContextType';
import { ThemeContext } from './ThemeContext';

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  const [theme, setTheme] = useState<Theme>(() => {
    // 从 localStorage 获取保存的主题，如果没有则默认为 light
    const savedTheme = localStorage.getItem('theme') as Theme;
    return savedTheme || 'light';
  });

  useEffect(() => {
    // 保存主题到 localStorage
    localStorage.setItem('theme', theme);

    // 设置 CSS 变量
    const root = document.documentElement;
    root.setAttribute('data-theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => (prev === 'light' ? 'dark' : 'light'));
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
