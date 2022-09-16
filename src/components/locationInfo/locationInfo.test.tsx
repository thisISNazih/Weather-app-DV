import { render } from '@testing-library/react';
import LocationInfo from './LocationInfo';
import { MemoryRouter } from 'react-router-dom';

test('Location info component contains the weather description', () => {
  const { queryByTestId } = render(
    <MemoryRouter>
      <LocationInfo />
    </MemoryRouter>
  );
  expect(queryByTestId('non-emptyDescription')).not.toBeEmptyDOMElement();
});
