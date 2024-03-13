import { CollectionConfig } from "payload/types";
import bcrypt from 'bcrypt';

const Students: CollectionConfig = {
  slug: "student",
  admin: {
    useAsTitle: "first_name",
  },
  access: {
    read: () => true,
    create: () => true,
    update: () => false,
    delete: () => false,
  },
  fields: [
    {
      name: "first_name",
      type: "text",
      required: true,
      minLength: 1,
      maxLength: 20,
      hooks: {
        beforeChange: [
          ({ value, operation }) => {
            if (operation === "create" || operation === "update") {
              value = value.toString().trim();
            }
            return value;
          },
        ],
      },
    },
    {
      name: "last_name",
      type: "text",
      required: false,
      maxLength: 20,
      hooks: {
        beforeChange: [
          ({ value, operation }) => {
            if (operation === "create" || operation === "update") {
              value = value?.toString().trim();
            }
            return value;
          },
        ],
      },
    },
    {
      name: "full_name",
      type: "text",
      hidden: true,
      hooks: {
        afterRead: [
          ({ data }) => {
            if(data){
            return `${data.first_name} ${data.last_name || ""}`;
           }
           },
        ],
      },
    },
    {
      name: "phone",
      type: "text",
      validate: async (value, { operation }) => {
        if (operation !== "create" && operation !== "update" && !value)
          return true;

        var regex = /\b(?:\+?91|0)?[ -]?[6789]\d{9}\b/;
        // ensures data is not stored in DB
        if (regex.test(value)) {
          return true;
        }
        return "phone number is not indian format";
      },
      hooks: {
        beforeChange: [
          ({ value }) => {
            value = value?.toString().trim();
          },
        ],
      },
    },
    {
      name: "email",
      type: "email",
      required: true,
      unique: true, // Ensure emails are unique
      hooks: {
        beforeChange: [
          ({ value, operation }) => {
            if (operation === "create" || operation === "update") {
              value = value ? value.toString().trim() : "";
            }
            return value;
          },
        ],
      },
    },
    {
      name: "password",
      type: "text",
      required: true,
      minLength: 6,
      hooks: {
        beforeChange: [
          async ({ value }) => {
            if (value) {
              const hashedPassword = await bcrypt.hash(value, 10);
              return hashedPassword;
            }
            return value;
          },
        ],
      },
    },
    {
      name: "dob",
      type: "date",
      hooks: {
        beforeChange: [
          ({ value, operation }) => {
            if (operation === "create" || operation === "update") {
              value = value?.toString().trim();
            }
            return value;
          },
        ],
      },
    },
    {
      name: "age",
      type: "number",
      hidden: true,
      hooks: {
        afterRead: [
          ({ data }) => {
            let now = new Date();
            let dob = new Date(data?.dob);
            let age: number = now.getFullYear() - dob.getFullYear();

            // Adjust age if birthday hasn't occurred yet this year
            let monthDiff = now.getMonth() - dob.getMonth();
            if (
              monthDiff < 0 ||
              (monthDiff === 0 && now.getDate() < dob.getDate())
            ) {
              age--;
            }
            return age;
          },
        ],
      },
    },
    {
      name: "gender",
      type: "select",
      options: [
        { label: "Male", value: "male" },
        { label: "Female", value: "female" },
        { label: "Other", value: "other" },
      ],
      required: true,
    },
  ],
  hooks: {
    afterChange: [
      async ({ operation,doc }) => {
        if (operation === 'create') {
          // Here you can implement further logic after creating a student
          console.log('New student created:', doc);
        }
      },
    ],
  },
  timestamps: true,
};

export default Students;
