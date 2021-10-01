import React from 'react';
import { screen } from '@testing-library/react';
// import userEvent from '@testing-library/user-event';
import NotFound from '../components/NotFound';
import renderWithRouter from '../helper/renderWithRouter';

describe('requisito 4', () => {
  test('Teste se a página contém um heading com o texto'
  + '"Page requested not found "', () => {
    renderWithRouter(<NotFound />);
    const heading2 = screen.getByRole('heading', {
      level: 2,
      name: /Page requested not found/i,
    });
    expect(heading2).toBeInTheDocument();
  });

  test('teste se a imagem do pikachu triste é renderizada', () => {
    renderWithRouter(<NotFound />);
    const pikachuSad = screen.getByAltText(/Pikachu crying because/i);
    const imgUrl = 'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif';
    expect(pikachuSad).toBeInTheDocument();
    expect(pikachuSad.src).toContain(imgUrl);
  });
});
