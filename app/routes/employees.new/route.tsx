import { Form, Link, redirect, type ActionFunction } from "react-router";
import { getDB } from "~/db/getDB";
import type { CSSProperties } from "react"; 


export const action: ActionFunction = async ({ request }) => {
  const formData = await request.formData();
  const full_name = formData.get("full_name");
  const email = formData.get("email");
  const phone = formData.get("phone");
  const job_title = formData.get("job_title");
  const department = formData.get("department");
  const salary = formData.get("salary");

  const db = await getDB();
  await db.run(
    "INSERT INTO employees (full_name, email, phone, job_title, department, salary) VALUES (?, ?, ?, ?, ?, ?)",
    [full_name, email, phone, job_title, department, salary]
  );

  return redirect("/employees");
}

export default function NewEmployeePage() {
  return (
    <div style={styles.container}>
      <h1 style={styles.header}>Create New Employee</h1>

      <Form method="post" style={styles.form}>
        <div style={styles.formGroup}>
          <label htmlFor="full_name" style={styles.label}>
            Full Name
          </label>
          <input
            type="text"
            name="full_name"
            id="full_name"
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
            required
            style={styles.input}
          />
        </div>

        <button type="submit" style={styles.submitButton}>
          Create Employee
        </button>
      </Form>

      <hr style={styles.divider} />

      <div style={styles.navigation}>
        <Link to="/employees" style={styles.navLink}>
          Back to Employees
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
    maxWidth: "600px",
    margin: "0 auto",
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
  },
  input: {
    padding: "10px",
    borderRadius: "5px",
    border: "1px solid #ccc",
    fontSize: "16px",
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
  },
  divider: {
    border: "none",
    borderTop: "1px solid #ccc",
    margin: "20px 0",
  },
  navigation: {
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
};