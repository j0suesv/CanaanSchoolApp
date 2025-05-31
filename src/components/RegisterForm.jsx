import React, { useState } from "react";
import { InputText } from "primereact/inputtext";
import { FloatLabel } from "primereact/floatlabel";
import { Calendar } from "primereact/calendar";
import { InputNumber } from "primereact/inputnumber";
import styled from "styled-components";
import { InputMask } from "primereact/inputmask";
import { Button } from "primereact/button";

function RegisterForm({ onSubmit }) {
  const [name, setName] = useState("");
  const [lname, setLName] = useState("");
  const [bDate, setBDate] = useState(null);
  const [studentID, setStudentID] = useState(null);
  const [vMatricula, setVMatricula] = useState(null);
  const [vMensualidad, setVMensualidad] = useState(null);

  const [pName, setPName] = useState("");
  const [pLname, setPLName] = useState("");
  const [phone, setPhone] = useState(null);
  const [email, setEmail] = useState("");

  const handleSubmit = async () => {
    const data = {
      nombre: name,
      apellido: lname,
      cedula: studentID,
      fecha_nacimiento: bDate?.toISOString().split("T")[0],
      edad: bDate ? new Date().getFullYear() - bDate.getFullYear() : null,
      curso: "2A", // puedes hacerlo dinámico si quieres
      valor_matricula: vMatricula,
      valor_mensualidad: vMensualidad,
      saldo: 0,
      responsable_id: null // para ahora, lo dejamos así
    };

    await onSubmit(data);
  };

  return (
    <Container>
      <div className="form-container">
        <h2 className="dialog-subtitle">información del estudiante:</h2>

        <div className="card flex flex-column  gap-3 ">
          <div className="input-wrapper">
            <FloatLabel>
              <InputText
                className="input"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <label htmlFor="name">Nombre</label>
            </FloatLabel>

            <FloatLabel>
              <InputText
                id="lName"
                className="input"
                value={lname}
                onChange={(e) => setLName(e.target.value)}
              />
              <label htmlFor="lName">Apellido</label>
            </FloatLabel>
          </div>

          <div className="input-wrapper">
            <FloatLabel>
              <Calendar
                inputId="bDate"
                inputClassName="input"
                value={bDate}
                onChange={(e) => setBDate(e.value)}
              />
              <label htmlFor="bDate">Fecha de nacimiento</label>
            </FloatLabel>
            <FloatLabel>
              <InputNumber
                id="StudentID"
                inputClassName="input"
                value={studentID}
                onValueChange={(e) => setStudentID(e.value)}
              />
              <label htmlFor="StudentID">No. Identificación</label>
            </FloatLabel>
          </div>

          <div className="input-wrapper">
            <FloatLabel>
              <InputNumber
                id="vMatricula"
                inputClassName="input"
                value={vMatricula}
                onValueChange={(e) => setVMatricula(e.value)}
                mode="currency"
                currency="USD"
                locale="en-US"
              />
              <label htmlFor="vMatricula">Valor matrícula</label>
            </FloatLabel>
            <FloatLabel>
              <InputNumber
                id="vMensualidad"
                inputClassName="input"
                value={vMensualidad}
                onValueChange={(e) => setVMensualidad(e.value)}
                mode="currency"
                currency="USD"
                locale="en-US"
              />
              <label htmlFor="vMensualidad">Valor mensualidad</label>
            </FloatLabel>
          </div>
        </div>

        <h2 className="dialog-subtitle">información del padre de familia:</h2>
        <div className="card flex flex-column  gap-3 ">
          <div className="input-wrapper">
            <FloatLabel>
              <InputText
                className="input"
                id="pName"
                value={pName}
                onChange={(e) => setPName(e.target.value)}
              />
              <label htmlFor="pName">Nombre</label>
            </FloatLabel>

            <FloatLabel>
              <InputText
                id="pLName"
                className="input"
                value={pLname}
                onChange={(e) => setPLName(e.target.value)}
              />
              <label htmlFor="pLName">Apellido</label>
            </FloatLabel>
          </div>

          <div className="input-wrapper">
            <FloatLabel>
              <InputMask
                mask="(999) 999-9999"
                className="input"
                id="telefono"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
              <label htmlFor="telefono">Número de teléfono</label>
            </FloatLabel>

            <FloatLabel>
              <InputText
                id="email"
                className="input"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <label htmlFor="email">Email</label>
            </FloatLabel>
          </div>
        </div>

        <Button label="Crear estudiante" severity="success" onClick={handleSubmit} />
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

  @media only screen and (max-width: 1920px) {
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

export default RegisterForm;
