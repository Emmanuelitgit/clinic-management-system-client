import React from 'react';
import { useState, useEffect } from 'react';
import { MDBDataTable } from 'mdbreact';
import { Folder, Delete, Update, Add } from '@mui/icons-material';
import Button from '../Buttons/Button';
import { tableData } from '../../utils/Data';
import AddDonor from './AddDonor';
import ManageDonor from './ManageDonor';
import { useDispatch, useSelector } from 'react-redux';


const BloodDonorList = ({ admin }) => {
    
  const role = localStorage.getItem("role").toLowerCase();
  const [data, setData] = useState({ columns: [], rows: [] });
  const dep = useSelector(state => state.count?.depValue) || [2];


  useEffect(() => {
      const fetchData = async () => {
          try {
              const response = await fetch('http://localhost:5000/blood_donors', {
                method: 'GET',
                credentials: 'include', // Important for including cookies
            });
              if (!response.ok) {
                  throw new Error('Failed to fetch data');
              }
              const fetchedData = await response.json();

              const columns = [
                { label: 'ID', field: 'id', sort: 'asc',  },
                { label: 'Donor Name', field: 'donor', sort: 'asc' },
                { label: 'Age', field: 'age', sort: 'asc' },
                { label: 'Sex', field: 'sex', sort: 'asc' },
                { label: 'Blood Group', field: 'blood_group', sort: 'asc' },
                { label: 'Last Donation Date', field: 'donation_date', sort: 'asc' },
              ];
              if (role === "nurse") {
                  columns.push({ label: 'Actions', field: 'actions', sort: 'disabled' });
              }else if (role === "laboratorist") {
                columns.push({ label: 'Actions', field: 'actions', sort: 'disabled' });
            }

              const transformedData = {
                  columns: columns,
                  rows: fetchedData.map(item => ({
                      id: item.blood_donor_id,
                      donor: item.name,
                      age: item.age,
                      sex: item.sex,
                      blood_group:item.blood_group,
                      donation_date:item.last_donation_date,
                      actions: (
                          <ManageDonor
                            name={"Donor"}
                            id={item.blood_donor_id}
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
                  <AddDonor/>
              </div>
          }
          {role === "laboratorist"  &&
              <div className='add-btn-container'>
                  <AddDonor/>
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

export default BloodDonorList;