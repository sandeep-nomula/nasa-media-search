import { render, screen } from '@testing-library/react';
import App from '../App';

test('renders CRUK App', () => {
  render(<App />);
  const linkElement = screen.getByText(/CRUK technical exercise - React/i);
  expect(linkElement).toBeInTheDocument();
});
