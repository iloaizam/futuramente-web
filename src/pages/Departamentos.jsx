import React from 'react';
import { Navigate } from 'react-router-dom';

export default function Departamentos() {
  return <Navigate to="/" replace state={{ scrollTo: 'mapa-territorios' }} />;
}
