import * as React from 'react';
import { Link, RouteComponentProps } from 'react-router-dom';

import Title from './Title';

const ForgotPassword = ({ history }: Props) => {
  return (
    <div>
      <a onClick={history.goBack}>Previous Page</a>
      <Title label="ForgotPassword" />
    </div>
  );
};
export default ForgotPassword;