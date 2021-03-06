import React from 'react';

import { MemoryRouter } from 'react-router-dom';

import { render } from '@testing-library/react';

import { useDispatch, useSelector } from 'react-redux';

import App from '../App';

describe('App', () => {
  beforeEach(() => {
    const dispatch = jest.fn();

    useDispatch.mockImplementation(() => dispatch);

    useSelector.mockImplementation((selector) => selector({
      regions: [
        { id: 1, name: '서울' },
      ],
      categories: [
        { id: 1, name: '한식' },
      ],
      restaurants: [
        { id: 1, name: '마법사주방' },
      ],
    }));
  });

  function renderApp({ path }) {
    return render((
      <MemoryRouter initialEntries={[path]}>
        <App />
      </MemoryRouter>
    ));
  }

  context('Show homepage with path /', () => {
    it('renders the index page', () => {
      const { queryByText } = renderApp({ path: '/' });

      expect(queryByText('헤더')).not.toBeNull();
      expect(queryByText('About')).not.toBeNull();
      expect(queryByText('Restaurants')).not.toBeNull();
    });

    it('Header links exist', () => {
      renderApp({ path: '/' });

      const aTags = document.querySelectorAll('a');
      expect(aTags[0].getAttribute('href')).toEqual('/');
    });
  });

  context('Show about page with path /about', () => {
    it('renders the about page', () => {
      const { queryByText } = renderApp({ path: '/about' });

      expect(queryByText('소개 페이지입니다.')).not.toBeNull();
    });
  });

  context('Show restaurants page with path /restaurants', () => {
    it('renders the restaurants page', () => {
      const { queryByText } = renderApp({ path: '/restaurants' });

      expect(queryByText('서울')).not.toBeNull();
    });
  });

  context('Show not found page', () => {
    it('renders the not found page', () => {
      const { queryByText } = renderApp({ path: '/notFoundTest' });

      expect(queryByText('404 Not Found')).not.toBeNull();
    });
  });
});
