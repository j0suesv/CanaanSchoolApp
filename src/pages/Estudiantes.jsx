import styled from "styled-components";
import { Card } from "primereact/card";
import { Button } from "primereact/button";
import { Tag } from "primereact/tag";
import { SearchBar } from "../components/SearchBar";
import { useEffect, useState } from "react";
import { Dialog } from "primereact/dialog";
import RegisterForm from "../components/RegisterForm";
import { getEstudiantes, crearEstudiante } from "../api/api";

export function Estudiantes() {
  const [studentsData, setStudentsData] = useState([]);
  const [visible, setVisible] = useState(false);
  const [filteredData, setFilteredData] = useState([]);

  useEffect(() => {
    fetchEstudiantes();
  }, []);

  const fetchEstudiantes = async () => {
    try {
      const res = await getEstudiantes();
      setStudentsData(res.data);
      setFilteredData(res.data);
    } catch (err) {
      console.error("Error cargando estudiantes:", err);
    }
  };

  const handleCrearEstudiante = async (data) => {
    await crearEstudiante(data);
    fetchEstudiantes();
    setVisible(false);
  };

  const searchStudent = (input) => {
    const filter = studentsData.filter((student) =>
      student.nombre.toLowerCase().includes(input.toLowerCase()) ||
      student.apellido.toLowerCase().includes(input.toLowerCase())
    );
    setFilteredData(filter);
  };

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
          onHide={() => setVisible(false)}
        >
          <RegisterForm onSubmit={handleCrearEstudiante} />
        </Dialog>
      </div>
      <div className="card-flex">
        {filteredData.map(
          ({
            id,
            nombre,
            apellido,
            cedula,
            edad,
            curso,
            valor_matricula,
            valor_mensualidad,
            saldo,
          }) => (
            <div className="students-div" key={id}>
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
                  Matricula: {valor_matricula} <br />
                  Mensualidad: {valor_mensualidad} <br />
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
    margin-bottom: 15px;
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