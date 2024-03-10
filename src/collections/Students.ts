import { CollectionConfig } from "payload/types";
import type { FieldHook } from "payload/types";

const Students: CollectionConfig = {
  slug: "student",
  admin: {
    useAsTitle: "full_name",
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
              value = value.toString().trim();
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
        beforeChange: [
          ({ siblingData }) => {
            // ensures data is not stored in DB
            delete siblingData["full_name"];
          },
        ],
        afterRead: [
          ({ data }) => {
            return `${data.first_name} ${data.last_name}`;
          },
        ],
      },
    },
    {
      name: "phone",
      type: "text",
      hooks: {
        beforeChange: [
          ({ value }) => {
            value = value.toString().trim();
            var regex = /\b(?:\+?91|0)?[ -]?[6789]\d{9}\b/;
            // ensures data is not stored in DB
            if (regex.test(value)) {
              return value;
            }
            throw new Error("phone number is not indian format");
          },
        ],
        afterRead: [
          ({ data }) => {
            return data.last_name
              ? `${data.first_name} ${data.last_name}`
              : data.first_name;
          },
        ],
      },
    },
    {
      name: "email",
      type: "email",
      required: true,
      unique: true,
      index: true,
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
      name: "dob",
      type: "date",
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
      name: "age",
      type: "number",
      hooks: {
        beforeChange: [
          ({ siblingData }) => {
            delete siblingData.age;
          },
        ],

        afterRead: [
          ({ data }) => {
            let now = new Date();
            let age: number = now.getFullYear() - data.dob.getFullYear();

            // Adjust age if birthday hasn't occurred yet this year
            let monthDiff = now.getMonth() - data.dob.getMonth();
            if (
              monthDiff < 0 ||
              (monthDiff === 0 && now.getDate() < data.dob.getDate())
            ) {
              age--;
            }
            return age;
          },
        ],
      },
    },
  ],
  timestamps: true,
};

export default Students;
