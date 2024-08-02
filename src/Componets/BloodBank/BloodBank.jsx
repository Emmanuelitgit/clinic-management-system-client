import React from 'react';
import { useState, useEffect } from 'react';
import { MDBDataTable } from 'mdbreact';
import { Folder, Delete, Update, Add } from '@mui/icons-material';
import Button from '../Buttons/Button';
import { tableData } from '../../utils/Data';
import ManageBloodBank from './ManageBloodBank';
import AddBloodBank from './AddBloodBank';
import { useDispatch, useSelector } from 'react-redux';


const BloodBank = () => {

  const role = localStorage.getItem("role").toLowerCase();
  const [data, setData] = useState({ columns: [], rows: [] });
  const dep = useSelector(state => state.count?.depValue) || [2];

  useEffect(() => {
      const fetchData = async () => {
          try {
              const response = await fetch('http://localhost:5000/blood_bank_list', {
                method: 'GET',
                credentials: 'include', // Important for including cookies
            });
              if (!response.ok) {
                  throw new Error('Failed to fetch data');
              }
              const fetchedData = await response.json();

              const columns = [
                { label: 'ID', field: 'id', sort: 'asc',  },
                { label: 'Blood Group', field: 'group', sort: 'asc' },
                { label: 'Status', field: 'status', sort: 'asc' },
              ];
              if (role === "doctor") {
                  columns.push({ label: 'Actions', field: 'actions', sort: 'disabled' });
              }else if (role === "laboratorist") {
                columns.push({ label: 'Actions', field: 'actions', sort: 'disabled' });
            }else if (role === "nurse") {
                columns.push({ label: 'Actions', field: 'actions', sort: 'disabled' });
            }

              const transformedData = {
                  columns: columns,
                  rows: fetchedData.map(item => ({
                      id: item.blood_bank_id,
                      group: item.blood_group,
                      status: item.status,
                      actions: (
                          <ManageBloodBank
                            name={"Blood Bank"}
                            id={item.blood_bank_id}
                            blood_group={item.blood_group}
                            status={item.status}
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
                  <AddBloodBank/>
              </div>
          }
          {role === "laboratorist"  &&
              <div className='add-btn-container'>
                  <AddBloodBank/>
              </div>
          }
          <MDBDataTable
              striped
              bordered
              searchLabel='Search blood group...'
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

export default BloodBank;
