import React from 'react';
import { screen } from '@testing-library/react';
// import userEvent from '@testing-library/user-event';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from '../helper/renderWithRouter';
import pokemons from '../data';

describe('Requisito 7', () => {
  test('Teste se as informações detalhadas dos pokemons são mostradas na tela', () => {
    const { history } = renderWithRouter(<App />);

    history.push('pokemons/25');
    const detailsTitle = screen.getByRole('heading', { name: /pikachu details/i });
    expect(detailsTitle.innerHTML).toBe(`${pokemons[0].name} Details`);

    const sumary = screen.getByRole('heading', { name: /summary/i, level: 2 });
    expect(sumary).toBeInTheDocument();

    const pokeLink = screen.queryByRole('link', { name: 'More details' });
    expect(pokeLink).toBeNull();

    const pokeResume = screen.getByText(/This intelligent Pokémon /i, {
      selector: 'p',
    });

    expect(pokeResume).toBeVisible();
  });
  test('Teste se há uma sessão de mapas contendo a localização dos pokemons', () => {
    renderWithRouter(<App />);

    const { history } = renderWithRouter(<App />);
    history.push('pokemons/25');

    const headingLocation = screen.getByRole('heading', {
      level: 2,
      name: `Game Locations of ${pokemons[0].name}`,
    });
    expect(headingLocation).toBeInTheDocument();

    const pokeLocation = screen.getAllByAltText('Pikachu location');
    expect(pokeLocation).toHaveLength(2);

    const locationName1 = screen.getByText(/kanto viridian forest/i);
    const locationName2 = screen.getByText(/kanto power plant/i);
    expect(locationName1).toBeInTheDocument();
    expect(locationName2).toBeInTheDocument();
    expect(pokeLocation[0].src).toBe('https://cdn2.bulbagarden.net/upload/0/08/Kanto_Route_2_Map.png');
    expect(pokeLocation[1].src).toBe('https://cdn2.bulbagarden.net/upload/b/bd/Kanto_Celadon_City_Map.png');
    expect(pokeLocation[0].alt).toBe(`${pokemons[0].name} location`);
  });

  test('Teste se o usuário pode favoritar um pokemon através da página de detalhes',
    () => {
      renderWithRouter(<App />);
      const pokeLink = screen.queryByRole('link', { name: 'More details' });
      userEvent.click(pokeLink);

      const checkbox = screen.getByLabelText('Pokémon favoritado?');
      userEvent.click(checkbox);
      expect(checkbox).toBeChecked();

      const favoriteStar = screen.getByRole('img',
        { name: /pikachu is marked as favorite/i });
      expect(favoriteStar).toBeInTheDocument();

      userEvent.click(checkbox);
      expect(favoriteStar).not.toBeInTheDocument();
    });
});
