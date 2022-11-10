import React, { Fragment, useState } from 'react';
import Select from 'react-select';
import { phaseStatusApiRequest } from '../../api/api-requests';
import Modal from '../../UI/Modal';
import EngineerForm from '../EngineerForm';
import { useNavigate } from 'react-router-dom';

const PhaseList = (props) => {
  const navigate = useNavigate();

  const [modalShow, setModalShow] = useState(false);
  const [phaseId, setPhaseId] = useState(null);

  const statuslists = [
    { value: '0', label: 'not_completed' },
    { value: '1', label: 'completed' },
  ];

  const reshapePhaseStatus = (status) => {
    let obj = statuslists.find((o) => o.label === status);
    return obj;
  };

  const updatePhaseStatus = (e, phaseId) => {
    phaseStatusApiRequest(phaseId, parseInt(e.value));
  };

  const addEngieersForm = (id) => {
    setModalShow(true);
    setPhaseId(id);
  };

  return (
    <Fragment>
      {props.phaselist.length === 0 ? (
        <p className="text-center my-5 font-medium text-2xl">
          Right Now., There are no Phase for this
        </p>
      ) : (
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
                <th scope="col" colSpan={3} className="py-3 px-6">
                  Actions
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
                  <td className="py-4 px-6">
                    <Select
                      options={statuslists}
                      defaultValue={reshapePhaseStatus(phase.status)}
                      onChange={(e) => updatePhaseStatus(e, phase.id)}
                    />
                  </td>
                  <td className="py-4 px-6">
                    {phase.created_at.substring(0, 10)}
                  </td>
                  <td className="py-4 px-6">
                    <button
                      onClick={() => props.showManagerDetails(phase)}
                      className="border-2 border-blue-600 py-1 px-3 rounded-xl ease-in-out duration-200 hover:text-white hover:bg-blue-600"
                    >
                      Manager
                    </button>
                  </td>
                  <td className="py-4 px-6">
                    <button
                      onClick={() => addEngieersForm(phase.id)}
                      className="border-2 border-zinc-600 py-1 px-3 rounded-xl ease-in-out duration-200 hover:text-white hover:bg-zinc-600"
                    >
                      Add Engineers
                    </button>
                  </td>
                  <td className="py-4 px-6">
                    <button
                      onClick={() => navigate(`${phase.id}/engineers`)}
                      className="border-2 border-blue-600 py-1 px-3 rounded-xl ease-in-out duration-200 hover:text-white hover:bg-blue-600"
                    >
                      Phase Engineers
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {modalShow && (
        <Modal onhideDetails={() => setModalShow(false)}>
          <EngineerForm hideModal={setModalShow} phaseid={phaseId} />
        </Modal>
      )}
    </Fragment>
  );
};

export default PhaseList;
