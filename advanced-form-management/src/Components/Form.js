import React, {useState, useEffect} from 'react';
import {withFormik, Form, Field} from 'formik';
import * as Yup from "yup";
import axios from "axios";

const OnboardingForm = ({values, errors, touched, status}) => {
// console.log(props) 

  const [users, setUsers] = useState([]);

  useEffect(() => {
    console.log('status has changed', status)
    status && setUsers(users => [...users, status])
  },[status]);


  return(
    <div>

      <Form>
        <label>
        Name: 
          <Field
            id='name'
            name='name'
            type='text'
            placeholder='Name Here'
          />
          {touched.name && errors.name && (
            <p>{errors.name}</p>
          )}
        </label>

        <label>
        E-mail: 
          <Field
            id='email'
            name='email'
            type='email'
            placeholder='Email Here'
          />
          {touched.email && errors.email && (
            <p>{errors.email}</p>
          )}
        </label>

        <label>
        Password: 
          <Field
            id='password'
            name='password'
            type='password'
            placeholder='Email Here'
          />
          {touched.password && errors.password && (
            <p>{errors.password}</p>
          )}
        </label>

        <button type="submit">Submit</button>
        <pre>{JSON.stringify(values, null, 2)}</pre>
      </Form>

      {users.map((user, index) => (
        <ul key={index}>
          <li>Name: {user.name}</li>
          <li>Name: {user.email}</li>
          <li>Name: {user.password}</li>
        </ul>
      ))}

    </div>
  );
}

// Custom Error Message
const errorMessage = `This field is required!`

const FormikOnboardingForm = withFormik({
  mapPropsToValues({name, email, password}){
    return {
      name: name || '',
      email: email || '',
      password: password || ''
    };
  },
  validationSchema: Yup.object().shape({
    name: 
      Yup
      .string()
      .required(errorMessage)
      .min(1)
      .max(25),
    email: 
      Yup.string()
      .required(errorMessage)
      .min(5)
      .max(40),
    password: 
      Yup.string()
      .required(errorMessage)
      .min(10)
      .max(20)
  }),
  handleSubmit(values, { setStatus, status }){
    console.log('submitting', values)
    axios
      .post('https://reqres.in/api/users', values)
      .then(response => {
        console.log('success', response);
        setStatus(response.data);
      })
      .catch(error => console.log(error.response))
  }
})(OnboardingForm);

export default FormikOnboardingForm;

