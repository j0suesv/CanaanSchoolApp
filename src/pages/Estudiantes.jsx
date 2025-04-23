import styled from "styled-components";
import { Card } from "primereact/card";
import { Button } from "primereact/button";
import { Tag } from "primereact/tag";
import { SearchBar } from "../components/SearchBar";
import { useState } from "react";
import { Dialog } from "primereact/dialog";
import RegisterForm from "../components/RegisterForm"


export function Estudiantes() {
  const [studentsData, setStudentsData] = useState(estudiantes);
  const [visible, setVisible] = useState(false);


  const footerContent = (
    <div>
      <Button
        label="Crear estudiante"
        icon="pi pi-check"
        onClick={() => setVisible(false)}
        autoFocus
      />
    </div>
  );

  function searchStudent(input) {
    const filterStudents = estudiantes.filter((student) =>
      student.nombre.toLowerCase().includes(input.toLowerCase()) ||
		student.apellido.toLowerCase().includes(input.toLowerCase()) 
    );
    setStudentsData(filterStudents);
    // console.log("I got clicked");
  }

  return (
    <Container>
      <h1>Estudiantes</h1>
      <hr />
      <div className="top-part">
        <SearchBar onSearch={searchStudent} />
        <Button
          onClick={() => setVisible(true)}
          label="Nuevo Estudiante"
          severity="primary"
          className="new-student-button"
        />
        <Dialog
          visible={visible}
          modal
          header={"Crear nuevo estudiante"}
          footer={footerContent}
          style={{ width: "40vw" }}
          breakpoints={{ "960px": "75vw", "641px": "100vw" }}
          onHide={() => {
            if (!visible) return;
            setVisible(false);
          }}
        >
          <RegisterForm/>
        </Dialog>
      </div>
      <div className="card-flex">
        {studentsData.map(
          ({
            nombre,
            apellido,
            cedula,
            edad,
            curso,
            valorMatricula,
            valorMensualidad,
            saldo,
          }) => (
            <div className="students-div" key={cedula}>
              <Card
                title={nombre + " " + apellido}
                subTitle={cedula}
                className="md:w-20rem md:h-15rem  students-card"
              >
                <div className="dividerCard">
                  <hr />
                </div>

                <p className="m-1">
                  Edad: {edad} <br />
                  Curso: {curso}
                  <br />
                  Matricula: {valorMatricula} <br />
                  Mensualidad: {valorMensualidad} <br />
                  Saldo pendiente: {saldo} <br />
                </p>
                <Tag
                  severity={saldo === 0 ? "success" : "danger"}
                  value={saldo === 0 ? "Paz y salvo" : "En mora"}
                ></Tag>
              </Card>
            </div>
          )
        )}
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
  min-height: 100vh;
  padding: 0 30px;

  .top-part {
    display: flex;
    justify-content: end;
    margin: 20px 50px 20px 0;
  }
	

  .new-student-button {
    margin-left: 20px;
    padding: 2px;
  }
  .card-flex {
    display: flex;
    flex-wrap: wrap;
	justify-content: start;
	gap: 15px;
	margin: 10px 50px 20px 0;
  }
  .p-card {
    padding-top: 10px;
	margin-bottom:15px;
    background: ${(props) => props.theme.bgAlpha};
    color: ${(props) => props.theme.text};
  }
  .p-card-title,
  .p-card-subtitle {
    display: flex;
    justify-content: center;
  }
  .p-card-content {
    padding: 0 15px;
  }
  .students-div {
    margin: 6px;
  }



`;
