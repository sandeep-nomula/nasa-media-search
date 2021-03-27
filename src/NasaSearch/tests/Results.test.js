import { crukTheme } from '@cruk/cruk-react-components';
import { render, screen } from '@testing-library/react';
import { ThemeProvider } from 'styled-components';
import { Results } from '../Results';


const renderComponent = ({ theme, data }) =>
  render(
    <ThemeProvider theme={theme}>
      <Results data={data} />
    </ThemeProvider>
  );

test('check whether results are getting rendered ', () => {

  const data = [{
      "links": [
        {
          "href": "https://images-assets.nasa.gov/image/NHQ201905310026/NHQ201905310026~thumb.jpg",
          "render": "image",
          "rel": "preview"
        }
      ],
      "href": "https://images-assets.nasa.gov/image/NHQ201905310026/collection.json",
      "data": [
        {
          "location": "Mars, PA, USA",
          "nasa_id": `image_1`,
          "description": "The Mars Universe Friday, May 31, 2019, in Mars, Pennsylvania. NASA is in the small town to celebrate Mars exploration and share the agency’s excitement about landing astronauts on the Moon in five years. The celebration includes a weekend of Science, Technology, Engineering, Arts and Mathematics (STEAM) activities. Photo Credit: (NASA/Bill Ingalls)",
          "title": "Mars Universe",
          "photographer": "NASA/Bill Ingalls",
          "center": "HQ",
          "date_created": "2019-05-31T00:00:00Z",
          "media_type": "image",
          "keywords": [
            "Mars",
            "Mars Universe",
            "Pennsylvania"
          ]
        }
      ]
    },
    {
      "links": [
        {
          "href": "https://images-assets.nasa.gov/image/NHQ201905310033/NHQ201905310033~thumb.jpg",
          "render": "image",
          "rel": "preview"
        }
      ],
      "href": "https://images-assets.nasa.gov/image/NHQ201905310033/collection.json",
      "data": [
        {
          "location": "Mars, PA, USA",
          "nasa_id": `image_2`,
          "description": "The Mars celebration Friday, May 31, 2019, in Mars, Pennsylvania. NASA is in the small town to celebrate Mars exploration and share the agency’s excitement about landing astronauts on the Moon in five years. The celebration includes a weekend of Science, Technology, Engineering, Arts and Mathematics (STEAM) activities. Photo Credit: (NASA/Bill Ingalls)",
          "title": "Mars Celebration",
          "photographer": "NASA/Bill Ingalls",
          "center": "HQ",
          "date_created": "2019-05-31T00:00:00Z",
          "media_type": "image",
          "keywords": [
            "Mars",
            "Mars Celebration",
            "Pennsylvania"
          ]
        }
      ]
    }];
  
  renderComponent({ theme: crukTheme, data: data });

  expect(screen.getByRole('img', { name: /image_1/i })).toBeInTheDocument();
  expect(screen.getByRole('img', { name: /image_2/i })).toBeInTheDocument();
  expect(screen.getAllByText(/Mars Celebration/i )).toHaveLength(2);
  expect(screen.getAllByText(/Mars Universe/i )).toHaveLength(2);
});
