import React, { useState } from 'react';
import { addEmployee } from '../services/employeeService';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import Navbar from './Navbar';
function EmployeeForm() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [mobile, setMobile] = useState('');
  const [designation, setDesignation] = useState('');
  const [gender, setGender] = useState('');
  const [course, setCourse] = useState(''); // For array of courses
  const [image, setImage] = useState(null); // For image upload
  const token = localStorage.getItem('token');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Basic validation
    if (!name || !email || !mobile || !designation || !gender || !course) {
      toast.error('Please fill in all required fields.');
      return;
    }

    const newEmployee = { name, email, mobile, designation, gender, course};

    try {
      const response = await addEmployee(newEmployee, token);
      toast.success('Employee added successfully!');
      navigate('/dashboard');
    } catch (error) {
      if (error.response) {
        // Backend response errors
        toast.error(`Failed to add employee: ${error.response.data.message}`);
      } else {
        // Other errors
        toast.error('An error occurred while adding employee');
      }
    }
  };

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  return (
    <div>
      <Navbar />
      <h2>Add New Employee</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} />
        <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        <input type="text" placeholder="Mobile" value={mobile} onChange={(e) => setMobile(e.target.value)} required />
        {/* <input type="text" placeholder="Designation" value={designation}  required/> */}
        <select value={designation} onChange={(e) => setDesignation(e.target.value)} required>
          <option value="">Select Degisnation</option>
          <option value="HR">Male</option>
          <option value="Manager">Female</option>
          <option value="Sales">Sales</option>
        </select>
        <select value={gender} onChange={(e) => setGender(e.target.value)} required>
          <option value="">Select Gender</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
        </select>
        <input type="text" placeholder="course"  onChange={(e) => setCourse(e.target.value)} required />
        
        <button type="submit">Add Employee</button>
      </form>
    </div>
  );
}

export default EmployeeForm;
