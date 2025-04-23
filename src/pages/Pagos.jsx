import styled from 'styled-components';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button'
import { useState } from 'react';
import { Dialog } from "primereact/dialog"

import PaymentForm from "../components/PaymentForm"

export function Pagos(){
	const [selectedPayment, setSelectedPayment] = useState(null);
	const [visible, setVisible] = useState(false);
	

	const footerContent = (
	  <div>
		<Button
		  label="Generar pago"
		  icon="pi pi-check"
		  onClick={() => setVisible(false)}
		  autoFocus
		/>
	  </div>
	);
  

	return (
    <Container>
      <h1>Pagos</h1>
		<hr />
		<div className='top-part'>
				{selectedPayment && <Button severity="secondary" label="Editar" onClick={() => setVisible(true)}></Button>}
				<Button
			onClick={() => setVisible(true)}
			label="Registrar pago"
			severity="primary"
			className="new-payment-button"
			/>
		</div>
		<Dialog
          visible={visible}
          modal
          header={"Registrar un nuevo pago"}
          footer={footerContent}
          style={{ width: "40vw" }}
          breakpoints={{ "960px": "75vw", "641px": "100vw" }}
          onHide={() => {
            if (!visible) return;
            setVisible(false);
          }}
        >
          <PaymentForm onSelected = {selectedPayment}/>
        </Dialog>
		<div className='table-container'>
			<DataTable
			value={pagos}
			paginator 
			rows={12}
			selectionMode="single"
			selection={selectedPayment}
			onSelectionChange={(e) => setSelectedPayment(e.value)}
			dataKey="identificacion"
			tableStyle={{ minWidth: '50rem' }}
		>
				<Column field="fecha" header="Fecha" sortable style={{ width: '13%' }}></Column>
				<Column field="nombre" header="Nombre" filter filterPlaceholder="Buscar por nombre" sortable style={{ width: '15%' }}></Column>
				<Column field="apellido" header="Apellido" filter filterPlaceholder="Buscar por nombre" sortable style={{ width: '15%' }}></Column>
				<Column field="identificacion" header="Identificacion" sortable style={{ width: '15%' }}></Column>
				<Column field="valorAbonado" header="Valor Abonado" style={{ width: '15%' }}></Column>
				<Column field="mesAbonado" header="Mes Abonado" style={{ width: '15%' }}></Column>
				<Column field="metodoPago" header="Metodo de pago" style={{ width: '15%' }}></Column>
			</DataTable>
			
		</div>
		
    </Container>
  );
	
}

const pagos = [
    { fecha: "12/05/2024", nombre: "Josue", apellido: "Salcedo", identificacion: 1078604352, valorAbonado: 200000, mesAbonado: "Junio", metodoPago: "Nequi" },
    { fecha: "13/05/2024", nombre: "Pedro", apellido: "Perez", identificacion: 10558456123, valorAbonado: 200000, mesAbonado: "Junio", metodoPago: "Efectivo" },
    { fecha: "14/05/2024", nombre: "Marly", apellido: "Mendez", identificacion: 1044578352, valorAbonado: 200000, mesAbonado: "Junio", metodoPago: "Bancolombia" },
    { fecha: "15/05/2024", nombre: "Victor", apellido: "Cantillo", identificacion: 10475504352, valorAbonado: 200000, mesAbonado: "Junio", metodoPago: "Nequi" },
    { fecha: "15/05/2024", nombre: "Juan", apellido: "Cantillo", identificacion: 1058904352, valorAbonado: 350000, mesAbonado: "Junio", metodoPago: "Efectivo" },
    { fecha: "18/05/2024", nombre: "Luisa", apellido: "Merlano", identificacion: 1147904352, valorAbonado: 150000, mesAbonado: "Junio", metodoPago: "Efectivo" },
    { fecha: "18/05/2024", nombre: "Luisa", apellido: "Merlano", identificacion: 1145904352, valorAbonado: 150000, mesAbonado: "Junio", metodoPago: "Efectivo" },
    { fecha: "18/05/2024", nombre: "Luisa", apellido: "Merlano", identificacion: 1147884352, valorAbonado: 150000, mesAbonado: "Junio", metodoPago: "Efectivo" },
    { fecha: "18/05/2024", nombre: "Luisa", apellido: "Merlano", identificacion: 11485904352, valorAbonado: 150000, mesAbonado: "Junio", metodoPago: "Efectivo" },
    { fecha: "18/05/2024", nombre: "Luisa", apellido: "Merlano", identificacion: 11757904352, valorAbonado: 150000, mesAbonado: "Junio", metodoPago: "Efectivo" },
    { fecha: "18/05/2024", nombre: "Luisa", apellido: "Merlano", identificacion: 1107904352, valorAbonado: 150000, mesAbonado: "Junio", metodoPago: "Efectivo" },
    { fecha: "18/05/2024", nombre: "Luisa", apellido: "Merlano", identificacion: 1257904352, valorAbonado: 150000, mesAbonado: "Junio", metodoPago: "Efectivo" },
    { fecha: "18/05/2024", nombre: "Luisa", apellido: "Merlano", identificacion: 1102404352, valorAbonado: 150000, mesAbonado: "Junio", metodoPago: "Efectivo" },
    { fecha: "18/05/2024", nombre: "Luisa", apellido: "Merlano", identificacion: 1146784352, valorAbonado: 150000, mesAbonado: "Junio", metodoPago: "Efectivo" },
    { fecha: "18/05/2024", nombre: "Luisa", apellido: "Merlano", identificacion: 1777904352, valorAbonado: 150000, mesAbonado: "Junio", metodoPago: "Efectivo" },
    { fecha: "18/05/2024", nombre: "Luisa", apellido: "Merlano", identificacion: 1122254352, valorAbonado: 150000, mesAbonado: "Junio", metodoPago: "Efectivo" },
    { fecha: "18/05/2024", nombre: "Luisa", apellido: "Merlano", identificacion: 1378904352, valorAbonado: 150000, mesAbonado: "Junio", metodoPago: "Efectivo" },
    { fecha: "18/05/2024", nombre: "Luisa", apellido: "Merlano", identificacion: 1147664352, valorAbonado: 150000, mesAbonado: "Junio", metodoPago: "Efectivo" },
];
const Container = styled.div`
	height: 100vh;
	padding: 0 30px;

	.top-part{
		display: flex;
		justify-content: end;
		margin: 20px 50px 20px 0;
	}
	
	.new-payment-button{
		margin-left: 20px;
		padding:8px;
	}
	.table-container{
		display:block;
		justify-content:center;
		width:96%;
		margin: 30px 0 30px 10px;
	}
.p-datatable .p-datatable-tbody > tr {
    background-color: ${(props) => props.theme.white};
	color:${(props) => props.theme.text}
}
	.p-datatable .p-datatable-tbody > tr:hover {
    background-color: ${(props) => props.theme.hover};
}
	.p-datatable .p-datatable-thead > tr > th {
    background-color: ${(props) => props.theme.white};
	color:${(props) => props.theme.text}
}
	.p-datatable .p-sortable-column:hover{
	 background-color: ${(props) => props.theme.hover};
	}
	.p-datatable .p-datatable-tbody > tr.p-highlight {
    background: ${(props) => props.theme.selectedrow};
    color:${(props) => props.theme.text};
	}

` ;


