import { Divider, Loader } from "@cruk/cruk-react-components";
import axios from 'axios';
import { useState } from "react";
import { Results } from './Results';
import { SearchForm } from "./SearchForm";
import styled from "styled-components";

const Error = styled.div`
    color: "red";
`;

const url = "https://images-api.nasa.gov/search"

export const NasaSearch = () => {

  const [data, setData] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isError, setIsError] = useState(false);

  const handleSubmit = (values) => {
    setIsError(false);
    setIsSubmitting(true);
    const { keywords, mediaType, yearStart } = values;
    const params = {
      q: keywords,
      media_type: mediaType,
      page: 1
    };
    if (yearStart) {
      params.year_start = yearStart;
    }
    axios.get(url, {
      params
    })
      .then(data => {
        setData(data?.data?.collection?.items);
        setIsSubmitting(false);
      }).catch(e => {
        setIsSubmitting(false);
        setIsError(true);
      })
  }

  if (isError) {
    return(
      <Error>An unexpected error occured. Please try again after sometime</Error>
    )
  }

  return (
    <>
      <SearchForm onSubmit={handleSubmit} isSubmitting={isSubmitting} />
      <Divider />
      {isSubmitting ? <Loader /> : <Results data={data} />}
    </>
  )
}