import axios from 'axios';

const API_BASE_URL = "https://canaanschoolapp-production.up.railway.app/api";

/* ========= ESTUDIANTES ========= */

export const getEstudiantes = () => {
  return axios.get(`${API_BASE_URL}/estudiantes`);
};

export const crearEstudiante = (data) => {
  return axios.post(`${API_BASE_URL}/estudiantes`, data);
};

export const editarEstudiante = (id, data) => {
  return axios.put(`${API_BASE_URL}/estudiantes/${id}`, data);
};

export const eliminarEstudiante = (id) => {
  return axios.delete(`${API_BASE_URL}/estudiantes/${id}`);
};

/* ========= PAGOS ========= */

export const getPagos = () => {
  return axios.get(`${API_BASE_URL}/pagos`);
};
export const getEstadisticas= () => {
  return axios.get(`${API_BASE_URL}/pagos/estadisticas`);
};

export const crearPago = (data) => {
  return axios.post(`${API_BASE_URL}/pagos`, data);
};

export const editarPago = (id, data) => {
  return axios.put(`${API_BASE_URL}/pagos/${id}`, data);
};

export const eliminarPago = (id) => {
  return axios.delete(`${API_BASE_URL}/pagos/${id}`);
};
