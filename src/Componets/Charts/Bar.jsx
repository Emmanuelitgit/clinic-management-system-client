import React from 'react';
import { Line, Bar } from 'react-chartjs-2';
import { Chart, registerables } from 'chart.js';
import Card from 'react-bootstrap/Card';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getInvoiceList } from '../../store/data';






const BarChart = () => {

  const dispatch = useDispatch()
  const [windowSize, setWindowSize] = useState()
  const dep = useSelector(state => state.count?.depValue) || [2];
  const payments = useSelector((state)=>state.data?.invoiceList);

  const year = new Date().getFullYear()

  // GRABING REVENUE AMOUNT BASED ON MONTH
  const januaryPayments = payments.filter((data) => data?.date >= `${year}-01-01` &&  data?.date <= `${year}-01-31`);
  const februaryPayments = payments.filter((data) => data?.date >= `${year}-02-01` &&  data?.date <= `${year}-02-29`);
  const marchPayments = payments.filter((data) => data?.date >= `${year}-03-01` &&  data?.date <= `${year}-03-31`);
  const aprilPayments = payments.filter((data) => data?.date >= `${year}-04-01` &&  data?.date <= `${year}-04-30`);
  const mayPayments = payments.filter((data) => data?.date >= `${year}-05-01` &&  data?.date <= `${year}-05-31`);
  const junePayments = payments.filter((data) => data?.date >= `${year}-06-01` &&  data?.date <= `${year}-06-30`);
  const julyPayments = payments.filter((data) => data?.date >= `${year}-07-01` &&  data?.date <= `${year}-07-31`);
  const augustPayments = payments.filter((data) => data?.date >= `${year}-08-01` &&  data?.date <= `${year}-08-31`);
  const septemberPayments = payments.filter((data) => data?.date >= `${year}-09-01` &&  data?.date <= `${year}-09-30`);
  const octoberPayments = payments.filter((data) => data?.date >= `${year}-10-01` &&  data?.date <= `${year}-10-31`);
  const novemberPayments = payments.filter((data) => data?.date >= `${year}-11-01` &&  data?.date <= `${year}-11-30`);
  const decemberPayments = payments.filter((data) => data?.date >= `${year}-12-01` &&  data?.date <= `${year}-12-31`);

  // REVENUE TOTAL AMOUNT COMPUTATION
  const JanuaryAmount = januaryPayments.map((pay) => pay.amount);
  const JanuaryTotalAmount = JanuaryAmount.reduce((accumulator, currentValue) => accumulator + currentValue, 0);
  const februaryAmount = februaryPayments.map((pay) => pay.amount);
  const februaryTotalAmount = februaryAmount.reduce((accumulator, currentValue) => accumulator + currentValue, 0);
  const marchAmount = marchPayments.map((pay) => pay.amount);
  const marchTotalAmount = marchAmount.reduce((accumulator, currentValue) => accumulator + currentValue, 0);
  const aprilAmount = aprilPayments.map((pay) => pay.amount);
  const aprilTotalAmount = aprilAmount.reduce((accumulator, currentValue) => accumulator + currentValue, 0);
  const mayAmount = mayPayments.map((pay) => pay.amount);
  const mayTotalAmount = mayAmount.reduce((accumulator, currentValue) => accumulator + currentValue, 0);
  const juneAmount = junePayments.map((pay) => pay.amount);
  const juneTotalAmount = juneAmount.reduce((accumulator, currentValue) => accumulator + currentValue, 0);
  const julyAmount = julyPayments.map((pay) => pay.amount);
  const julyTotalAmount = julyAmount.reduce((accumulator, currentValue) => accumulator + currentValue, 0);
  const augustAmount = augustPayments.map((pay) => pay.amount);
  const augustTotalAmount = augustAmount.reduce((accumulator, currentValue) => accumulator + currentValue, 0);
  const septemberAmount = septemberPayments.map((pay) => pay.amount);
  const septemberTotalAmount = septemberAmount.reduce((accumulator, currentValue) => accumulator + currentValue, 0);
  const octoberAmount = octoberPayments.map((pay) => pay.amount);
  const octoberTotalAmount = octoberAmount.reduce((accumulator, currentValue) => accumulator + currentValue, 0);
  const novemberAmount = novemberPayments.map((pay) => pay.amount);
  const novemberTotalAmount = novemberAmount.reduce((accumulator, currentValue) => accumulator + currentValue, 0);
  const decemberAmount = decemberPayments.map((pay) => pay.amount);
  const decemberTotalAmount = decemberAmount.reduce((accumulator, currentValue) => accumulator + currentValue, 0);

  useEffect(()=>{
    dispatch(getInvoiceList())
   },[dep]);

  useEffect(() => {
    const handleResize = () => {
      const windowWidth = window.innerWidth;
      setWindowSize(windowWidth);
    };
  
    window.addEventListener('resize', handleResize);
    
    handleResize();
  
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);


  Chart.register(...registerables);

const data = {
  labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
  datasets: [
    {
      label: 'Revenue(Ghc)',
      data: [
             JanuaryTotalAmount, februaryTotalAmount, marchTotalAmount, aprilTotalAmount, 
             mayTotalAmount, juneTotalAmount, julyTotalAmount,augustTotalAmount,septemberTotalAmount,
             octoberTotalAmount,novemberTotalAmount,decemberTotalAmount
            ],
      fill: true,
      backgroundColor: [
        '#3120D6',
        '#F9B115',
        '#2EB85C',
        '#9C27B0',
        '#E55353',
        '#009688',
        '#795548',
      ],
    },
  ],
};

const options = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top',
    },
    tooltip: {
      mode: 'index',
      intersect: false,
    },
  },
  interaction: {
    mode: 'nearest',
    axis: 'x',
    intersect: false,
  },
  scales: {
    x: {
      display: true,
      title: {
        display: true,
        text: 'Month',
      },
    },
    y: {
      display: true,
      title: {
        display: true,
        text: 'Value',
      },
    },
  },
};



  return (
  <Card style={{ width: windowSize < 730 ? "100%" : '72%' }} className='chart-card'>
  <Card.Body style={{ width: '100%', height:'30%' }}>
    <Card.Title>Revenue Analysis</Card.Title>
    <Bar data={data} options={options} style={{height:'100vh', width:'100%'}}/>
  </Card.Body>
</Card>
  );
};

export default BarChart;
