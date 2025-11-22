import React, { useEffect, useRef } from 'react';
import { useLocation } from 'react-router';
import { ThemeProvider } from '~/lib/theme/index';
import Header from './Header';
import Footer from './Footer';
import ToastProvider from './ToastProvider';
import ChatWidget from './ChatWidget';
import FloatingCTA from './FloatingCTA';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const location = useLocation();
  const mainRef = useRef<HTMLElement>(null);
  const announcementRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Плавный переход при смене страницы
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [location.pathname]);

  return (
    <ThemeProvider>
      <div className="min-h-screen flex flex-col bg-white dark:bg-neutral-900 transition-colors">
        <Header />
        <main ref={mainRef} className="flex-grow">
          {children}
        </main>
        <Footer />
        <ChatWidget />
        <FloatingCTA />
        <ToastProvider />
      </div>
    </ThemeProvider>
  );
};

export default Layout;
