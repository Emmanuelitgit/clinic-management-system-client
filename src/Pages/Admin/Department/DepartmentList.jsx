import React from 'react';
import { useState, useEffect } from 'react';
import { MDBDataTable } from 'mdbreact';
import AddDepartment from "./AddDepartment";
import ManageDepartment from "./ManageDepartment"
import { useDispatch, useSelector } from 'react-redux';
import axios from "axios";
import api from '../../../api';



const DatatablePage = () => {

    const [data, setData] = useState({ columns: [], rows: [] });

    const dep = useSelector(state => state.count?.depValue) || [2];
    
    const truncateText = (text, maxLength) => {
      if (text.length > maxLength) {
        return text.slice(0, maxLength) + '......';
      }
      return text;
    };

    useEffect(() => {
      const fetchData = async () => {
        try {
          const response = await api.get('/departments', {
            withCredentials: true,
        });

        const fetchedData = response.data;

          const transformedData = {
            columns: [
              { label: 'ID', field: 'id', sort: 'asc',  },
              { label: 'DEPARTMENT NAME', field: 'name', sort: 'asc' },
              { label: 'DESCRIPTION', field: 'description', sort: 'asc' },
              { label: 'ACTIONS', field: 'actions', sort: 'disabled'},
            ],
            rows: fetchedData.map(item => ({
              id: item.department_id,
              name: item.name,
              description: truncateText(item.description, 50),
              actions: (
              <>
              <ManageDepartment
              name={item.name}
              id={item.department_id}
              desc={item.description}
              />
              </>
              ),
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
        <div className='add-btn-container'>
        <AddDepartment/>
        </div>
       <MDBDataTable
        striped
        bordered
        searchLabel='Search a name'
        className='table-component'
        data={data}
        theadTextWhite
        noBottomColumns
        searching
        displayEntries
        info
        />
    </div>
  );
}

export default DatatablePage;