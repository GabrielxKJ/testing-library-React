import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from '../helper/renderWithRouter';
import pokemons from '../data';

describe('Requisito 6', () => {
  test('Teste se é renderizado um card com as infos dos pokemons', () => {
    renderWithRouter(<App />);
    const pokeName = screen.getByText('Pikachu');
    expect(pokeName).toBeInTheDocument();
    const pokeType = screen.getByText('Electric', {
      selector: 'p',
    });
    expect(pokeType).toBeInTheDocument();
    const avarageWeight = screen.getByTestId('pokemon-weight');
    expect(avarageWeight)
      .toHaveTextContent(
        `Average weight: ${pokemons[0]
          .averageWeight.value} ${pokemons[0].averageWeight.measurementUnit}`,
      );

    const pokeImg = screen.getByRole('img', {
      name: 'Pikachu sprite',
    });

    const firstPokeURL = 'https://cdn2.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png';
    expect(pokeImg.src).toStrictEqual(firstPokeURL);
    expect(pokeImg.alt).toBe(`${pokemons[0].name} sprite`);
  });
  test('Teste se a página contém link de detalhes do pokemon', () => {
    const { history } = renderWithRouter(<App />);

    const pokeLink = screen.getByRole('link', {
      name: 'More details',
    });
    userEvent.click(pokeLink);
    expect(pokeLink);
    const pikachuDetailsPath = history.location.pathname;
    expect(pikachuDetailsPath).toBe(`/pokemons/${pokemons[0].id}`);
    const DetailsPage = screen.getByText('Pikachu Details');
    expect(DetailsPage).toBeInTheDocument();
  });

  test('Teste se há um icone de estrelas no pokemon favoritado', () => {
    const { history } = renderWithRouter(<App />);
    history.push('pokemons/25');
    const cheked = screen.getByRole('checkbox', {
      name: /pokémon favoritado\?/i,
    });
    userEvent.click(cheked);
    const starImg = screen.getByRole('img', {
      name: /pikachu is marked as favorite/i,
    });
    expect(starImg.src).toBe('http://localhost/star-icon.svg');
    expect(starImg.alt).toBe(`${pokemons[0].name} is marked as favorite`);
  });
});
