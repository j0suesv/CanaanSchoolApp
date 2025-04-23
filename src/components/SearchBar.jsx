import styled from 'styled-components';
import { IoMdSearch } from "react-icons/io";   
import {useState} from "react"

export function SearchBar(props){
    
    const [input, setInput]=useState("")


    function handleChange(e) {
        const newSearch = e.target.value
		setInput(newSearch)
		props.onSearch(newSearch)
    }

	return (
		<Container>
			<div className='input-wrapper'>
					<div  className='search-icon'><IoMdSearch/></div>
					<input onChange={handleChange} value={input} type="text" className='input-search' placeholder='  Buscar estudiante...'/>
			</div>
		</Container>
	);
	
}

const Container = styled.div`
	.input-wrapper{
		display: flex;
		justify-content: center;
		align-items:center;
		height: 40px;
		width: 300px;
		border-radius: 50px;
		background: #fff;

		.input-search{
			width: 250px;
			height: 28px;
			margin-left: 10px;
			border: none;
			outline:none;
		}
		input:focus{
			
		}

	}
	.search-icon{
		display: flex;
		justify-content: center;
		align-items:center;
		font-size: 25px;
	}
` ;