import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../helper/renderWithRouter';
import { FavoritePokemons } from '../components';
import App from '../App';

describe('testes do Requisito 3', () => {
  test('Verifica se o texto "No favorite pokemon found"'
   + 'é encontrado no link Favorite Pokémons', () => {
    renderWithRouter(<FavoritePokemons />);
    const tagP = screen.getByText(/No favorite pokemon found/i);
    expect(tagP).toBeInTheDocument();
  });

  test('Teste se todos os pokémons favoritados são renderizados', () => {
    const { history } = renderWithRouter(<App />);

    const detailsLink = screen.getByRole('link', { name: /more details/i });
    expect(detailsLink).toBeInTheDocument();

    userEvent.click(detailsLink);
    const detailsPath = history.location.pathname;
    expect(detailsPath).toBe('/pokemons/25');

    const checkbox = screen.getByRole('checkbox', { name: /pokémon favoritado\?/i });
    userEvent.click(checkbox);
    const favoriteLink = screen.getByRole('link', { name: /Favorite Pokémons/i });
    expect(favoriteLink).toBeInTheDocument();

    userEvent.click(favoriteLink);
    const favoritePath = history.location.pathname;
    expect(favoritePath).toBe('/favorites');

    const pokeName = screen.getByText(/pikachu/i);
    expect(pokeName).toBeInTheDocument();
  });
});
