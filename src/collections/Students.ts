import { CollectionConfig } from "payload/types";
import type { FieldHook } from "payload/types";

const Students: CollectionConfig = {
  slug: "student",
  admin: {
    useAsTitle: "first_name",
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
        beforeChange: [
          ({ siblingData }) => {
            delete siblingData.age;
          },
        ],

        afterRead: [
          ({ data }) => {
            let now = new Date();
            let dob = new Date(data.dob);
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
  ],
  timestamps: true,
};

export default Students;
