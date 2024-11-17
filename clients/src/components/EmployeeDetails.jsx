import React, { useState, useEffect } from 'react';
import { addEmployee, getEmployee, updateEmployee } from '../services/employeeService';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import Navbar from './Navbar';
function EmployeeForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    mobile: '',
    designation: '',
    gender: '',
    course: '',
  });
  const { id } = useParams();
  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  useEffect(() => {
    if (id) loadEmployee();
  }, [id]);

  const loadEmployee = async () => {
    try {
      const { data } = await getEmployee(id, token);
      setFormData(data);
    } catch (error) {
      toast.error('Failed to load employee details');
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Exclude `_id` from the data sent to the server
      const { _id,__v, ...payload } = formData;
  
      if (id) {
        await updateEmployee(id, payload, token); // Update existing employee
        toast.success('Employee updated successfully');
      } else {
        await addEmployee(payload, token); // Add new employee
        toast.success('Employee added successfully');
      }
  
      navigate('/dashboard');
    } catch (error) {
      console.error(error);
      toast.error(
        error.response?.data || 'Operation failed. Please try again.'
      );
    }
  };
  

  return (
    <div>
      <Navbar />
    <form onSubmit={handleSubmit}>
      <h2>{id ? 'Edit Employee' : 'Add New Employee'}</h2>
      <input name="name" value={formData.name} onChange={handleChange} placeholder="Name" />
      <input name="email" value={formData.email} onChange={handleChange} placeholder="Email" />
      <input name="mobile" value={formData.mobile} onChange={handleChange} placeholder="Mobile" />
      <select name="gender" value={formData.gender} onChange={handleChange} required>
        <option value="">Select Gender</option>
        <option value="Male">Male</option>
        <option value="Female">Female</option>
      </select>
      <select name="designation" value={formData.designation} onChange={handleChange}>
        <option value="">Select Designation</option>
        <option value="HR">HR</option>
        <option value="Manager">Manager</option>
        <option value="Sales">Sales</option>
      </select>
      <input
        name="course"
        type="text"
        value={formData.course}
        onChange={handleChange}
        placeholder="Course"
      />
      <button type="submit"> 'Update'</button>
    </form>
    </div>
  );
}

export default EmployeeForm;
