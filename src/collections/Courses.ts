import { CollectionConfig } from "payload/types";

const Courses: CollectionConfig = {
  slug: "courses",
  admin: {
    useAsTitle: "name",
  },
  fields: [
    {
      name: "name",
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
      name: "price",
      type: "number",
      required: true,
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
  ],
  timestamps: true,
};

export default Courses;
