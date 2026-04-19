// src/config/logger.js
const winston = require('winston');
const path = require('path');

// Define log format
const logFormat = winston.format.combine(
  winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
  winston.format.errors({ stack: true }),
  winston.format.splat(),
  winston.format.json()
);

// Create Winston Logger
const logger = winston.createLogger({
  level: 'info',
  format: logFormat,
  transports: [
    // Console log (with colors for development)
    new winston.transports.Console({
      format: winston.format.combine(
        winston.format.colorize(),
        winston.format.simple()
      )
    }),
    
    // Error logs file
    new winston.transports.File({ 
      filename: path.join('logs', 'error.log'), 
      level: 'error' 
    }),
    
    // All logs file
    new winston.transports.File({ 
      filename: path.join('logs', 'combined.log') 
    })
  ]
});

// Create logs folder if not exists
const fs = require('fs');
if (!fs.existsSync('logs')) {
  fs.mkdirSync('logs');
}

module.exports = logger;