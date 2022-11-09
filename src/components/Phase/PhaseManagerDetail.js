import React, { Fragment } from 'react';

const PhaseManagerDetail = (props) => {
  return (
    <Fragment>
      <p>
        <strong>Manager ID: </strong>
        {props.phaseManager.id}
      </p>
      <p>
        <strong>Manager Eamil: </strong>
        {props.phaseManager.email}
      </p>
    </Fragment>
  );
};

export default PhaseManagerDetail;
