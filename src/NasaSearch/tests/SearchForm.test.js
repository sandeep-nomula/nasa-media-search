import { crukTheme } from '@cruk/cruk-react-components';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { ThemeProvider } from 'styled-components';
import { SearchForm } from '../SearchForm';


const renderComponent = ({ theme, onSubmit, isSubmitting }) =>
  render(
    <ThemeProvider theme={theme}>
      <SearchForm onSubmit={onSubmit} isSubmitting={isSubmitting}/>
    </ThemeProvider>
  );

test('renders Search Components ', () => {
  renderComponent({ theme: crukTheme });
  const keywords = screen.getByRole('textbox', { name: /Keywords/i });
  const mediaType = screen.getByRole('combobox', { name: /Media Type/i });
  const yearStart = screen.getByRole('spinbutton', { name: /Year Start/i });
  const submit = screen.getByRole('button', { name: /Submit/i });

  expect(keywords).toBeInTheDocument();
  expect(mediaType).toBeInTheDocument();
  expect(yearStart).toBeInTheDocument();
  expect(submit).toBeInTheDocument();
});

test('validate Search Components ', async () => {
  renderComponent({ theme: crukTheme });
  const keywords = screen.getByRole('textbox', { name: /Keywords/i });
  const mediaType = screen.getByRole('combobox', { name: /Media Type/i });
  const yearStart = screen.getByRole('spinbutton', { name: /Year Start/i });
  const submit = screen.getByRole('button', { name: /Submit/i });

  fireEvent.click(submit);
  await waitFor(() => {
    const errors = screen.getAllByRole('alert');
    expect(errors[0]).toHaveTextContent("Please enter keywords to search.");
    expect(errors[1]).toHaveTextContent("Please select a media type.");
  });

  await waitFor(() =>
    fireEvent.change(keywords, { target: { value: 'a' } })
  );
  await waitFor(() => {
    const errors = screen.getAllByRole('alert');
    expect(errors[0]).toHaveTextContent("Keywords must be between 2 and 50 characters.");
  });

  await waitFor(() => fireEvent.change(keywords,
    { target: { value: 'I am sandeep, just checking whether the length greater than 2 is triggering the validation' } }));
  await waitFor(() => {
    const errors = screen.getAllByRole('alert');
    expect(errors[0]).toHaveTextContent("Keywords must be between 2 and 50 characters.");
  });

  await waitFor(() => fireEvent.change(keywords, { target: { value: 'Mars' } }));
  await waitFor(() => fireEvent.change(yearStart, { target: { value: '-1' } }));
  await waitFor(() => fireEvent.change(mediaType, { target: { value: 'audio' } }));

  await waitFor(() => {
    const errors = screen.getAllByRole('alert');
    expect(errors[0]).toHaveTextContent("Please enter a valid year.");
  });

  await waitFor(() => fireEvent.change(yearStart, { target: { value: '2025' } }));

  await waitFor(() => {
    const errors = screen.getAllByRole('alert');
    expect(errors[0]).toHaveTextContent("Year must not be in the future");
  });

});

test('On submitting without errors ', async () => {

  const handleSubmit = jest.fn()
  renderComponent({ theme: crukTheme, onSubmit: handleSubmit });
  const keywords = screen.getByRole('textbox', { name: /Keywords/i });
  const mediaType = screen.getByRole('combobox', { name: /Media Type/i });
  const yearStart = screen.getByRole('spinbutton', { name: /Year Start/i });
  const submit = screen.getByRole('button', { name: /Submit/i });


  await waitFor(() => fireEvent.change(keywords, { target: { value: 'Mars' } }));
  await waitFor(() => fireEvent.change(mediaType, { target: { value: 'audio' } }));
  await waitFor(() => fireEvent.change(yearStart, { target: { value: '2015' } }));

  fireEvent.click(submit);

  await waitFor(() =>
  expect(handleSubmit).toHaveBeenCalledWith({
    keywords: 'Mars',
    mediaType: 'audio',
    yearStart: 2015,
  })
  );
  renderComponent({ theme: crukTheme, isSubmitting: true });
  const submitting = screen.getByRole('button',{ name: /Submitting../i });
  expect(submitting).toBeInTheDocument();
  expect(submitting).toHaveAttribute('disabled');
});





