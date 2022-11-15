import React from 'react';
import { LEAD_DETAILS_MAPPING } from '../../data/data-mapping';

const LeadDetails = (props) => {
  const keys = Object.keys(props.singleleadData);
  const filteredKeys = keys.filter((key) => key !== 'user');

  return (
    <div className="grid grid-cols-1 gap-4">
      <p>
        <strong>Created By: </strong>
        {props.singleleadData.user.email}
      </p>
      <div className="overflow-x-auto relative">
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
          <tbody>
            {props.singleleadData &&
              filteredKeys.map((key, index) => (
                <tr
                  key={key + index}
                  className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                >
                  <th
                    scope="row"
                    className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                  >
                    {LEAD_DETAILS_MAPPING[key]}
                  </th>
                  <td className="py-4 px-6">
                    {`${props.singleleadData[key]}`}{' '}
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default LeadDetails;
