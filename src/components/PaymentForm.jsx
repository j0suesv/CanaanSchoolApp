import React, { useState } from "react";
import { InputText } from "primereact/inputtext";
import { FloatLabel } from "primereact/floatlabel";
import { Calendar } from "primereact/calendar";
import { InputNumber } from "primereact/inputnumber";
import styled from "styled-components";
import { InputMask } from "primereact/inputmask";
import { Dropdown } from 'primereact/dropdown';

function PaymentForm(props) {
  const selected = props.onSelected || {}; 

  const dd = selected.fecha ? selected.fecha.substring(0, 2) : "";
  const mm = selected.fecha ? selected.fecha.substring(3, 5) : "";
  const yyyy = selected.fecha ? selected.fecha.substring(6, 10) : "";
  const formatDate = mm && dd && yyyy ? `${mm}/${dd}/${yyyy}` : "";

  const [name, setName] = useState(selected.nombre || "");
  const [lname, setLName] = useState(selected.apellido || "");
  const [pDate, setPDate] = useState(formatDate ? new Date(formatDate) : "");
  const [studentID, setStudentID] = useState(selected.identificacion || "");
  const [vAbonado, setVAbonado] = useState(selected.valorAbonado || "");
  const [mAbonado, setMAbonado] = useState(selected.mesAbonado || "");
  const [selectedPMethod, setSelectedPMethod] = useState(selected.metodoPago || "");
  const [comments, setComments] = useState("");
  const paymentMethods = [
    { name: 'Efectivo', number: 'EF' },
    { name: 'Nequi', number: '304825640' },
    { name: 'Bancolombia', number: '123456789' },
    { name: 'Transfiya', number: '51234958' },
    { name: 'Davivienda', number: '2156489842' }
];


   
  return (
    <Container>
      <div className="form-container">
        
        <h2 className="dialog-subtitle">informacion del estudiante:</h2>

        <div className="card flex flex-column  gap-3 ">
          
            <div className="input-wrapper">
            <FloatLabel>
                    <Calendar
                        inputId="pDate"
                        inputClassName="input"
                        value={pDate}
                        onChange={(e) => setPDate(e.value)}
                        dateFormat = "dd/mm/yy"
                    />
                    <label className="-mt-2 pt-1/2" htmlFor="pDate">
                        Fecha de pago
                    </label>
            </FloatLabel>
            <FloatLabel>
                    <InputNumber disabled={!!props.onSelected} id="StudentID"  inputClassName="input" value={studentID} onValueChange={(e) => setStudentID(e.value)} />
                    <label className="-mt-2 pt-1/2" htmlFor="StudentID">No. Identificacion</label>
            </FloatLabel>

            </div>

            <div className="input-wrapper">
                <FloatLabel>
                    <InputText
                        disabled={!!props.onSelected}
                        className="input"
                        id="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                    <label className="-mt-2 pt-1/2" htmlFor="name">
                        Nombre
                    </label>
                </FloatLabel>
                <FloatLabel>
                    <InputText
                        disabled={!!props.onSelected}
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
                    <InputNumber
                        id="vAbonado"
                        inputClassName="input"
                        value={vAbonado}
                        onValueChange={(e) => setVAbonado(e.value)}
                        mode="currency"
                        currency="USD"
                        locale="en-US"
                    />
                    <label className="-mt-2 pt-1/2" htmlFor="vAbonado">
                        Valor abonado
                    </label>
                </FloatLabel>
                <FloatLabel>
                    <InputText
                        id="mAbonado"
                        className="input"
                        value={mAbonado}
                        onChange={(e) => setMAbonado(e.target.value)}
                    />
                    <label className="-mt-2 pt-1/2" htmlFor="mAbonado">
                        Mes abonado
                    </label>
                </FloatLabel>
                
            </div>
            <div className="input-wrapper">
                
                <FloatLabel>
                <Dropdown value={selectedPMethod.name} onChange={(e) => setSelectedPMethod(e.value)} options={paymentMethods} optionLabel="name" 
                showClear placeholder="Seleccione un metodo" className="input"  />
                <label className="-mt-2 pt-1/2" htmlFor="pLName">
                    Metodo de pago
                </label>
                </FloatLabel>
                <FloatLabel>
                <InputText
                    id="comments"
                    className="input"
                    value={comments}
                    onChange={(e) => setComments(e.target.value)}
                />
                <label className="-mt-2 pt-1/2" htmlFor="comments">
                    Comentarios
                </label>
                </FloatLabel>

            </div>
        </div>
        
        <div className="card flex flex-column  gap-3 ">
          
            

        </div>
      </div>
    </Container>
  );
}

const estudiantes = [
    {
      nombre: "Josue",
      apellido: "Salcedo",
      cedula: 1044604352,
      edad: 20,
      curso: "2A",
      valorMatricula: 250,
      valorMensualidad: 200,
      saldo: 0,
    },
    {
      nombre: "Pedro",
      apellido: "Perez",
      cedula: 1046597856,
      edad: 12,
      curso: "2A",
      valorMatricula: 250,
      valorMensualidad: 300,
      saldo: 100,
    },
    {
      nombre: "Marly",
      apellido: "Mendez",
      cedula: 1065845789,
      edad: 22,
      curso: "2A",
      valorMatricula: 100,
      valorMensualidad: 200,
      saldo: 5,
    },
    {
      nombre: "Nicolle",
      apellido: "Rodriguez",
      cedula: 1055489875,
      edad: 5,
      curso: "2A",
      valorMatricula: 100,
      valorMensualidad: 260,
      saldo: 0,
    },
    {
      nombre: "Juan",
      apellido: "Valencia",
      cedula: 1900245789,
      edad: 21,
      curso: "2A",
      valorMatricula: 150,
      valorMensualidad: 280,
      saldo: 5,
    },
  ];

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

export default PaymentForm;
