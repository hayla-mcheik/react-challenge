import { useLoaderData, Link, Form } from "react-router";
import { getDB } from "~/db/getDB";
import type { CSSProperties } from "react";

interface Timesheet {
  id: number;
  employee_id: number;
  start_time: string;
  end_time: string;
}

export async function loader({ params }: { params: { timesheetId: string } }) {
  const db = await getDB();
  const timesheet = await db.get(
    "SELECT * FROM timesheets WHERE id = ?",
    params.timesheetId
  );
  return { timesheet };
}

export default function TimesheetPage() {
  const { timesheet } = useLoaderData() as { timesheet: Timesheet };
  return (
    <div style={styles.container}>
      <h1 style={styles.header}>Timesheet Details</h1>

      <Form method="post" style={styles.form}>
        <div style={styles.formGroup}>
          <label htmlFor="start_time" style={styles.label}>
            Start Time
          </label>
          <input
            type="datetime-local"
            name="start_time"
            id="start_time"
            defaultValue={timesheet.start_time}
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
            defaultValue={timesheet.end_time}
            required
            style={styles.input}
          />
        </div>

        <button type="submit" style={styles.submitButton}>
          Update Timesheet
        </button>
      </Form>

      <hr style={styles.divider} />

      <div style={styles.navigation}>
        <Link to="/timesheets" style={styles.navLink}>
          Back to Timesheets
        </Link>
        <Link to="/employees/" style={styles.navLink}>
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