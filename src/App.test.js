import { render, screen } from '@testing-library/react';
import App from './App';

test('renders Bitcoin’s average price', () => {
  render(<App />);
  const linkElement = screen.getByText(/Bitcoin’s average price/i);
  expect(linkElement).toBeInTheDocument();
});
