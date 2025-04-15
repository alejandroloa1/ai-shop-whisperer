
import React from 'react';
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: Usuario intentó acceder a ruta inexistente:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-gray-900 dark:to-gray-800">
      <div className="text-center max-w-md px-6">
        <h1 className="text-6xl font-bold text-primary mb-6">404</h1>
        <p className="text-2xl font-semibold text-gray-700 dark:text-gray-300 mb-4">Página no encontrada</p>
        <p className="text-gray-600 dark:text-gray-400 mb-8">
          Lo sentimos, la página que estás buscando no existe o ha sido movida.
        </p>
        <Link to="/">
          <Button size="lg" className="rounded-full px-8">
            Volver al Dashboard
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
