import { CollectionConfig } from "payload/types";
import { createDocument } from "payload";

const Faculties: CollectionConfig = {
  slug: "faculty", // Corrected slug spelling from "facutly" to "faculty"
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
            return data.last_name
              ? `${data.first_name} ${data.last_name}`
              : data.first_name;
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
            throw new Error("Phone number is not in Indian format");
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
      name: "qualifications", // New field for faculty qualifications
      type: "text",
      required: true,
    },
    {
      name: "department", // New field for faculty department
      type: "text",
      required: true,
    },
  ],
  timestamps: true,
  hooks: {
    afterChange: [
      async ({ doc }) => {
        await createDocument({
          collection: "faculty", // Corrected collection name
          data: doc,
        });
      },
    ],
  },
};

export default Faculties;
