import * as React from 'react';
import { Link, RouteComponentProps } from 'react-router-dom';

import Title from './Title';

const MemberRegistration = ({ history }: Props) => {
  return (
    <div>
      <a onClick={history.goBack}>Previous Page</a>
      <Title label="MemberRegistration" />
    </div>
  );
};
export default MemberRegistration;