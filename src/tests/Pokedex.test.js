import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from '../helper/renderWithRouter';
import pokemons from '../data';

describe('Requisito 5', () => {
  test('Teste se a pagina contém um heading lvl2 com'
  + 'o texto "Encountered pokémons"', () => {
    renderWithRouter(<App />);
    const h2 = screen.getByRole('heading', {
      level: 2,
      name: 'Encountered pokémons',
    });
    expect(h2).toBeInTheDocument();
  });

  test('teste se é renderizado o pŕoximo pokemon '
  + 'quando o botão proximo é clicado', () => {
    renderWithRouter(<App />);
    const buttonNext = screen.getByRole('button', {
      name: 'Próximo pokémon',
    });

    expect(buttonNext).toHaveTextContent('Próximo pokémon');

    pokemons.forEach((pokemon) => {
      const allPoke = screen.getByText(pokemon.name);
      expect(allPoke).toBeInTheDocument();
      userEvent.click(buttonNext);
    });

    const theOnlyOne = screen.getByText(pokemons[0].name);
    expect(theOnlyOne).toBeInTheDocument();
  });

  test('teste se é renderizado um pokemon por vez', () => {
    renderWithRouter(<App />);
    const onePokePer = screen.getAllByTestId('pokemon-name');
    expect(onePokePer).toHaveLength(1);
  });

  test('se a pokedex tem botões de filtro', () => {
    renderWithRouter(<App />);
    const buttonNext = screen.getByTestId('next-pokemon');
    const typeList = [];
    const allTypes = ['Electric', 'Fire', 'Bug', 'Poison', 'Psychic', 'Normal', 'Dragon'];
    const typeButtons = screen.getAllByTestId('pokemon-type-button');
    typeButtons.forEach((button) => typeList.push(button.innerHTML)); // adicionando os valorses os botões no array
    expect(typeList).toStrictEqual(allTypes);

    const fireTypeButton = screen.getByText(/fire/i);
    userEvent.click(fireTypeButton);

    const fireType = screen.getByTestId('pokemon-type');
    expect(fireType.innerHTML).toBe('Fire');

    userEvent.click(buttonNext);
    const rapidash = screen.getByText('Rapidash');
    expect(rapidash.innerHTML).toBe('Rapidash');

    userEvent.click(fireTypeButton);
    expect(fireTypeButton.InnerText).toEqual(fireType.InnerText);

    const buttonAllShow = screen.getByRole('button', {
      name: 'All',
    });
    expect(buttonAllShow).toBeVisible();
  });

  test('Teste se a pokedex tem o botão de resetar o filtro', () => {
    renderWithRouter(<App />);
    const buttonNext = screen.getByTestId('next-pokemon');
    const buttonAllText = screen.getByText('All');
    expect(buttonAllText).toBeInTheDocument();

    userEvent.click(buttonAllText);
    const firstPoke = screen.getByText('Pikachu');
    expect(firstPoke).toBeInTheDocument();

    userEvent.click(buttonNext);
    const secondePoke = screen.getByText('Charmander');
    expect(secondePoke).toBeInTheDocument();
  });
});
