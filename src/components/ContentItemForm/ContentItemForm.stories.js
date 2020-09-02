import React from 'react';

import { action } from '@storybook/addon-actions';
import withFormik from 'storybook-formik';

import ContentItemForm from '.'
import models from '../../test/fixtures/models-info.json'

export default {
  title: 'ContentItem/Form',
  component: ContentItemForm,
  decorators: [withFormik]
};

export const EmptyForm = () => <ContentItemForm model={models[1]} />;

