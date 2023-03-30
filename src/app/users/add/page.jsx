'use client';

import { Formik } from 'formik';

const InputField = ({ field, form, ...props }) => {
  return <input {...field} {...props} />;
};
const page = () => {
  const initialValues = {
    id: '',
    name: '',
    username: '',
    email: '',
    address: ''
  };
  return (
    <div>
      <h1>Users Form</h1>
      <Formik
        initialValues={initialValues}
        onSubmit={values => {
          console.log(values);
        }}
      ></Formik>
    </div>
  );
};

export default page;
