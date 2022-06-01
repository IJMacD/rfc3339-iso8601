import { render, screen } from '@testing-library/react';
import App from './App';

test('renders Notes', () => {
  render(<App />);
  const keyElement = screen.getByText(/This table is not exhaustive/);
  expect(keyElement).toBeInTheDocument();
});
