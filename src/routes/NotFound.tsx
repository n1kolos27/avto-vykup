import React from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../components/ui/Button.js';

const NotFound: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="flex-1 flex items-center justify-center p-5">
      <div className="flex flex-col items-center">
        <h1 className="text-7xl font-bold text-primary-600 mb-4">404</h1>
        <p className="text-lg text-neutral-600 mb-6">Страница не найдена</p>
        <Button onClick={() => navigate('/')}>На главную</Button>
      </div>
    </div>
  );
};

export default NotFound;
