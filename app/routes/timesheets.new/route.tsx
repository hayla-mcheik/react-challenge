import { useState } from "react";
import { useLoaderData, Form, redirect, Link } from "react-router";
import { getDB } from "~/db/getDB";
import type { ActionFunction } from "react-router";
import type { CSSProperties } from "react";

interface Employee {
  id: number;
  full_name: string;
}

export async function loader() {
  const db = await getDB();
  const employees = await db.all("SELECT id, full_name FROM employees");
  return { employees };
}

export const action: ActionFunction = async ({ request }) => {
  const formData = await request.formData();
  const employee_id = formData.get("employee_id");
  const start_time = formData.get("start_time");
  const end_time = formData.get("end_time");

  if (new Date(end_time as string) < new Date(start_time as string)) {
    return { error: "End time cannot be before start time." };
  }

  const db = await getDB();
  await db.run(
    "INSERT INTO timesheets (employee_id, start_time, end_time) VALUES (?, ?, ?)",
    [employee_id, start_time, end_time]
  );

  return redirect("/timesheets");
}

export default function NewTimesheetPage() {
  const { employees } = useLoaderData() as { employees: Employee[] };
  const [error, setError] = useState<string | null>(null);

  const handleEndTimeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const startTime = (document.getElementById("start_time") as HTMLInputElement).value;
    const endTime = event.target.value;

    if (new Date(endTime) < new Date(startTime)) {
      setError("End time cannot be before start time.");
    } else {
      setError(null);
    }
  };

  const handleSubmit = (event: React.FormEvent) => {
    const startTime = (event.target as HTMLFormElement).start_time.value;
    const endTime = (event.target as HTMLFormElement).end_time.value;
    
    if (new Date(endTime) < new Date(startTime)) {
      event.preventDefault();
      setError("End time cannot be before start time.");
    }
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.header}>Create New Timesheet</h1>

      <Form method="post" onSubmit={handleSubmit} style={styles.form}>
        {error && <div style={styles.error}>{error}</div>}

        <div style={styles.formGroup}>
          <label htmlFor="employee_id" style={styles.label}>
            Employee
          </label>
          <select
            name="employee_id"
            id="employee_id"
            required
            style={styles.select}
          >
            {employees.map((employee) => (
              <option key={employee.id} value={employee.id}>
                {employee.full_name}
              </option>
            ))}
          </select>
        </div>

        <div style={styles.formGroup}>
          <label htmlFor="start_time" style={styles.label}>
            Start Time
          </label>
          <input
            type="datetime-local"
            name="start_time"
            id="start_time"
            required
            style={styles.input}
          />
        </div>

        <div style={styles.formGroup}>
          <label htmlFor="end_time" style={styles.label}>
            End Time
          </label>
          <input
            type="datetime-local"
            name="end_time"
            id="end_time"
            required
            style={styles.input}
            onChange={handleEndTimeChange}
          />
        </div>

        <button type="submit" style={styles.submitButton}>
          Create Timesheet
        </button>
      </Form>

      <hr style={styles.divider} />

      <div style={styles.navigation}>
        <Link to="/timesheets" style={styles.navLink}>
          Back to Timesheets
        </Link>
        <Link to="/employees" style={styles.navLink}>
          Employees
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
  select: {
    padding: "10px",
    borderRadius: "5px",
    border: "1px solid #ccc",
    fontSize: "16px",
    backgroundColor: "#fff",
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
  error: {
    color: "red",
    fontWeight: "bold",
    marginBottom: "10px",
  },
};