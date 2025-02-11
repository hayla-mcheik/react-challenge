import { redirect, type ActionFunction } from "react-router";
import { getDB } from "~/db/getDB";

export const action: ActionFunction = async ({ params }) => {
  const id = params.employeeId; 

  const db = await getDB();
  await db.run("DELETE FROM employees WHERE id = ?", [id]);

  return redirect("/employees");
};