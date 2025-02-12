import { redirect, type ActionFunction } from "react-router";
import { getDB } from "~/db/getDB";

export const action: ActionFunction = async ({ params }) => {
  const id = params.timesheetId; 

  const db = await getDB();
  await db.run("DELETE FROM timesheets WHERE id = ?", [id]);

  return redirect("/timesheets");
};