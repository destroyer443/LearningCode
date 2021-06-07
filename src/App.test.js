import { render, screen } from '@testing-library/react';
import ToDoList from './App';

test('renders learn react link', () => {
  render(<ToDoList />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
