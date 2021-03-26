import * as yup from "yup";
import styled from "styled-components";
import { Field, Form, Formik } from "formik";
import { Button, TextField, Select, Divider, Loader } from "@cruk/cruk-react-components";
import axios from 'axios';
import { useState } from "react";
import { NasaResults } from './NasaResults';


const Row = styled.div`
:after {
  content: "";
  display: table;
  clear: both;
}
`;

const Column = styled.div` 
float: left;
width: auto;
padding-right: 70px;
padding-top:${props => props.paddingTop}
`;

const url = "https://images-api.nasa.gov/search"
const options = [
  { value: 'audio', label: 'Audio' },
  { value: 'video', label: 'Video' },
  { value: 'image', label: 'Image' },
];

const date = new Date()
const maxYear = date.getFullYear();

export const NasaSearch = () => {

  const [data, setData] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const formSchema = yup.object().shape({
    keywords: yup.string()
      .required("Please enter keywords to search.")
      .min(2, "Keywords must be between 2 and 50 characters.")
      .max(20, "Keywords must be between 2 and 50 characters."),

    mediaType: yup.string()
      .required("Please select a media type."),

    yearStart: yup.number()
      .positive("Please enter a valid year.")
      .integer("Please enter a valid year.")
      .max(maxYear, "Year must not be in the future.")
  });

  const searchNasa = (values) => {
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
        console.log(e);
        setIsSubmitting(false);
      })
  }

  const getError = (errors, touched, key) => {
    if (errors[key] && touched[key]) {
      return errors[key];
    }
    return "";
  }
  return (
    <><div>
      <h1>CRUK technical exercise - React</h1>
    </div>
      <div>
        <Formik
          validateOnChange
          valiidateOnSubmit
          initialValues={{
            keywords: "",
            mediaType: "",
            yearStart: ""
          }}
          validationSchema={formSchema}
          onSubmit={(values) => {
            searchNasa(values)
          }}>
          {({ errors, touched }) => {
            return (
              <Form>
                <Row>
                  <Column>
                    <Field name="keywords">
                      {({ field }) => (
                        <>
                          <TextField
                            label="Keywords"
                            type="text"
                            required
                            {...field}
                            errorMessage={getError(errors, touched, "keywords")}
                          />
                        </>
                      )}
                    </Field>
                  </Column>
                  <Column>
                    <Field name="mediaType">
                      {({ field }) => (
                        <>
                          <Select
                            label="Media Type"
                            type="text"
                            required
                            {...field}
                            errorMessage={getError(errors, touched, "mediaType")}
                          >
                            <option disabled value="">--Please choose an option--</option>
                            {options?.map(option => {
                              return <option value={option.value} key={option.value}>{option.label}</option>
                            })}
                          </Select>
                        </>
                      )}
                    </Field>
                  </Column>
                  <Column>
                    <Field name="yearStart">
                      {({ field }) => (
                        <>
                          <TextField
                            label="Year Start"
                            type="number"
                            {...field}
                            errorMessage={getError(errors, touched, "yearStart")}
                          />
                        </>
                      )}
                    </Field>
                  </Column>
                  <Column paddingTop={"35px"}>
                    <Button disabled={isSubmitting} type="submit">{isSubmitting ? "Submitting.." : "Submit"}</Button>
                  </Column>
                </Row>
              </Form>
            )
          }}
        </Formik>
      </div>
      <Divider />
      {isSubmitting ? <Loader /> : <NasaResults data={data} />}
    </>)
}