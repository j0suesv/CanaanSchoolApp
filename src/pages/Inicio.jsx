import styled from 'styled-components';
import { useEffect, useState } from 'react';
import { Chart } from 'primereact/chart';   
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';


export function Inicio(){
	const [chartData, setChartData] = useState({});
    const [chartOptions, setChartOptions] = useState({});

    useEffect(() => {
        const documentStyle = getComputedStyle(document.documentElement);
        const data = {
            labels: ['A', 'B', 'C'],
            datasets: [
                {
                    data: [540, 325, 702],
                    backgroundColor: [
                        documentStyle.getPropertyValue('--blue-500'), 
                        documentStyle.getPropertyValue('--yellow-500'), 
                        documentStyle.getPropertyValue('--green-500')
                    ],
                    hoverBackgroundColor: [
                        documentStyle.getPropertyValue('--blue-400'), 
                        documentStyle.getPropertyValue('--yellow-400'), 
                        documentStyle.getPropertyValue('--green-400')
                    ]
                }
            ]
        }
        const options = {
            plugins: {
                legend: {
                    labels: {
                        usePointStyle: true
                    }
                }
            }
        };

        setChartData(data);
        setChartOptions(options);
    }, []);

	const [BalanceChart, setBalanceChart] = useState({});
    const [BalanceOptions, setBalanceOptions] = useState({});

    useEffect(() => {
        const documentStyle = getComputedStyle(document.documentElement);
        const textColor = documentStyle.getPropertyValue('--text-color');
        const textColorSecondary = documentStyle.getPropertyValue('--text-color-secondary');
        const surfaceBorder = documentStyle.getPropertyValue('--surface-border');
        const data = {
            labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
            datasets: [
                {
                    label: 'Ingresos',
                    backgroundColor: documentStyle.getPropertyValue('--blue-500'),
                    borderColor: documentStyle.getPropertyValue('--blue-500'),
                    data: [65, 59, 80, 81, 56, 55, 40]
                },
                {
                    label: 'Egresos',
                    backgroundColor: documentStyle.getPropertyValue('--pink-500'),
                    borderColor: documentStyle.getPropertyValue('--pink-500'),
                    data: [28, 48, 40, 19, 86, 27, 80]
                }
            ]
        };
        const options = {
            maintainAspectRatio: false,
            aspectRatio: 0.8,
            plugins: {
                legend: {
                    labels: {
                        fontColor: textColor
                    }
                }
            },
            scales: {
                x: {
                    ticks: {
                        color: textColorSecondary,
                        font: {
                            weight: 500
                        }
                    },
                    grid: {
                        display: false,
                        drawBorder: false
                    }
                },
                y: {
                    ticks: {
                        color: textColorSecondary
                    },
                    grid: {
                        color: surfaceBorder,
                        drawBorder: false
                    }
                }
            }
        };

        setBalanceChart(data);
        setBalanceOptions(options);
    }, []);

	const pagos= [
		{
		fecha: "12/05/2024",
		nombre: "Josue Salcedo",
		identificacion: 1044604352,
		valorAbonado: "$ 200000",
		mesAbonado: "Junio",
		metodoPago: "Nequi"
		},
		{
			fecha: "13/05/2024",
			nombre: "Pedro Perez",
			identificacion: 10558456123,
			valorAbonado: "$ 200000",
			mesAbonado: "Junio",
			metodoPago: "Efectivo"
			},
			{
		fecha: "14/05/2024",
		nombre: "Marly Mendez",
		identificacion: 1044578352,
		valorAbonado: "$ 200000",
		mesAbonado: "Junio",
		metodoPago: "Bancolombia"
		},
		{
			fecha: "15/05/2024",
			nombre: "Victor Cantillo",
			identificacion: 10475504352,
			valorAbonado: "$ 200000",
			mesAbonado: "Junio",
			metodoPago: "Nequi"
			},
			{
				fecha: "15/05/2024",
				nombre: "Juan Cantillo",
				identificacion: 1058904352,
				valorAbonado: "$ 350000",
				mesAbonado: "Junio",
				metodoPago: "Efectivo"
				},
			{
				fecha: "18/05/2024",
				nombre: "Luisa Merlano",
				identificacion: 1147904352,
				valorAbonado: "$ 150000",
				mesAbonado: "Junio",
				metodoPago: "Efectivo"
			},
	]

	return (
		<Container>
			<h1>Inicio</h1>
            <hr />
            <div className='body-container'>
				<div className='charts-container'>

					<div className='payment-container'>
						<div className="card flex justify-content-center">
						<Chart type="pie" data={chartData} options={chartOptions} className="w-full md:w-20rem" />
						
						</div>
						<div>
							<h2>BALANCE:</h2>
							<h3>$1.500.000</h3>
							<p>Nequi: 300.000 <br />Efectivo: 400.000 <br />Bancolombia: 800.000</p>
						</div>
					</div>
					<div className='balance-container'>
						<div className="card flex justify-content-center mb-3">
							<h2>RESUMEN DE INGRESOS Y EGRESOS</h2>
						</div>
						<div className="card flex justify-content-center">
							<Chart type="bar" data={BalanceChart} options={BalanceOptions} className="w-full md:w-30rem md:h-17rem"/>
						</div>
						
					</div>
				</div>
				
				<div className='transaction-container'>
					<div className="card flex justify-content-center"><h2>ULTIMAS TRANSACCIONES</h2></div>
					<DataTable value={pagos}  paginator rows={5} stripedRows removableSort tableStyle={{ minWidth: '50rem' }}>
						<Column field="fecha" header="Fecha" sortable style={{ width: '15%' }}></Column>
						<Column field="nombre" header="Nombre" filter filterPlaceholder="Search by name" sortable style={{ width: '17%' }}></Column>
						<Column field="identificacion" header="Identificacion" sortable style={{ width: '17%' }}></Column>
						<Column field="valorAbonado" header="Valor Abonado" sortable style={{ width: '17%' }}></Column>
						<Column field="mesAbonado" header="Mes Abonado" sortable style={{ width: '17%' }}></Column>
						<Column field="metodoPago" header="Metodo de pago" sortable style={{ width: '17%' }}></Column>
					</DataTable>
				</div>
			</div>

			
		</Container>
	);
	
}


const Container = styled.div`
	min-height: 100vh;
	padding: 0 50px;
	.charts-container{
		display: flex;
		flex-wrap: wrap;
		justify-content: start;
		align-items: center;
	}
	.payment-container{
		background:	${(props) => props.theme.bg};
		width: 49%;
		height: 360px;
		padding: 25px;
		border-radius: 30px;
		margin: 20px 20px 20px 0;
		display: flex;
		justify-content: starts;
		align-items: center;
	}
    .balance-container{
		background:	${(props) => props.theme.bg};
		width: 49%;
		height: 360px;
		padding: 18px 30px;
		border-radius: 30px;
		margin: 20px 0 20px 0;
	
	
	}
	.transaction-container{
		background:	${(props) => props.theme.bg};
		
		padding: 20px;
		border-radius: 30px;
		margin: 10px 0;
		
	}
` ;