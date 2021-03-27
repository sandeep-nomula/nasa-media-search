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
        <div>
          <h1>CRUK technical exercise - React</h1>
        </div>
        <Box>
          <NasaSearch />
        </Box>
      </SiteWrapper>
    </ThemeProvider>
  );
}

export default App;
