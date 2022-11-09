import React, { Fragment } from 'react';
import { useNavigate } from 'react-router-dom';

const PhaseList = (props) => {
  return (
    <Fragment>
      <div className="overflow-x-auto relative shadow-md sm:rounded-lg mt-10">
        <table>
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="py-3 px-6">
                Sr No.
              </th>
              <th scope="col" className="py-3 px-6">
                Start Date
              </th>
              <th scope="col" className="py-3 px-6">
                End Date
              </th>
              <th scope="col" className="py-3 px-6">
                Status
              </th>
              <th scope="col" className="py-3 px-6">
                Created At
              </th>
              <th scope="col" className="py-3 px-6">
                Manager Details
              </th>
            </tr>
          </thead>
          <tbody>
            {props.phaselist?.map((phase) => (
              <tr
                key={phase.id + phase}
                className="bg-white border-b dark:bg-gray-900 dark:border-gray-700"
              >
                <th className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                  {phase.id}
                </th>
                <td className="py-4 px-6">{phase.start_date}</td>
                <td className="py-4 px-6">{phase.end_date}</td>
                <td className="py-4 px-6">{phase.status}</td>
                <td className="py-4 px-6">
                  {phase.created_at.substring(0, 10)}
                </td>
                <td className="py-4 px-6">
                  <button
                    onClick={() => props.showManagerDetails(phase)}
                    className="border-2 border-blue-600 py-1 px-3 rounded-xl ease-in-out duration-200 hover:text-white hover:bg-blue-600"
                  >
                    Details
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Fragment>
  );
};

export default PhaseList;
