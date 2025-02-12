import { useLoaderData, Form, redirect } from "react-router";
import { getDB } from "~/db/getDB";
import type { CSSProperties } from "react"; 

interface Employee {
  phone: string | number | readonly string[] | undefined;
  id: number;
  full_name: string;
  email: string;
  job_title: string;
  department: string;
  salary: number;
}

export async function loader({ params }: { params: { employeeId: string } }) {
  const db = await getDB();
  const employee = await db.get(
    "SELECT * FROM employees WHERE id = ?",
    params.employeeId
  );
  return { employee };
}

export async function action({ request, params }: { request: Request; params: { employeeId: string } }) {
  const formData = await request.formData();
  const id = params.employeeId;
  const full_name = formData.get("full_name");
  const email = formData.get("email");
  const phone = formData.get("phone");
  const job_title = formData.get("job_title");
  const department = formData.get("department");
  const salary = formData.get("salary");

  const db = await getDB();
  await db.run(
    "UPDATE employees SET full_name = ?, email = ?, phone = ?, job_title = ?, department = ?, salary = ? WHERE id = ?",
    [full_name, email, phone, job_title, department, salary, id]
  );

  return redirect("/employees");
}

export default function EmployeeEditPage() {
  const { employee } = useLoaderData() as { employee: Employee };
  return (
    <div style={styles.container}>
      <h1 style={styles.header}>Edit Employee</h1>


      <Form method="post" style={styles.form}>
        <div style={styles.formGroup}>
          <label htmlFor="full_name" style={styles.label}>
            Full Name
          </label>
          <input
            type="text"
            name="full_name"
            id="full_name"
            defaultValue={employee.full_name}
            required
            style={styles.input}
          />
        </div>

        <div style={styles.formGroup}>
          <label htmlFor="email" style={styles.label}>
            Email
          </label>
          <input
            type="email"
            name="email"
            id="email"
            defaultValue={employee.email}
            required
            style={styles.input}
          />
        </div>

        <div style={styles.formGroup}>
          <label htmlFor="phone" style={styles.label}>
            Phone Number
          </label>
          <input
            type="tel"
            name="phone"
            id="phone"
            defaultValue={employee.phone}
            required
            style={styles.input}
          />
        </div>

        <div style={styles.formGroup}>
          <label htmlFor="job_title" style={styles.label}>
            Job Title
          </label>
          <input
            type="text"
            name="job_title"
            id="job_title"
            defaultValue={employee.job_title}
            required
            style={styles.input}
          />
        </div>

        <div style={styles.formGroup}>
          <label htmlFor="department" style={styles.label}>
            Department
          </label>
          <input
            type="text"
            name="department"
            id="department"
            defaultValue={employee.department}
            required
            style={styles.input}
          />
        </div>

        <div style={styles.formGroup}>
          <label htmlFor="salary" style={styles.label}>
            Salary
          </label>
          <input
            type="number"
            name="salary"
            id="salary"
            defaultValue={employee.salary}
            required
            style={styles.input}
          />
        </div>

        <button type="submit" style={styles.submitButton}>
          Save Changes
        </button>
      </Form>
    </div>
  );
}

const styles: { [key: string]: CSSProperties } = {
  container: {
    fontFamily: "Arial, sans-serif",
    padding: "20px",
    maxWidth: "600px",
    margin: "0 auto",
    backgroundColor: "#f9f9f9",
    borderRadius: "10px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
  },
  header: {
    textAlign: "center",
    color: "#333",
    marginBottom: "20px",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "15px",
  },
  formGroup: {
    display: "flex",
    flexDirection: "column",
    gap: "5px",
  },
  label: {
    fontWeight: "bold",
    color: "#555",
    fontSize: "14px",
  },
  input: {
    padding: "10px",
    borderRadius: "5px",
    border: "1px solid #ccc",
    fontSize: "16px",
    backgroundColor: "#fff",
    transition: "border-color 0.3s ease",
  },
  submitButton: {
    padding: "10px 20px",
    backgroundColor: "#007bff",
    color: "#fff",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    fontSize: "16px",
    marginTop: "10px",
    transition: "background-color 0.3s ease",
  },
};