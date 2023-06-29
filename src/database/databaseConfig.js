import path from "path";
import {JSONFile} from "lowdb/node";
import {Low} from "lowdb";

const __dirname = path.resolve();
const file = path.join(__dirname, 'db.json')

const adapter = new JSONFile(file)
export const db = new Low(adapter, { users: [], posts: [] })
await db.read()