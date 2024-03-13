import { useCreate, Field } from "payload/admin";

export default () => {
  const { create } = useCreate({
    collection: "student",
  });

  return (
    <div>
      <h2>Create New Student</h2>
      <form onSubmit={create}>
        <Field
          type="text"
          name="first_name"
          label="First Name"
          required
        />
        <Field
          type="text"
          name="last_name"
          label="Last Name"
        />
        <Field type="text" name="phone" label="Phone
