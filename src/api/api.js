import axios from 'axios';

// 🛠 Asegúrate de que esta URL apunte a tu backend (local o en producción)
const API_BASE_URL = 'http://localhost:3001/api';

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
