import React from 'react';
import { screen } from '@testing-library/react';
// import userEvent from '@testing-library/user-event';
import renderWithRouter from '../helper/renderWithRouter';
import { About } from '../components';

describe('Requisito 2', () => {
  test('teste se há informações na página sobre a pokédex', () => {
    renderWithRouter(<About />);
    const pokeInfo = screen.getByText(
      'One can filter Pokémons by type, and see more details for each one of them',
    );
    expect(pokeInfo).toBeInTheDocument();
  });

  test('teste se há o elemento h2 com o texto "about Pokédex"', () => {
    renderWithRouter(<About />);
    const aboutTitle = screen.getByRole('heading', {
      level: 2,
      name: /about pokédex/i,
    });
    expect(aboutTitle).toBeInTheDocument();
  });

  test('Testando se a página renderiza 2 paragrafos', () => {
    renderWithRouter(<About />);
    const p1 = screen.getByText(/this application/i, {
      selector: 'p',
    });
    const p2 = screen.getByText(/One can filter/i, {
      selector: 'p',
    });
    const arrayP = [p1, p2];
    expect(arrayP.length).toBe(2);
  });

  test('verifica a url da imagem', () => {
    renderWithRouter(<About />);
    const pokeImg = screen.getByAltText(/pokédex/i);
    const url = 'https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png';

    expect(pokeImg.src).toContain(url);
  });
});
