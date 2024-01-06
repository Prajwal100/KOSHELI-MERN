import express from 'express'
import v1 from './v1';
import path from 'path';
const app= express();
app.use("/uploads", express.static(path.join(__dirname, "..", "..", "uploads")));

app.use("/v1",v1);
export default app;