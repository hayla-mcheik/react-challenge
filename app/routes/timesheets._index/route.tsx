import { useLoaderData, Link } from "react-router";
import { useState } from "react";
import { getDB } from "~/db/getDB";
import type { CSSProperties } from "react"; 


interface Timesheet {
  id: number;
  employee_id: number;
  full_name: string;
  start_time: string;
  end_time: string;
}

export async function loader() {
  const db = await getDB();
  const timesheetsAndEmployees = await db.all(
    "SELECT timesheets.*, employees.full_name, employees.id AS employee_id FROM timesheets JOIN employees ON timesheets.employee_id = employees.id"
  );
  return { timesheetsAndEmployees };
}

export default function TimesheetsPage() {
  const { timesheetsAndEmployees } = useLoaderData() as {
    timesheetsAndEmployees: Timesheet[];
  };
  const [view, setView] = useState<"table" | "calendar">("table");

  return (
    <div style={styles.container}>
      <h1 style={styles.header}>Timesheets</h1>

      <div style={styles.viewToggle}>
        <button
          onClick={() => setView("table")}
          style={view === "table" ? styles.activeButton : styles.button}
        >
          Table View
        </button>
        <button
          onClick={() => setView("calendar")}
          style={view === "calendar" ? styles.activeButton : styles.button}
        >
          Calendar View
        </button>
      </div>

      {view === "table" ? (
        <div style={styles.tableContainer}>
          <div style={styles.tableHeader}>
            <div style={styles.tableCell}>ID</div>
            <div style={styles.tableCell}>Employee</div>
            <div style={styles.tableCell}>Start Time</div>
            <div style={styles.tableCell}>End Time</div>
          </div>
          {timesheetsAndEmployees.map((timesheet) => (
            <div key={timesheet.id} style={styles.tableRow}>
              <div style={styles.tableCell}>{timesheet.id}</div>
              <div style={styles.tableCell}>{timesheet.full_name}</div>
              <div style={styles.tableCell}>{timesheet.start_time}</div>
              <div style={styles.tableCell}>{timesheet.end_time}</div>
            </div>
          ))}
        </div>
      ) : (
        <div style={styles.calendarPlaceholder}>
          <p>
            To implement, see{" "}
            <a
              href="https://schedule-x.dev/docs/frameworks/react"
              style={styles.link}
            >
              Schedule X React documentation
            </a>
            .
          </p>
        </div>
      )}

      <hr style={styles.divider} />

      <div style={styles.navigation}>
        <Link to="/timesheets/new" style={styles.navLink}>
          New Timesheet
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
    maxWidth: "800px",
    margin: "0 auto",
  },
  header: {
    textAlign: "center",
    color: "#333",
    marginBottom: "20px",
  },
  viewToggle: {
    display: "flex",
    justifyContent: "center",
    gap: "10px",
    marginBottom: "20px",
  },
  button: {
    padding: "10px 20px",
    backgroundColor: "#007bff",
    color: "#fff",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    fontSize: "16px",
  },
  activeButton: {
    padding: "10px 20px",
    backgroundColor: "#0056b3",
    color: "#fff",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    fontSize: "16px",
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
  calendarPlaceholder: {
    textAlign: "center",
    padding: "20px",
    backgroundColor: "#f9f9f9",
    borderRadius: "5px",
    border: "1px solid #ccc",
  },
  link: {
    color: "#007bff",
    textDecoration: "none",
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