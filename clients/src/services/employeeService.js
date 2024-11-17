import axios from 'axios';

const API_URL = "http://localhost:8088";

const getEmployees = (token) => {
  return axios.get(`${API_URL}`);
};

const getEmployee = (id, token) => {
  return axios.get(`${API_URL}/${id}`);
};

const addEmployee = async (data, token) => {
  try {
    const response = await axios.post(`${API_URL}/add`, data);
    return response;
  } catch (error) {
    console.error('Error adding employee:', error.response || error.message);
    throw error;  // Rethrow or handle the error as needed
  }
};


const updateEmployee = (id, data, token) => {
  return axios.put(`${API_URL}/${id}`, data);
};

const deleteEmployee = (id, token) => {
  return axios.delete(`${API_URL}/${id}` );
};

export { getEmployees, getEmployee, addEmployee, updateEmployee, deleteEmployee };
