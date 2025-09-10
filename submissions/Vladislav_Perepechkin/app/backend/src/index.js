require('dotenv').config();
const express = require('express');

const app = express();
app.use(express.json());

const imeisRouter = require('./routes/imeis');
const fieldsRouter = require('./routes/fields');
const telemetryRouter = require('./routes/telemetry');

app.use('/api/imeis', imeisRouter);
app.use('/api/fields', fieldsRouter);
app.use('/api/telemetry', telemetryRouter);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on: http://localhost:${PORT}`);
});