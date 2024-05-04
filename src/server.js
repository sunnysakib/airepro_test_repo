const http = require('http');
const app = require('./app');
const { cronJob } = require('./utils/cronJob');
const { dbConnect } = require('./utils/dbConnect');

const server = http.createServer(app);

const PORT = process.env.PORT || 5000;

async function startServer() {
    await dbConnect();
    await cronJob();
    server.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`)
    })
}

startServer()