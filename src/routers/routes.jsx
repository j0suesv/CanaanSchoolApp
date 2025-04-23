import { BrowserRouter, Routes, Route} from "react-router-dom"
import {Inicio} from "../pages/Inicio"
import {Pagos} from "../pages/Pagos"
import {Estudiantes} from "../pages/Estudiantes"
import {Configuracion} from "../pages/Configuracion"


export function MyRoutes(){
	return (
			<Routes>
				<Route path="/" element={ <Inicio/> }/>
				<Route path="pagos" element={ <Pagos/> } />
				<Route path="/estudiantes" element={ <Estudiantes/> } />
				<Route path="/configuracion" element={ <Configuracion/> } />
			</Routes>
	);
	
}