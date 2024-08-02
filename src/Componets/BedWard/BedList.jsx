import React from 'react';
import { useState, useEffect } from 'react';
import { MDBDataTable } from 'mdbreact';
import { Folder, Delete, Update, Add } from '@mui/icons-material';
import Button from '../Buttons/Button';
import { tableData } from '../../utils/Data';
import AddBed from './AddBed';
import ManageBed from './ManageBed';
import { useDispatch, useSelector } from 'react-redux';


const BedList = ({ admin }) => {

  const role = localStorage.getItem("role").toLowerCase();
  const [data, setData] = useState({ columns: [], rows: [] });
  const dep = useSelector(state => state.count?.depValue) || [2];

  useEffect(() => {
      const fetchData = async () => {
          try {
              const response = await fetch('http://localhost:5000/beds', {
                method: 'GET',
                credentials: 'include', // Important for including cookies
            });
              if (!response.ok) {
                  throw new Error('Failed to fetch data');
              }
              const fetchedData = await response.json();

              const columns = [
                { label: 'ID', field: 'id', sort: 'asc',  },
                { label: 'Bed Type', field: 'bed_type', sort: 'asc' },
                { label: 'Bed Number', field: 'bed_number', sort: 'asc' },
                { label: 'Bed Status', field: 'bed_status', sort: 'asc' },
                { label: 'Bed Location', field: 'bed_location', sort: 'asc' },
              ];
              if (role === "nurse") {
                  columns.push({ label: 'Actions', field: 'actions', sort: 'disabled' });
              }

              const transformedData = {
                  columns: columns,
                  rows: fetchedData.map(item => ({
                      id: item.bed_id,
                      bed_type: item.bed_type,
                      bed_number: item.bed_number,
                      bed_status: item.bed_status,
                      bed_location:item.bed_location,
                      actions: (
                          <ManageBed
                          name={"Bed"}
                          id={item.bed_id}
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
                  <AddBed/>
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

export default BedList;