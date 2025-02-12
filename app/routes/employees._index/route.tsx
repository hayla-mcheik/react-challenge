import { useLoaderData, Link, Form } from "react-router";
import { getDB } from "~/db/getDB";
import { useState } from "react";
import type { CSSProperties } from "react";

interface Employee {
  id: number;
  full_name: string;
  email: string;
  phone: string;
  job_title: string;
  department: string;
  salary: number;
}

export async function loader() {
  const db = await getDB();
  const employees = await db.all("SELECT * FROM employees;");
  return { employees };
}

export default function EmployeesPage() {
  const { employees } = useLoaderData() as { employees: Employee[] };
  const [searchTerm, setSearchTerm] = useState("");

  const filteredEmployees = employees.filter((employee) =>
    employee.full_name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div style={styles.container}>
      <h1 style={styles.header}>Employees List</h1>

      <input
        type="text"
        placeholder="Search by name..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        style={styles.searchBar}
      />
      <div style={styles.tableContainer}>
        <div style={styles.tableHeader}>
          <div style={styles.tableCell}>ID</div>
          <div style={styles.tableCell}>Name</div>
          <div style={styles.tableCell}>Job Title</div>
          <div style={styles.tableCell}>Department</div>
          <div style={styles.tableCell}>Salary</div>
          <div style={styles.tableCell}>Actions</div>
        </div>

        {filteredEmployees.length === 0 ? (
          <div style={styles.noDataMessage}>No employees available</div>
        ) : (
          filteredEmployees.map((employee) => (
            <div key={employee.id} style={styles.tableRow}>
              <div style={styles.tableCell}>{employee.id}</div>
              <div style={styles.tableCell}>
                <Link to={`/employees/${employee.id}`} style={styles.link}>
                  {employee.full_name}
                </Link>
              </div>
              <div style={styles.tableCell}>{employee.job_title}</div>
              <div style={styles.tableCell}>{employee.department}</div>
              <div style={styles.tableCell}>${employee.salary}</div>
              <div style={styles.tableCell}>
                <Link to={`/employees/${employee.id}/edit`} style={styles.editButton}>
                  Edit
                </Link>

                <Form
                  method="post"
                  action={`/employees/${employee.id}/delete`}
                  style={{ display: "inline" }}
                >
                  <button type="submit" style={styles.deleteButton}>
                    Delete
                  </button>
                </Form>
              </div>
            </div>
          ))
        )}
      </div>
      <div style={styles.navigation}>
        <Link to="/employees/new" style={styles.navLink}>
          New Employee
        </Link>
        <Link to="/timesheets/" style={styles.navLink}>
          Timesheets
        </Link>
      </div>
    </div>
  );
}


const styles: { [key: string]: CSSProperties } = {
  container: {
    fontFamily: "Arial, sans-serif",
    padding: "20px",
    maxWidth: "800px",
    margin: "0 auto",
  },
  header: {
    textAlign: "center",
    color: "#333",
  },
  searchBar: {
    width: "100%",
    padding: "10px",
    marginBottom: "20px",
    borderRadius: "5px",
    border: "1px solid #ccc",
  },
  tableContainer: {
    display: "flex",
    flexDirection: "column",
    border: "1px solid #ccc",
    borderRadius: "5px",
    overflow: "hidden",
  },
  tableHeader: {
    display: "flex",
    backgroundColor: "#f4f4f4",
    fontWeight: "bold",
    padding: "10px",
  },
  tableRow: {
    display: "flex",
    padding: "10px",
    borderBottom: "1px solid #ccc",
  },
  tableCell: {
    flex: 1,
    padding: "5px",
  },
  noDataMessage: {
    textAlign: "center",
    color: "#888",
    fontStyle: "italic",
    padding: "20px",
  },
  link: {
    color: "#007bff",
    textDecoration: "none",
  },
  navigation: {
    marginTop: "20px",
    display: "flex",
    justifyContent: "space-between",
  },
  navLink: {
    padding: "10px 20px",
    backgroundColor: "#007bff",
    color: "#fff",
    textDecoration: "none",
    borderRadius: "5px",
  },
  editButton: {
    padding: "5px 10px",
    backgroundColor: "#28a745",
    color: "#fff",
    textDecoration: "none",
    borderRadius: "5px",
    marginRight: "10px",
  },
  deleteButton: {
    padding: "5px 10px",
    backgroundColor: "#dc3545",
    color: "#fff",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
  },
};