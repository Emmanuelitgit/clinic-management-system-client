import React from 'react';
import { useState, useEffect } from 'react';
import { MDBDataTable } from 'mdbreact';
import AddVital from './AddVital';
import ManageVital from './ManageVital';
import { useDispatch, useSelector } from 'react-redux';


const VitalList = () => {

  const role = localStorage.getItem("role").toLowerCase();
  const [data, setData] = useState({ columns: [], rows: [] });

  const dep = useSelector(state => state.count?.depValue) || [2];

  useEffect(() => {
      const fetchData = async () => {
          try {
              const response = await fetch('http://localhost:5000/vitals', {
                method: 'GET',
                credentials: 'include', // Important for including cookies
            });
              if (!response.ok) {
                  throw new Error('Failed to fetch data');
              }
              const fetchedData = await response.json();

              const columns = [
                  { label: 'ID', field: 'id', sort: 'asc' },
                  { label: 'Patient Name', field: 'patient', sort: 'asc' },
                  { label: 'Nurse Name', field: 'nurse', sort: 'asc' },
                  { label: 'BP Level', field: 'bp_level', sort: 'asc' },
                  { label: 'Temperature', field: 'temperature', sort: 'asc' },
                  { label: 'Height', field: 'height', sort: 'asc' },
                  { label: 'Age', field: 'age', sort: 'asc' },
              ];
              if (role === "nurse") {
                  columns.push({ label: 'Actions', field: 'actions', sort: 'disabled' });
              }

              const transformedData = {
                  columns: columns,
                  rows: fetchedData.map(item => ({
                      id: item.vital_id,
                      patient: item.patient_name,
                      nurse: item.nurse_name,
                      bp_level: item.bp_level,
                      temperature: item.temperature,
                      height: item.height,
                      age: item.patient_age,

                      actions: (
                          <ManageVital
                            name={"Vitals"}
                            id={item.vital_id}
                            patient_id={item.patient_id}
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

           {role === "nurse"  &&
              <div className='add-btn-container'>
                  <AddVital/>
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

export default VitalList;