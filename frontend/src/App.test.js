//App.test.js

import { render, screen } from '@testing-library/react';
import App from './App';

test('renders Events page by default', () => {
  render(<App />);
  expect(screen.getByText(/All Events/i)).toBeInTheDocument();
});
