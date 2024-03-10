import { CollectionConfig } from "payload/types";
import type { FieldHook } from "payload/types";

const Centers: CollectionConfig = {
  slug: "centers",
  admin: {
    useAsTitle: "full_name",
  },
  fields: [
    {
      name: "location",
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
      name: "map_location",
      type: "text",
      required: true,
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
      name: "inaugurated_at",
      type: "text",
      required: true,
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
  ],
  timestamps: true,
};

export default Centers;
