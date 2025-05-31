import React, { useState, useEffect } from "react";
import { InputText } from "primereact/inputtext";
import { FloatLabel } from "primereact/floatlabel";
import { Calendar } from "primereact/calendar";
import { InputNumber } from "primereact/inputnumber";
import styled from "styled-components";
import { Dropdown } from "primereact/dropdown";
import { Button } from "primereact/button";

function PaymentForm({ selected, onSubmit }) {
  const [pDate, setPDate] = useState(null);
  const [studentID, setStudentID] = useState("");
  const [name, setName] = useState("");
  const [lname, setLName] = useState("");
  const [vAbonado, setVAbonado] = useState("");
  const [mAbonado, setMAbonado] = useState("");
  const [selectedPMethod, setSelectedPMethod] = useState(null);
  const [comments, setComments] = useState("");

  const paymentMethods = [
    { name: "Efectivo", id: 1 },
    { name: "Nequi", id: 2 },
    { name: "Bancolombia", id: 3 },
    { name: "Transfiya", id: 4 },
    { name: "Davivienda", id: 5 },
  ];

  useEffect(() => {
    if (selected) {
      setPDate(selected.fecha ? new Date(selected.fecha) : null);
      setStudentID(selected.estudiante_id || "");
      setName(selected.nombre || "");
      setLName(selected.apellido || "");
      setVAbonado(selected.valor_abonado || "");
      setMAbonado(selected.mes_abonado || "");
      setSelectedPMethod(paymentMethods.find(p => p.id === selected.metodo_pago_id) || null);
      setComments(selected.comentarios || "");
    }
  }, [selected]);

  const handleSubmit = () => {
    const data = {
      estudiante_id: studentID,
      fecha: pDate,
      valor_abonado: vAbonado,
      mes_abonado: mAbonado,
      metodo_pago_id: selectedPMethod?.id,
      comentarios: comments,
    };

    onSubmit(data);
  };

  return (
    <Container>
      <div className="form-container">
        <h2 className="dialog-subtitle">Información del estudiante:</h2>
        <div className="card flex flex-column gap-3">
          <div className="input-wrapper">
            <FloatLabel>
              <Calendar
                inputId="pDate"
                inputClassName="input"
                value={pDate}
                onChange={(e) => setPDate(e.value)}
                dateFormat="dd/mm/yy"
              />
              <label htmlFor="pDate">Fecha de pago</label>
            </FloatLabel>
            <FloatLabel>
              <InputNumber
                id="StudentID"
                inputClassName="input"
                value={studentID}
                onValueChange={(e) => setStudentID(e.value)}
              />
              <label htmlFor="StudentID">ID del estudiante</label>
            </FloatLabel>
          </div>

          <div className="input-wrapper">
            <FloatLabel>
              <InputText
                id="name"
                className="input"
                value={name}
                onChange={(e) => setName(e.target.value)}
                disabled
              />
              <label htmlFor="name">Nombre</label>
            </FloatLabel>
            <FloatLabel>
              <InputText
                id="lName"
                className="input"
                value={lname}
                onChange={(e) => setLName(e.target.value)}
                disabled
              />
              <label htmlFor="lName">Apellido</label>
            </FloatLabel>
          </div>

          <div className="input-wrapper">
            <FloatLabel>
              <InputNumber
                id="vAbonado"
                inputClassName="input"
                value={vAbonado}
                onValueChange={(e) => setVAbonado(e.value)}
                mode="currency"
                currency="USD"
                locale="en-US"
              />
              <label htmlFor="vAbonado">Valor abonado</label>
            </FloatLabel>
            <FloatLabel>
              <InputText
                id="mAbonado"
                className="input"
                value={mAbonado}
                onChange={(e) => setMAbonado(e.target.value)}
              />
              <label htmlFor="mAbonado">Mes abonado</label>
            </FloatLabel>
          </div>

          <div className="input-wrapper">
            <FloatLabel>
              <Dropdown
                value={selectedPMethod}
                onChange={(e) => setSelectedPMethod(e.value)}
                options={paymentMethods}
                optionLabel="name"
                placeholder="Seleccione un método"
                className="input"
              />
              <label htmlFor="dropdown">Método de pago</label>
            </FloatLabel>
            <FloatLabel>
              <InputText
                id="comments"
                className="input"
                value={comments}
                onChange={(e) => setComments(e.target.value)}
              />
              <label htmlFor="comments">Comentarios</label>
            </FloatLabel>
          </div>
        </div>

        <Button label="Registrar pago" severity="success" onClick={handleSubmit} />
      </div>
    </Container>
  );
}

const Container = styled.div`
  .form-container {
    padding: 5px 30px;

    .dialog-subtitle {
      font-size: 1rem;
      margin: 20px 0 20px;
    }

    .input-wrapper {
      display: flex;
      flex-wrap: wrap;
      justify-content: space-between;
      margin: 10px 0;
      gap: 20px;
    }
  }

  .input {
    padding: 10px;
    width: 20.8rem;
  }

  @media only screen and (max-width: 1900px) {
    .input {
      width: 16.5rem;
    }
  }

  @media only screen and (max-width: 1080px) {
    .input {
      width: 28rem;
    }
  }

  @media only screen and (max-width: 500px) {
    .input {
      width: 20rem;
    }
  }
`;

export default PaymentForm;
