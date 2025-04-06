import { useEffect, useState } from 'react';

export default function ThemeToggle() {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const storedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const shouldBeDark = storedTheme === 'dark' || (!storedTheme && prefersDark);

    setIsDark(shouldBeDark);
    document.documentElement.classList[shouldBeDark ? 'add' : 'remove']('dark');
  }, []);

  const toggleTheme = () => {
    const newIsDark = !isDark;
    setIsDark(newIsDark);
    document.documentElement.classList[newIsDark ? 'add' : 'remove']('dark');
    localStorage.setItem('theme', newIsDark ? 'dark' : 'light');
  };

  return (
    <button
      onClick={toggleTheme}
      className="fixed top-4 right-4 bg-neutral-900 text-white px-3 py-1 rounded-full text-sm shadow z-50"
    >
      {isDark ? '🌙 Dark' : '☀️ Light'}
    </button>
  );
}
