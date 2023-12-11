import { Form } from '@sitecore-jss/sitecore-jss-react-forms';
import React from 'react';
import { withRouter, NextRouter } from 'next/router';
import { sitecoreApiKey } from '../temp/config';
import CustomFieldFactory from './CustomFieldFactory';

const Forms = ({ fields, router }: { fields: never; router: NextRouter }) => {
  return (
    <div className="apply-now-container" id="apply-now-container">
      <div className="container">
        <Form
          form={fields}
          sitecoreApiHost={' '}
          sitecoreApiKey={sitecoreApiKey}
          onRedirect={(url) => router.push(url)}
          fieldFactory={CustomFieldFactory}
        />
      </div>
    </div>
  );
};

export default withRouter(Forms);
