import { crukTheme } from '@cruk/cruk-react-components';
import { render, screen } from '@testing-library/react';
import { ThemeProvider } from 'styled-components';
import { Player } from '../Player';


const renderComponent = ({ theme, props }) =>
  render(
    <ThemeProvider theme={theme}>
      <Player {...props} />
    </ThemeProvider>
  );


test('check whether results are getting rendered ', () => {

  const props = { 
    media:"image", 
    nasa_id:"image_1"
  };
  
  renderComponent({ theme: crukTheme, props: props });
  const image = screen.getByRole('img', { name: /image_1/i });

  expect(image).toBeInTheDocument();
  expect(image).toHaveAttribute("src","https://images-assets.nasa.gov/image/image_1/image_1~thumb.jpg");
});
