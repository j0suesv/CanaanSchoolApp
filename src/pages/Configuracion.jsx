import styled from 'styled-components';
import { useState } from 'react';
import { InputText } from 'primereact/inputtext';
import { Password } from 'primereact/password';
import { Dropdown } from 'primereact/dropdown';
import { Button } from 'primereact/button';

export function Configuracion() {
    const [nombreColegio, setNombreColegio] = useState('');
    const [usuario, setUsuario] = useState('');
    const [contrasena, setContrasena] = useState('');
    const [moneda, setMoneda] = useState('COP');
    const [email, setEmail] = useState('');
    const [telefono, setTelefono] = useState('');
    const [direccion, setDireccion] = useState('');

    const monedas = [
        { label: 'Peso Colombiano (COP)', value: 'COP' },
        { label: 'Dólar Estadounidense (USD)', value: 'USD' },
        { label: 'Euro (EUR)', value: 'EUR' },
    ];

    const guardarConfiguracion = () => {
        const config = {
            nombreColegio,
            usuario,
            contrasena,
            moneda,
            email,
            telefono,
            direccion
        };
        console.log('Configuración guardada:', config);
        // Aquí podrías hacer una petición a tu backend para guardar los datos
    };

    return (
        <PageContainer>
            <h1>Configuración</h1>
            <FormGroup>
                <label htmlFor="nombreColegio">Nombre del colegio</label>
                <InputText id="nombreColegio" value={nombreColegio} onChange={(e) => setNombreColegio(e.target.value)} className="input" />
            </FormGroup>
            <FormGroup>
                <label htmlFor="usuario">Usuario</label>
                <InputText id="usuario" value={usuario} onChange={(e) => setUsuario(e.target.value)} className="input" />
            </FormGroup>
            <FormGroup>
                <label htmlFor="contrasena">Contraseña</label>
                <Password id="contrasena" value={contrasena} onChange={(e) => setContrasena(e.target.value)} toggleMask className="input" feedback={false} />
            </FormGroup>
            <FormGroup>
                <label htmlFor="moneda">Moneda</label>
                <Dropdown id="moneda" value={moneda} options={monedas} onChange={(e) => setMoneda(e.value)} className="input" />
            </FormGroup>
            <FormGroup>
                <label htmlFor="email">Correo electrónico</label>
                <InputText id="email" value={email} onChange={(e) => setEmail(e.target.value)} className="input" />
            </FormGroup>
            <FormGroup>
                <label htmlFor="telefono">Teléfono</label>
                <InputText id="telefono" value={telefono} onChange={(e) => setTelefono(e.target.value)} className="input" />
            </FormGroup>
            <FormGroup>
                <label htmlFor="direccion">Dirección</label>
                <InputText id="direccion" value={direccion} onChange={(e) => setDireccion(e.target.value)} className="input" />
            </FormGroup>
            <Button severity= "primary" label="Guardar configuración" onClick={guardarConfiguracion}  />
        </PageContainer>
    );
}

const PageContainer = styled.div`
    min-height: 100vh;
    padding: 50px;
    display: flex;
    flex-direction: column;
    align-items: flex-start;

    h1 {
        color: ${(props) => props.theme.text};
        margin-bottom: 30px;
        font-size: 1.8rem;
    }

    @media (max-width: 768px) {
        padding: 20px;
        h1 {
            font-size: 1.5rem;
        }
    }

    @media (max-width: 480px) {
        padding: 15px;
        h1 {
            font-size: 1.3rem;
        }
    }
`;

const FormGroup = styled.div`
    margin-bottom: 20px;
    width: 100%;
    max-width: 600px;

    label {
        display: block;
        margin-bottom: 5px;
        font-weight: 600;
        color: ${(props) => props.theme.text};
    }

    .input {
        width: 100%;
        max-width: 100%;
        height: 40px;
        font-size: 1rem;
        padding: 0.5rem;
        margin-top: 5px;
    }

    .p-password input {
        width: 40vw;
        max-width: 40vw;
        height: 40px; /* Asegura que el input de contraseña tenga el mismo tamaño */
        font-size: 1rem;
        padding: 0.5rem;
        margin-left:-5px;
    }

    @media (max-width: 768px) {
        .input {
            font-size: 0.9rem;
        }
        .p-password input {
            font-size: 0.9rem;
        }
    }

    @media (max-width: 480px) {
        .input {
            font-size: 0.8rem;
        }
        .p-password input {
            font-size: 0.8rem;
        }
    }
`;
