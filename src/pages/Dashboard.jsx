import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { Chart } from 'primereact/chart';

export default function Dashboard() {

  const [chartData, setChartData] = useState({});
    const [chartOptions, setChartOptions] = useState({});

    useEffect(() => {
        const documentStyle = getComputedStyle(document.documentElement);
        const textColor = documentStyle.getPropertyValue('--text-color');
        const textColorSecondary = documentStyle.getPropertyValue('--text-color-secondary');
        const surfaceBorder = documentStyle.getPropertyValue('--surface-border');
        const data = {
            labels: ['February', 'March', 'April', 'May', 'June', 'July'],
            datasets: [
                {
                    type: 'line',
                    label: 'line',
                    borderColor: documentStyle.getPropertyValue('--blue-500'),
                    borderWidth: 2,
                    fill: false,
                    tension: 0.4,
                    data: [50, 25, 12, 48, 56, 76, 42]
                },
                {
                    type: 'bar',
                    label: 'Joel',
                    backgroundColor: documentStyle.getPropertyValue('--green-500'),
                    data: [21, 84, 24, 75, 37, 65, 34],
                    borderColor: 'white',
                    borderWidth: 2
                },
                {
                    type: 'bar',
                    label: 'yessica',
                    backgroundColor: documentStyle.getPropertyValue('--orange-500'),
                    data: [41, 52, 24, 74, 23, 21, 32]
                },
                {
                    type: 'bar',
                    label: 'prueba',
                    backgroundColor: documentStyle.getPropertyValue('--blue-500'),
                    data: [41, 52, 24, 74, 23, 21, 32]
                }
            ]
        };
        const options = {
            maintainAspectRatio: false,
            aspectRatio: 0.6,
            plugins: {
                legend: {
                    labels: {
                        color: textColor
                    }
                }
            },
            scales: {
                x: {
                    ticks: {
                        color: textColorSecondary
                    },
                    grid: {
                        color: surfaceBorder
                    }
                },
                y: {
                    ticks: {
                        color: textColorSecondary
                    },
                    grid: {
                        color: surfaceBorder
                    }
                }
            }
        };

        setChartData(data);
        setChartOptions(options);
    }, []);

  return (
    <>
      <div className="sm:grid md:flex">
        <Navbar page="DASHBOARD" />
          <div hidden className="mt-15 md:ml-67 bg-gray-200 md:mt-0 w-full h-screen flex justify-center items-center">
            <h1 className="text-3xl md:text-4xl">EN MANTENIMIENTO...</h1>
          </div>
          <div className="mt-20"></div>
            <Chart pt={{root : {className : 'md:ml-67 w-full'}}} type="line" data={chartData} options={chartOptions} />
      </div>
    </>
  );
}
