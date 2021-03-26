import React from 'react';

import { Select } from '@cruk/cruk-react-components';
export const ReactSelect = (props) => {

    const handleChange = event => {
      // this is going to call setFieldValue and manually update values.topcis
      props.onChange(props.name, event.target.value);
    };
  
    const handleBlur = () => {
      // this is going to call setFieldTouched and manually update touched.topcis
      props.onBlur(props.name, true);
    };
  
      return (
        <div style={{ margin: '1rem 0' }}>
          <label htmlFor="color">{props.label} </label>
          <Select
            id={props.name}
            onChange={handleChange}
            onBlur={handleBlur}
            value={props.value}
            hasError={props.error && props.touched}
            errorMessage={props.error}
          >
              {props?.options?.map(option => {
                  return <option value={option.value} key={option.value}>{option.label}</option>
              })}
          </Select>
          {!!props.error &&
            props.touched && (
              <div style={{ color: 'red', marginTop: '.5rem' }}>{props.error}</div>
            )}
        </div>
      );
  }