import { Divider, Box } from '@cruk/cruk-react-components';
import styled from "styled-components";
import { Player } from './Player';

const Title = styled.div`
    display: "inline";
    font-weight: 600;
`;

const Description = styled.div`
   padding-top: 10px;
   max-height: 150px;
   overflow: auto;
`;

const Image = styled.div` 
  float: left;
  padding-right: 20px;
  `;

const PaperBox = styled(Box)`
:after {
    content: "";
    display: table;
    clear: both;
  }
`;

export const Results = (props) => {

  const { data } = props;
  return (
    <Box >
      {data?.slice(0, 10).map((r) => {
        const row = r?.data?.[0];
        return (
          <div key={row.nasa_id}>
            <PaperBox margin="none" backgroundColor="backgroundMid" >
              <Image>
                <Player media={row.media_type} nasa_id={row.nasa_id} />
              </Image>
              <Title>{"Title - "}{row?.title}</Title>
              <Description>{row?.description}</Description>
            </PaperBox>
            <Divider />
          </div>
        );
      })}
    </Box>
  )
}