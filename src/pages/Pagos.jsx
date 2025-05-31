import styled from 'styled-components';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import { useState, useEffect } from 'react';
import { Dialog } from "primereact/dialog";
import PaymentForm from "../components/PaymentForm";
import {
  getPagos,
  crearPago,
  editarPago,
  eliminarPago
} from "../api/api";

export function Pagos() {
  const [selectedPayment, setSelectedPayment] = useState(null);
  const [visible, setVisible] = useState(false);
  const [pagosData, setPagosData] = useState([]);

  useEffect(() => {
    fetchPagos();
  }, []);

  const fetchPagos = async () => {
    try {
      const res = await getPagos();
      setPagosData(res.data);
    } catch (error) {
      console.error("Error al cargar pagos:", error);
    }
  };

  const handleRegistrarPago = async (data) => {
    try {
      if (selectedPayment) {
        await editarPago(selectedPayment.id, data);
      } else {
        await crearPago(data);
      }
      fetchPagos();
      setSelectedPayment(null);
      setVisible(false);
    } catch (error) {
      console.error("Error al registrar/editar pago:", error);
    }
  };

  const handleEliminarPago = async () => {
    if (selectedPayment) {
      try {
        await eliminarPago(selectedPayment.id);
        fetchPagos();
        setSelectedPayment(null);
      } catch (error) {
        console.error("Error al eliminar pago:", error);
      }
    }
  };

  const footerContent = (
    <div>
      <Button
        label="Guardar"
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
        {selectedPayment && (
          <>
            <Button
              severity="secondary"
              label="Editar"
              onClick={() => setVisible(true)}
            />
            <Button
              severity="danger"
              label="Eliminar"
              onClick={handleEliminarPago}
              className="ml-2"
            />
          </>
        )}
        <Button
          onClick={() => {
            setSelectedPayment(null);
            setVisible(true);
          }}
          label="Registrar pago"
          severity="primary"
          className="new-payment-button"
        />
      </div>

      <Dialog
        visible={visible}
        modal
        header={selectedPayment ? "Editar pago" : "Registrar nuevo pago"}
        footer={footerContent}
        style={{ width: "40vw" }}
        breakpoints={{ "960px": "75vw", "641px": "100vw" }}
        onHide={() => setVisible(false)}
      >
        <PaymentForm onSubmit={handleRegistrarPago} selected={selectedPayment} />
      </Dialog>

      <div className='table-container'>
        <DataTable
          value={pagosData}
          paginator
          rows={12}
          selectionMode="single"
          selection={selectedPayment}
          onSelectionChange={(e) => setSelectedPayment(e.value)}
          dataKey="id"
          tableStyle={{ minWidth: '50rem' }}
        >
          <Column field="fecha" header="Fecha" sortable style={{ width: '13%' }} body={(rowData) => rowData.fecha?.split('T')[0]}></Column>
          <Column field="nombre" header="Nombre" sortable style={{ width: '15%' }}></Column>
          <Column field="apellido" header="Apellido" sortable style={{ width: '15%' }}></Column>
          <Column field="estudiante_id" header="ID Estudiante" sortable style={{ width: '15%' }}></Column>
          <Column field="valor_abonado" header="Valor Abonado" style={{ width: '15%' }}></Column>
          <Column field="mes_abonado" header="Mes Abonado" style={{ width: '15%' }}></Column>
          <Column field="metodo_pago" header="Método de pago" style={{ width: '15%' }}></Column>
        </DataTable>
      </div>
    </Container>
  );
}

const Container = styled.div`
  height: 100vh;
  padding: 0 30px;

  .top-part {
    display: flex;
    justify-content: end;
    gap: 10px;
    margin: 20px 50px 20px 0;
  }

  .new-payment-button {
    padding: 8px;
  }

  .table-container {
    display: block;
    justify-content: center;
    width: 96%;
    margin: 30px 0 30px 10px;
  }

  .p-datatable .p-datatable-tbody > tr {
    background-color: ${(props) => props.theme.white};
    color: ${(props) => props.theme.text};
  }

  .p-datatable .p-datatable-tbody > tr:hover {
    background-color: ${(props) => props.theme.hover};
  }

  .p-datatable .p-datatable-thead > tr > th {
    background-color: ${(props) => props.theme.white};
    color: ${(props) => props.theme.text};
  }

  .p-datatable .p-sortable-column:hover {
    background-color: ${(props) => props.theme.hover};
  }

  .p-datatable .p-datatable-tbody > tr.p-highlight {
    background: ${(props) => props.theme.selectedrow};
    color: ${(props) => props.theme.text};
  }
`;
