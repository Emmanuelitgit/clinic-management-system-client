import React from 'react';
import { useState, useEffect } from 'react';
import { MDBDataTable } from 'mdbreact';
import { Folder, Delete, Update, Add } from '@mui/icons-material';
import Button from '../Buttons/Button';
import { tableData } from '../../utils/Data';
import AddReport from './AddReport';
import ManageReport from './ManageReport';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';


const OperationReport = () => {

  const location = useLocation()

  const route = location.pathname.split("/")[2];
  const type = route?.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');

  const role = localStorage.getItem("role").toLowerCase();
  const [data, setData] = useState({ columns: [], rows: [] });
  const dep = useSelector(state => state.count?.depValue) || [2];

  const truncateText = (text, maxLength) => {
    if (text.length > maxLength) {
      return text.slice(0, maxLength) + '......';
    }
    return text;
  };

  const getText = (html) =>{
    const doc = new DOMParser().parseFromString(html, "text/html")
    return doc.body.textContent
 }

  useEffect(() => {
      const fetchData = async () => {
          try {
              const response = await fetch(`http://localhost:5000/reports/${type}`, {
                method: 'GET',
                credentials: 'include', // Important for including cookies
            });
              if (!response.ok) {
                  throw new Error('Failed to fetch data');
              }
              const fetchedData = await response.json();

              const columns = [
                { label: 'ID', field: 'id', sort: 'asc',  },
                { label: 'Description', field: 'desc', sort: 'asc' },
                { label: 'Date', field: 'date', sort: 'asc' },
                { label: 'Patient', field: 'patient', sort: 'asc' },
                { label: 'Doctor', field: 'doctor', sort: 'asc' },
              ];
              if (role === "doctor") {
                  columns.push({ label: 'Actions', field: 'actions', sort: 'disabled' });
              }else if (role === "nurse") {
                columns.push({ label: 'Actions', field: 'actions', sort: 'disabled' });
            }

              const transformedData = {
                  columns: columns,
                  rows: fetchedData.map(item => ({
                    id: item.report_id,
                    desc: truncateText(getText(item.description), 20),
                    date: item.date,
                    patient: item.patient_name,
                    doctor:item.doctor_name,
                      actions: (
                          <ManageReport
                           name={"Operation"}
                           id={item.report_id}
                           patient_id={item.patient_id}
                           patient_name={item.patient_name}
                           doctor_id={item.doctor_id}
                           doctor_name={item.doctor_name}
                           desc={item.description}
                           date={item.date}
                           />
                      )
                  })),
              };

              setData(transformedData);
          } catch (error) {
              console.error('Error fetching data:', error);
          }
      };

      fetchData();
  }, [dep]);

  return (
      <div className='main-border'>
          {role === "doctor"  &&
              <div className='add-btn-container'>
                  <AddReport
                    name={"Operation"}
                  />
              </div>
          }
           {role === "nurse"  &&
              <div className='add-btn-container'>
                  <AddReport
                    name={"Operation"}
                  />
              </div>
          }
          <MDBDataTable
              striped
              bordered
              searchLabel='Search name...'
              className='table-component'
              data={data}
              theadColor='black'
              theadTextWhite
              noBottomColumns
              searching
              displayEntries
              info
          />
      </div>
  );
}

export default OperationReport;