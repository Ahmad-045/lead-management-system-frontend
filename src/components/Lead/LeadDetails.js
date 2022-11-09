import React from 'react';

const LeadDetails = (props) => {
  const keys = Object.keys(props.singleleadData);
  const filteredKeys = keys.filter((key) => key !== 'user');

  return (
    <div className="grid grid-cols-2 gap-4">
      <div>
        {props.singleleadData &&
          filteredKeys.map((key) => (
            <p key={key}>
              <strong>{key}:</strong> {`${props.singleleadData[key]}`}{' '}
            </p>
          ))}
      </div>
      <div>
        <p>
          <strong>Created By: </strong>
          {props.singleleadData.user.email}
        </p>
      </div>
    </div>
  );
};

export default LeadDetails;
