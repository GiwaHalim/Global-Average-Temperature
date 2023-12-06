import './App.css';
import { Container } from 'react-bootstrap';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);


function App() {
  async function getData() {
    const res = await fetch('aaa.csv');
    const data = await res.text();

    const rows = data.split('\n').slice(1);

    rows.forEach( row => {
          const line = row.split(',')
          const year = line[0]
          const temp = line[1]
        
          years.push(year);
          meanTemp.push(parseFloat(temp) + 14);
           
        } )
   };
  const years = []
  const meanTemp = []

  const options = {
    responsive: true,
    scales: {
      y: {
        beginAtZero: false,
        ticks:{
          callback: value => value + '°c',
        }
      }
    },
    plugins: {
      legend: {
        display: true,
        position: 'top',
      },
      title: {
        display: true,
        text: 'Combined Land-Surface Air and Sea-Surface Water Temperature',
      },
    },
  };


  const data = {
    labels: years,
    datasets: [
      {
        label: 'Combined Land-Surface Air and Sea-Surface Water Temperature',
        data: meanTemp,
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
      },
    ],
  };

  console.log(data.datasets[data])
  

  

   getData();
  return (
    <Container className='d-flex flex-column align-items-center' >
      <Bar 
      options={options}
      data={data}
      />
      <p> click legend to toggle display data</p>
      <Container className='mt-5 rounded'>
      <p >GISTEMP Team, 2023: GISS Surface Temperature Analysis (GISTEMP), version 4. NASA Goddard Institute for Space Studies. Dataset accessed 2023-12-01 at <a href='https://data.giss.nasa.gov/gistemp/.' target='_blank' rel='noreferrer'>https://data.giss.nasa.gov/gistemp/.</a> </p>
      <p>Lenssen, N., G. Schmidt, J. Hansen, M. Menne, A. Persin, R. Ruedy, and D. Zyss, 2019: Improvements in the GISTEMP uncertainty model. J. Geophys. Res. Atmos., 124, no. 12, 6307-6326, doi:10.1029/2018JD029522.</p>
      </Container>
    </Container>
  );
}

export default App;
