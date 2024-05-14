import config from './backend/config/config.js';
import app from './backend/express.js';
import mongoose from 'mongoose';

mongoose.Promise = global.Promise;
mongoose.connect(config.mongoUri)
    .then(() => console.log('MongoDB connected...'))
    .catch(err => console.log(err));

app.listen(config.port, (err) => {
    if (err) {
        console.log(err);
    }
    console.info('Server started on port %s.', config.port);
});