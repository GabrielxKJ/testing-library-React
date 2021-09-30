import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from '../helper/renderWithRouter';

describe('testes do requisito 1', () => {
  test('testandando se a aplicação renderiza o conjunto de links', () => {
    render(
      <MemoryRouter>
        <App />
      </MemoryRouter>,
    );
    const textLink = screen.getByRole('link', {
      name: /home/i,
    });
    const textLink2 = screen.getByRole('link', {
      name: /about/i,
    });
    const textLink3 = screen.getByRole('link', {
      name: /favorite Pokémons/i,
    });
    expect(textLink).toBeInTheDocument();
    expect(textLink2).toBeInTheDocument();
    expect(textLink3).toBeInTheDocument();
  });

  test('Testando se ao clicar em "home", é redirecionado para a página inicial', () => {
    const { history } = renderWithRouter(<App />);
    const homeLink = screen.getByRole('link', {
      name: /home/i,
    });
    userEvent.click(homeLink);
    const pathName = history.location.pathname;
    // const homeTitle = screen.getByRole('heading', {
    //   level: 2,
    //   name: /Encountered pokémons/i,
    // });

    // expect(homeTitle).toBeInTheDocument();
    expect(pathName).toBe('/');
  });
});

test('Testando se ao clicar em "about", é redirecionado para a página about', () => {
  const { history } = renderWithRouter(<App />);
  const aboutLink = screen.getByRole('link', {
    name: /about/i,
  });
  userEvent.click(aboutLink);
  const pathName = history.location.pathname;
  expect(pathName).toBe('/about');
});

test('Testando se ao clicar no link Favorite Pokemons redireciona pra rota certa', () => {
  const { history } = renderWithRouter(<App />);
  const FavoriteLink = screen.getByRole('link', {
    name: /favorite pokémons/i,
  });
  userEvent.click(FavoriteLink);
  const pathName = history.location.pathname;
  // const favoriteTitle = screen.getByRole('heading', {
  //   level: 2,
  //   name: /Favorite pokémons/i,
  // });

  // expect(favoriteTitle).toBeInTheDocument();
  expect(pathName).toBe('/favorites');
});

test('deve testar um caminho não existente e a renderização do Not Found', () => {
  const { history } = renderWithRouter(<App />);
  history.push('notfoundPage/');
  const noMatch = screen.getByText(/page requested not found/i);
  expect(noMatch).toBeInTheDocument();
});
