'use client';

import { useAddUser, useDeleteDbUser, useGetDbUsers } from '@/api/users';
import { useField, Form, Formik } from 'formik';
const MyTextField = ({ label, ...props }) => {
  const [field, meta, helpers] = useField(props);
  return (
    <>
      <label>
        {label}
        <input
          {...field}
          {...props}
          className="mt-2 border rounded-sm pl-5 bg-slate-50"
        />
      </label>
      {meta.touched && meta.error ? (
        <div className="error">{meta.error}</div>
      ) : null}
    </>
  );
};
const Page = () => {
  const { mutate, isLoading, isError } = useAddUser();
  const initialValues = {
    id: '',
    name: '',
    email: ''
  };
  return (
    <div className="ml-10 mt-5 ">
      <h1 className="text-xl font-semibold text-green-300">Users Form</h1>
      <Formik
        initialValues={initialValues}
        onSubmit={(values, { resetForm }) => {
          mutate(values);
          console.log(values);
          resetForm();
        }}
      >
        {formik => {
          return (
            <Form>
              <div className="flex flex-col">
                <MyTextField type="number" name="id" placeholder="Enter id" />
                <MyTextField
                  type="text"
                  name="name"
                  placeholder="Enter your name"
                />
                <MyTextField
                  type="email"
                  name="email"
                  placeholder="Enter your email"
                />

                <button
                  type="submit"
                  className=" w-[100px] px-1 py-1 mt-2 rounded-md bg-black text-white"
                >
                  {isLoading ? 'Loading...' : 'Submit'}
                </button>
                {isError ? 'Something went Wrong' : ''}
              </div>
            </Form>
          );
        }}
      </Formik>
      <div className="mt-5 w-[500px] bg-slate-300 rounded-md pl-10  ">
        <DbUsers />
      </div>
    </div>
  );
};

const DbUsers = () => {
  const { data, isLoading } = useGetDbUsers();
  const { mutate } = useDeleteDbUser();
  if (isLoading) {
    return <h1>Loading...</h1>;
  }
  return (
    <div>
      {data?.map(data => (
        <div key={data.id} className="flex flex-row justify-around mt-3">
          <div className="self-center w-28">{data.name}</div>
          <div className="self-center w-44">{data.email}</div>
          <div className="self-center w-28">
            <button
              onClick={() => mutate(data.id)}
              className="px-1 py-1 w-20 rounded-md text-white bg-red-500"
            >
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Page;
