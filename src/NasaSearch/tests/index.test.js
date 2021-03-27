import { NasaSearch } from '../index';
import { crukTheme } from '@cruk/cruk-react-components';
import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import { ThemeProvider } from 'styled-components';
import { rest } from 'msw';
import { setupServer } from 'msw/node';

const renderComponent = ({ theme }) =>
  render(
    <ThemeProvider theme={theme}>
      <NasaSearch />
    </ThemeProvider>
  );

const server = setupServer(
  rest.get('https://images-api.nasa.gov/search', (req, res, ctx) => {
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
          "description": "The Mars Image Friday, May 31, 2019, in Mars, Pennsylvania. NASA is in the small town to celebrate Mars exploration and share the agency’s excitement about landing astronauts on the Moon in five years. The celebration includes a weekend of Science, Technology, Engineering, Arts and Mathematics (STEAM) activities. Photo Credit: (NASA/Bill Ingalls)",
          "title": "Mars Image",
          "photographer": "NASA/Bill Ingalls",
          "center": "HQ",
          "date_created": "2019-05-31T00:00:00Z",
          "media_type": "image",
          "keywords": [
            "Mars",
            "Mars Image",
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
          "nasa_id": `video`,
          "description": "The Mars Video Friday, May 31, 2019, in Mars, Pennsylvania. NASA is in the small town to celebrate Mars exploration and share the agency’s excitement about landing astronauts on the Moon in five years. The celebration includes a weekend of Science, Technology, Engineering, Arts and Mathematics (STEAM) activities. Photo Credit: (NASA/Bill Ingalls)",
          "title": "Mars Video",
          "photographer": "NASA/Bill Ingalls",
          "center": "HQ",
          "date_created": "2019-05-31T00:00:00Z",
          "media_type": "video",
          "keywords": [
            "Mars",
            "Mars Video",
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
          "nasa_id": `audio`,
          "description": "The Mars Audio Friday, May 31, 2019, in Mars, Pennsylvania. NASA is in the small town to celebrate Mars exploration and share the agency’s excitement about landing astronauts on the Moon in five years. The celebration includes a weekend of Science, Technology, Engineering, Arts and Mathematics (STEAM) activities. Photo Credit: (NASA/Bill Ingalls)",
          "title": "Mars Audio",
          "photographer": "NASA/Bill Ingalls",
          "center": "HQ",
          "date_created": "2019-05-31T00:00:00Z",
          "media_type": "audio",
          "keywords": [
            "Mars",
            "Mars Audio",
            "Pennsylvania"
          ]
        }
      ]
    }];
    const result = {
      collection: {
        items: data
      }
    }
    return res(ctx.json(result))
  })
)

beforeAll(() => server.listen())
afterEach(() => server.resetHandlers())
afterAll(() => server.close())


test('check whether results are getting rendered with year start', async () => {

  renderComponent({ theme: crukTheme });

  const keywords = screen.getByRole('textbox', { name: /Keywords/i });
  const mediaType = screen.getByRole('combobox', { name: /Media Type/i });
  const yearStart = screen.getByRole('spinbutton', { name: /Year Start/i });
  const submit = screen.getByRole('button', { name: /Submit/i });


  await waitFor(() => fireEvent.change(keywords, { target: { value: 'Mars' } }));
  await waitFor(() => fireEvent.change(mediaType, { target: { value: 'audio' } }));
  await waitFor(() => fireEvent.change(yearStart, { target: { value: '2015' } }));

  await waitFor(() =>fireEvent.click(submit));

  await waitFor(() => screen.getAllByRole('img'));

  expect(screen.getByRole('img', { name: /image_1/i })).toBeInTheDocument();
  expect(screen.getAllByText(/Mars Image/i )).toHaveLength(2);
  expect(screen.getAllByText(/Mars Video/i )).toHaveLength(2);
  expect(screen.getAllByText(/Mars Audio/i )).toHaveLength(2);
});

test('check whether results are getting rendered with out year start', async () => {

  renderComponent({ theme: crukTheme });

  const keywords = screen.getByRole('textbox', { name: /Keywords/i });
  const mediaType = screen.getByRole('combobox', { name: /Media Type/i });
  const yearStart = screen.getByRole('spinbutton', { name: /Year Start/i });
  const submit = screen.getByRole('button', { name: /Submit/i });


  await waitFor(() => fireEvent.change(keywords, { target: { value: 'Mars' } }));
  await waitFor(() => fireEvent.change(mediaType, { target: { value: 'audio' } }));
  await waitFor(() => fireEvent.change(yearStart, { target: { value: '' } }));

  await waitFor(() =>fireEvent.click(submit));

  await waitFor(() => screen.getAllByRole('img'));

  expect(screen.getByRole('img', { name: /image_1/i })).toBeInTheDocument();
  expect(screen.getAllByText(/Mars Image/i )).toHaveLength(2);
  expect(screen.getAllByText(/Mars Video/i )).toHaveLength(2);
  expect(screen.getAllByText(/Mars Audio/i )).toHaveLength(2);
});

test('handles server error', async () => {
  server.use(
    rest.get('https://images-api.nasa.gov/search', (req, res, ctx) => {
      return res(ctx.status(500))
    })
  )

  renderComponent({ theme: crukTheme });

  const keywords = screen.getByRole('textbox', { name: /Keywords/i });
  const mediaType = screen.getByRole('combobox', { name: /Media Type/i });
  const yearStart = screen.getByRole('spinbutton', { name: /Year Start/i });
  const submit = screen.getByRole('button', { name: /Submit/i });


  await waitFor(() => fireEvent.change(keywords, { target: { value: 'Mars' } }));
  await waitFor(() => fireEvent.change(mediaType, { target: { value: 'audio' } }));
  await waitFor(() => fireEvent.change(yearStart, { target: { value: '2015' } }));

  await waitFor(() =>fireEvent.click(submit));

  await waitFor(() => screen.getByText('An unexpected error occured. Please try again after sometime'))

  expect(screen.getByText('An unexpected error occured. Please try again after sometime')).toBeInTheDocument();
})