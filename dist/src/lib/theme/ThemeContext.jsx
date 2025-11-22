import React, { createContext, useContext, useEffect, useState } from 'react';
const ThemeContext = createContext(undefined);
const THEME_STORAGE_KEY = 'avto-vykup-theme';
export const ThemeProvider = ({ children }) => {
    const [theme, setThemeState] = useState(() => {
        if (typeof window === 'undefined')
            return 'system';
        const stored = localStorage.getItem(THEME_STORAGE_KEY);
        return stored || 'system';
    });
    const [resolvedTheme, setResolvedTheme] = useState(() => {
        if (typeof window === 'undefined')
            return 'light';
        if (theme === 'system') {
            return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
        }
        return theme;
    });
    useEffect(() => {
        const root = document.documentElement;
        if (resolvedTheme === 'dark') {
            root.classList.add('dark');
        }
        else {
            root.classList.remove('dark');
        }
    }, [resolvedTheme]);
    useEffect(() => {
        if (theme === 'system') {
            const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
            const handleChange = (e) => {
                setResolvedTheme(e.matches ? 'dark' : 'light');
            };
            handleChange(mediaQuery);
            mediaQuery.addEventListener('change', handleChange);
            return () => mediaQuery.removeEventListener('change', handleChange);
        }
        else {
            setResolvedTheme(theme);
        }
    }, [theme]);
    const setTheme = (newTheme) => {
        setThemeState(newTheme);
        if (typeof window !== 'undefined') {
            localStorage.setItem(THEME_STORAGE_KEY, newTheme);
        }
    };
    const toggleTheme = () => {
        const newTheme = resolvedTheme === 'light' ? 'dark' : 'light';
        setTheme(newTheme);
    };
    return (<ThemeContext.Provider value={{ theme, resolvedTheme, setTheme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>);
};
export const useThemeContext = () => {
    const context = useContext(ThemeContext);
    if (context === undefined) {
        throw new Error('useThemeContext must be used within a ThemeProvider');
    }
    return context;
};
