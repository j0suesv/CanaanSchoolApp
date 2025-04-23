import React, { useState } from "react";
import { InputText } from "primereact/inputtext";
import { FloatLabel } from "primereact/floatlabel";
import { Calendar } from "primereact/calendar";
import { InputNumber } from "primereact/inputnumber";
import styled from "styled-components";
import { InputMask } from "primereact/inputmask";

function RegisterForm() {
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

  return (
    <Container>
      <div className="form-container">
        
        <h2 className="dialog-subtitle">informacion del estudiante:</h2>

        <div className="card flex flex-column  gap-3 ">
          
            <div className="input-wrapper">
                <FloatLabel>
                <InputText
                    className="input"
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
                <label className="-mt-2 pt-1/2" htmlFor="username">
                    Nombre
                </label>
                </FloatLabel>

                <FloatLabel>
                <InputText
                    id="lName"
                    className="input"
                    value={lname}
                    onChange={(e) => setLName(e.target.value)}
                />
                <label className="-mt-2 pt-1/2" htmlFor="username">
                    Apellido
                </label>
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
                    <label className="-mt-2 pt-1/2" htmlFor="bDate">
                        Fecha de nacimiento
                    </label>
                </FloatLabel>
                <FloatLabel>
                    <InputNumber id="StudentID"  inputClassName="input" value={studentID} onValueChange={(e) => setStudentID(e.value)} />
                    <label className="-mt-2 pt-1/2" htmlFor="StudentID">No. Identificacion</label>
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
                    <label className="-mt-2 pt-1/2" htmlFor="vMatricula">
                        Valor matricula
                    </label>
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
                    <label className="-mt-2 pt-1/2" htmlFor="vMensualidad">
                        Valor mensualidad
                    </label>
                </FloatLabel>
            </div>
        </div>
        
        <h2 className="dialog-subtitle">informacion del padre de familia:</h2>
        <div className="card flex flex-column  gap-3 ">
          
            <div className="input-wrapper">
                <FloatLabel>
                <InputText
                    className="input"
                    id="pName"
                    value={pName}
                    onChange={(e) => setPName(e.target.value)}
                />
                <label className="-mt-2 pt-1/2" htmlFor="pName">
                    Nombre
                </label>
                </FloatLabel>

                <FloatLabel>
                <InputText
                    id="pLName"
                    className="input"
                    value={pLname}
                    onChange={(e) => setPLName(e.target.value)}
                />
                <label className="-mt-2 pt-1/2" htmlFor="pLName">
                    Apellido
                </label>
                </FloatLabel>

            </div>

            <div className="input-wrapper">
                <FloatLabel>
                <InputMask
                    mask="(999) 999-9999"
                    className="input"
                    id="name"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                />
                <label className="-mt-2 pt-1/2" htmlFor="username">
                    Numero de telefono
                </label>
                </FloatLabel>

                <FloatLabel>
                <InputText
                    id="lName"
                    className="input"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <label className="-mt-2 pt-1/2" htmlFor="username">
                    Email
                </label>
                </FloatLabel>

            </div>

        </div>
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
      padding: 10px;
      width: 16.5rem;

    }
}


@media only screen and (max-width: 1080px) {
  .input {
      padding: 10px;
      width: 28rem;

    }
}

@media only screen and (max-width: 500px) {
  .input {
      padding: 10px;
      width: 20rem;

    }
}
`;

export default RegisterForm;
