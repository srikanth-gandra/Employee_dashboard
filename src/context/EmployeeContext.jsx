import { createContext, useContext, useEffect, useState } from "react";

const EmployeeContext = createContext();

export const EmployeeProvider = ({ children }) => {
  const [employees, setEmployees] = useState([]);
  const [editingEmployee, setEditingEmployee] = useState(null);

  useEffect(() => {
    setEmployees(JSON.parse(localStorage.getItem("employees")) || []);
  }, []);

  const save = (data) => {
    localStorage.setItem("employees", JSON.stringify(data));
    setEmployees(data);
  };

  const addEmployee = (emp) => save([...employees, emp]);

  const updateEmployee = (emp) =>
    save(employees.map(e => (e.id === emp.id ? emp : e)));

  const deleteEmployee = (id) =>
    save(employees.filter(e => e.id !== id));

  return (
    <EmployeeContext.Provider
      value={{
        employees,
        addEmployee,
        updateEmployee,
        deleteEmployee,
        editingEmployee,
        setEditingEmployee
      }}
    >
      {children}
    </EmployeeContext.Provider>
  );
};

export const useEmployee = () => useContext(EmployeeContext);
