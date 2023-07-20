import { drizzle } from "drizzle-orm/planetscale-serverless";
import { connect } from "@planetscale/database";

// create the connection
const connection = connect({
    host: process.env["host"],
    username: process.env["username"],
    password: process.env["password"],
});

const db = drizzle(connection);
