// App.test.js

import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

// Mock du composant NavBar avec un nom explicite
jest.mock('./components/NavBar/NavBar', () => {
  const MockNavBar = () => <div data-testid="navbar"></div>;
  MockNavBar.displayName = 'MockNavBar';
  return MockNavBar;
});

describe('App Component', () => {
  test('renders App and includes NavBar', () => {
    // Rendre le composant App
    render(<App />);

    // Vérifier si NavBar est présent
    const navbarElement = screen.getByTestId('navbar');
    expect(navbarElement).toBeInTheDocument();
  });

  // Vous pouvez ajouter d'autres tests ici pour d'autres aspects de App
});
