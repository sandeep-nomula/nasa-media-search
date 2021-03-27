import * as yup from "yup";
import { Field, Form, Formik } from "formik";
import { Button, TextField, Select } from "@cruk/cruk-react-components";
import styled from "styled-components";

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

const options = [
  { value: 'audio', label: 'Audio' },
  { value: 'video', label: 'Video' },
  { value: 'image', label: 'Image' },
];

const date = new Date()
const maxYear = date.getFullYear();

export const SearchForm = (props) => {

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

  const getError = (errors, touched, key) => {
    if (errors[key] && touched[key]) {
      return errors[key];
    }
    return "";
  }

  const { onSubmit, isSubmitting } = props;

  return (
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
        onSubmit(values)
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
  )
}