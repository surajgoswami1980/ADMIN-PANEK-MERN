import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { getEmployees, deleteEmployee } from '../services/employeeService';
import { toast } from 'react-toastify';
import Navbar from './Navbar';

function Dashboard() {
  const [employees, setEmployees] = useState([]);
  const token = localStorage.getItem('token');
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) navigate('/login');
    loadEmployees();
  }, [token, navigate]);

  const loadEmployees = async () => {
    try {
      const { data } = await getEmployees(token);
      setEmployees(data);
    } catch (error) {
      toast.error('Failed to load employees');
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this employee?')) {
      await deleteEmployee(id, token);
      loadEmployees();
      toast.success('Employee deleted successfully');
    }
  };

  return (
    <div>
        {/* <Navbar /> */}
      <h2>Admin Dashboard</h2>
      <Link to="/add-employee">Add New Employee</Link>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Designation</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {employees.map((emp) => (
            <tr key={emp._id}>
              <td>{emp.name}</td>
              <td>{emp.email}</td>
              <td>{emp.designation}</td>
              <td>
                <Link to={`/employees/${emp._id}`}>Edit </Link>
                <Link to="/add-employee">Add </Link>
                <button onClick={() => handleDelete(emp._id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Dashboard;
