import React, { useState } from 'react'
import styled from 'styled-components';
import {ThemeProvider} from 'styled-components';
import './App.css'
import "primereact/resources/themes/lara-light-cyan/theme.css";   
import {MyRoutes} from "./routers/routes"    
import { BrowserRouter} from "react-router-dom"
import {Sidebar} from "./components/Sidebar"
import {Light,Dark} from "./styles/Themes"


export const ThemeContext = React.createContext(null);

export default function App() {
	const [theme, setTheme] = useState ("light");
	const themeStyle = theme === "light" ? Light : Dark;
	
	const [sidebarOpen, setSidebarOpen] = useState(false)
	
    return (
        <>

		
			<ThemeContext.Provider value = {{setTheme, theme}} >
				<ThemeProvider theme= {themeStyle}>
				<BrowserRouter>
					<Container className= {sidebarOpen?"SidebarState active": ""}>		
						
								<Sidebar 
								sidebarOpen={sidebarOpen} 
								setSidebarOpen ={setSidebarOpen} 
								/>						
						
								<MyRoutes/>
					
					</Container>
				</BrowserRouter>
				</ThemeProvider>
			</ThemeContext.Provider>
	
		</>
    )
}

const Container = styled.div`
	display: grid;
  	grid-template-columns: 90px auto;
  	background: ${({ theme }) => theme.bgtotal};
  	transition:all 0.3s ;
	&.active {
		grid-template-columns: 300px auto;
	}
	color:${({theme})=>theme.text};
`;
