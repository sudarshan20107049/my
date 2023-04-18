'use client';
import DropDown from '@/Components/DropDown';
import { useAddDrop, useGetDbUsers } from '@/api/users';
import { Form, Formik } from 'formik';
const Page = () => {
  const { data, isLoading } = useGetDbUsers();
  const { mutate } = useAddDrop();
  if (isLoading) {
    return <h1>Loading...</h1>;
  }
  const value = data?.map(({ id, name }) => {
    return { key: id, value: name };
  });
  return (
    <div>
      <Formik
        initialValues={[
          {
            drop: []
          }
        ]}
        onSubmit={(values, { resetForm }) => {
          const data = values.drop;
          mutate({ id: new Date(), data });
          resetForm();
        }}
      >
        {() => {
          return (
            <div className="mt-2 ml-5">
              <Form>
                <DropDown name="drop" options={value} />
                <button
                  type="submit"
                  className="w-20 bg-black py-1 px-1 text-white rounded-md hover:bg-yellow-400 active:bg-green-400 "
                >
                  Submit
                </button>
              </Form>
            </div>
          );
        }}
      </Formik>
    </div>
  );
};

export default Page;
