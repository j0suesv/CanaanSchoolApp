import styled from 'styled-components';
import { useEffect, useState } from 'react';
import { Chart } from 'primereact/chart';   
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { getPagos, getEstadisticas } from "../api/api";

export function Inicio() {
    const [chartData, setChartData] = useState({});
    const [chartOptions, setChartOptions] = useState({});
    const [balanceChart, setBalanceChart] = useState({});
    const [balanceOptions, setBalanceOptions] = useState({});
    const [pagosData, setPagosData] = useState([]);
    const [estadisticas, setEstadisticas] = useState({});

    const fetchPagos = async () => {
        try {
            const res = await getPagos();
            setPagosData(res.data);
        } catch (error) {
            console.error("Error al cargar pagos:", error);
        }
    };

    const fetchEstadisticas = async () => {
        try {
            const res = await getEstadisticas();
            setEstadisticas(res.data);

            const documentStyle = getComputedStyle(document.documentElement);
            const pieData = {
                labels: Object.keys(res.data.totalPorMetodo),
                datasets: [
                    {
                        data: Object.values(res.data.totalPorMetodo),
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
            };
            const pieOptions = {
                plugins: {
                    legend: {
                        labels: {
                            usePointStyle: true
                        }
                    }
                }
            };
            setChartData(pieData);
            setChartOptions(pieOptions);

            const textColor = documentStyle.getPropertyValue('--text-color');
            const textColorSecondary = documentStyle.getPropertyValue('--text-color-secondary');
            const surfaceBorder = documentStyle.getPropertyValue('--surface-border');

            const meses = Object.keys(res.data.ingresosPorMes);
            const montos = Object.values(res.data.ingresosPorMes);

            const barData = {
                labels: meses,
                datasets: [
                    {
                        label: 'Ingresos',
                        backgroundColor: documentStyle.getPropertyValue('--blue-500'),
                        borderColor: documentStyle.getPropertyValue('--blue-500'),
                        data: montos
                    }
                ]
            };

            const barOptions = {
                maintainAspectRatio: false,
                aspectRatio: 0.8,
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

            setBalanceChart(barData);
            setBalanceOptions(barOptions);

        } catch (error) {
            console.error("Error al obtener estadísticas:", error);
        }
    };

    useEffect(() => {
        fetchPagos();
        fetchEstadisticas();
    }, []);

    const getValorMetodo = (metodo) => {
        return estadisticas.totalPorMetodo?.[metodo] ?? 0;
    };

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
                            <h3>${estadisticas.totalGeneral?.toLocaleString() ?? 0}</h3>
                            <p>
                                Nequi: ${getValorMetodo("Nequi").toLocaleString()} <br />
                                Efectivo: ${getValorMetodo("Efectivo").toLocaleString()} <br />
                                Bancolombia: ${getValorMetodo("Bancolombia").toLocaleString()} <br />
								Transfiya: ${getValorMetodo("Transfiya").toLocaleString()} <br />
								Davivienda: ${getValorMetodo("Davivienda").toLocaleString()}
                            </p>
                        </div>
                    </div>
                    <div className='balance-container'>
                        <div className="card flex justify-content-center mb-3">
                            <h2>RESUMEN DE INGRESOS MENSUALES</h2>
                        </div>
                        <div className="card flex justify-content-center">
                            <Chart type="bar" data={balanceChart} options={balanceOptions} className="w-full md:w-30rem md:h-17rem"/>
                        </div>
                    </div>
                </div>
                
                <div className='transaction-container'>
                    <div className="card flex justify-content-center"><h2>ÚLTIMAS TRANSACCIONES</h2></div>
                    <DataTable value={pagosData} paginator rows={5} stripedRows removableSort tableStyle={{ minWidth: '50rem' }}>
                        <Column field="fecha" header="Fecha" sortable style={{ width: '15%' }} body={(rowData) => rowData.fecha?.split('T')[0]}></Column>
                        <Column field="nombre" header="Nombre" filter filterPlaceholder="Buscar por nombre" sortable style={{ width: '17%' }}></Column>
                        <Column field="estudiante_id" header="Identificación" sortable style={{ width: '17%' }}></Column>
                        <Column field="valor_abonado" header="Valor Abonado" sortable style={{ width: '17%' }}></Column>
                        <Column field="mes_abonado" header="Mes Abonado" sortable style={{ width: '17%' }}></Column>
                        <Column field="metodo_pago" header="Método de pago" sortable style={{ width: '17%' }}></Column>
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
		justify-content: space-between;
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
`;
