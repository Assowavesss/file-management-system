import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Navbar from './NavBar.js';

describe('NavBar Component', () => {
  test('renders the navbar with all nav items', () => {
    const { getAllByText } = render(
      <MemoryRouter>
        <Navbar />
      </MemoryRouter>
    );

    // Testez si tous les navItems sont présents avec les occurrences attendues
    const navItems = [
      'Home',
      'Upload files',
      'Meeting',
      'Evaluation Form',
      'Report Validation',
      'Connexion',
    ];

    navItems.forEach((item) => {
      const matchingElements = getAllByText(item);
      // Supposons que chaque élément apparaît deux fois (une fois dans le menu mobile et une fois dans le menu de bureau)
      expect(matchingElements.length).toBe(2);
    });
  });

  test('toggles mobile navigation when menu button is clicked', () => {
    const { getByLabelText, queryByRole } = render(
      <MemoryRouter>
        <Navbar />
      </MemoryRouter>
    );

    // Trouvez le bouton du menu et simulez un clic
    const menuButton = getByLabelText(/open drawer/i);
    fireEvent.click(menuButton);

    // Vérifiez si le tiroir est présent après le clic
    const drawer = queryByRole('presentation');
    expect(drawer).toBeVisible();
  });

  // Vous pouvez ajouter plus de tests pour simuler d'autres interactions ou vérifier d'autres aspects de votre composant
});
