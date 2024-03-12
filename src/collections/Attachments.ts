import { CollectionConfig } from "payload/types";

const Attachments: CollectionConfig = {
  slug: "attachments",
  admin: {
    useAsTitle: "name",
  },
  upload: {
    staticURL: "/media",
    staticDir: "media",
    mimeTypes: ["image/*", "application/pdf"],
  },
  fields: [
    {
      name: "name",
      type: "text",
      required: true,
      minLength: 1,
      maxLength: 100,
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
    // {
    //   name: "file",
    //   type: "upload",
    //   required: true,
    //   relationTo: "media",
    //   filterOptions: {
    //     mimeType: { contains: ["image", "application/pdf"] },
    //   },
    //   hooks: {
    //     beforeChange: [
    //       ({ value, operation }) => {
    //         if (operation === "create" || operation === "update") {
    //           value = value.toString().trim();
    //         }
    //         return value;
    //       },
    //     ],
    //   },
    // },
  ],
  timestamps: true,
};

export default Attachments;
