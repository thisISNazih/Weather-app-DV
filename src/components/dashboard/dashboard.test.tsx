import { render, fireEvent } from '@testing-library/react';
import Dashboard from './Dashboard';
import { MemoryRouter } from 'react-router-dom';

test('Page contains unit switcher with default text', () => {
  const view = render(<Dashboard />);
  const unitSwitcherButton = view.getByText('switch to °F');

  expect(unitSwitcherButton).toBeTruthy();
});

test('After unit switcher button click, text changes', () => {
  const view = render(<Dashboard />);
  const unitSwitcherButtonBeforeClick = view.getByText('switch to °F');
  fireEvent.click(unitSwitcherButtonBeforeClick);
  const unitSwitcherButtonAfterClick = view.getByText('switch to °C');
  expect(unitSwitcherButtonAfterClick).toBeTruthy();
});

test('dashboard render the cities wrapper that contains several locations', () => {
  const { queryByTestId } = render(<Dashboard />);
  expect(queryByTestId('cities')).toBeTruthy();
});

test('dashboard renders at least 1 weather locations', () => {
  const { queryByTestId } = render(
    <MemoryRouter>
      <Dashboard />
    </MemoryRouter>
  );
  const parent = queryByTestId('cities');
  const child = queryByTestId('cityData');
  expect(parent).toContainElement(child);
});
