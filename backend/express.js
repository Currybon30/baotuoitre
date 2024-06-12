import express from 'express';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import compress from 'compression';
import cors from 'cors';
import helmet from 'helmet';
import qcRoutes from './routes/qc.routes.js';
import exportRoutes from './routes/export.routes.js';
import authRoutes from './routes/auth.routes.js';
import userRoutes from './routes/user.routes.js';

const app = express();
const CURRENT_WORKING_DIR = process.cwd();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(compress());
app.use(helmet());
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/', qcRoutes);
app.use('/', exportRoutes);
app.use('/', authRoutes);
app.use('/', userRoutes);
app.get('/', (req, res) => {
    res.send('Server đang chạy');
});

app.use((err, req, res, next) => {
    if (err.name === 'UnauthorizedError') {
        res.status(401).json({"error" : err.name + ": " + err.message});
    }
    else if (err) {
        res.status(400).json({"error" : err.name + ": " + err.message});
        console.log(err);
    }
})

export default app;