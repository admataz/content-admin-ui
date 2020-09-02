import React from "react";

import { action } from "@storybook/addon-actions";
import withFormik from "storybook-formik";

import ContentItemField from ".";

const basicField = {
  name: "title",
  label: "Title",
  dbType: "text",
  inputType: "textfield",
  nullable: true,
  schemaType: {
    $schema: "http://json-schema.org/draft-07/schema#",
    type: "string",
  },
};

export default {
  title: "ContentItem/Field",
  component: ContentItemField,
  decorators: [withFormik],
};

export const TextField = () => (
  <ContentItemField
    contentField={basicField}
  />
);
export const Multiline = () => (
  <ContentItemField
    name="texBody"
    label="Text body"
    contentField={{ ...basicField, inputType: "textarea" }}
  />
);
export const InputError = () => (
  <ContentItemField
    name="textInput"
    label="Text Input"
    contentField={basicField}
    error
  />
);

export const Required = () => (
  <ContentItemField
    name="textInput"
    label="Text Input"
    contentField={{ ...basicField, nullable: false }}
  />
);
export const ValidateInput = () => (
  <ContentItemField
    name="textInput"
    label="Text Input"
    contentField={{
      ...basicField,
      schemaType: {
        $schema: "http://json-schema.org/draft-07/schema#",
        type: "string",
        pattern: "^([a-zA-Z0-9-_]+)$",
      },
    }}
  />
);
