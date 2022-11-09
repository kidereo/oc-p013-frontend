import { render, screen } from '@testing-library/react';
import ArgentBank from './ArgentBank';

test('renders learn react link', () => {
  render(<ArgentBank />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
