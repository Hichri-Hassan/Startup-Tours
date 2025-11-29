const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const morgan = require('morgan');

/**
 * src/backend/index.js
 * Main application entry point
 */

require('dotenv').config();

const config = require('./src/config');
const apiRoutes = require('./src/routes');
const { errorHandler, notFound } = require('./src/middlewares');

const app = express();

// Middleware
app.use(helmet());
app.use(cors(config.cors));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

if (config.env !== 'test') {
    app.use(morgan('dev'));
}

// Health check routes
app.get('/', (req, res) => {
    res.json({ 
        message: 'Welcome to Startup-Tours API', 
        env: config.env,
        version: '1.0.0'
    });
});

app.get('/health', (req, res) => {
    res.json({
        status: 'ok',
        uptime: process.uptime(),
        env: config.env,
        timestamp: Date.now()
    });
});

// Mount API routes
app.use('/api', apiRoutes);

// 404 handler
app.use(notFound);

// Error handler
app.use(errorHandler);

// Start server when run directly
if (require.main === module) {
    const server = app.listen(config.port, () => {
        // eslint-disable-next-line no-console
        console.log(`Server running on port ${config.port} (env: ${config.env})`);
    });

    const gracefulShutdown = (signal) => {
        // eslint-disable-next-line no-console
        console.log(`Received ${signal}. Shutting down gracefully...`);
        server.close(() => {
            // eslint-disable-next-line no-console
            console.log('Closed out remaining connections.');
            process.exit(0);
        });
        // Force shutdown after 10s
        setTimeout(() => {
            // eslint-disable-next-line no-console
            console.error('Forcing shutdown.');
            process.exit(1);
        }, 10000).unref();
    };

    process.on('SIGTERM', () => gracefulShutdown('SIGTERM'));
    process.on('SIGINT', () => gracefulShutdown('SIGINT'));
}

module.exports = app;