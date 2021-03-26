import styled, { ThemeProvider } from "styled-components";
import { crukTheme, Box } from "@cruk/cruk-react-components";
import { NasaSearch } from "./NasaSearch";


const SiteWrapper = styled.div`
max-width: 1200px;
margin: 0 auto;
padding: 1rem;
`;

function App() {

  return (
    <ThemeProvider theme={crukTheme}>
      <SiteWrapper>
        <Box marginLeft="xl">
          <NasaSearch />
        </Box>
      </SiteWrapper>
    </ThemeProvider>
  );
}

export default App;
