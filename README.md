# FairRPCAPIServer

A secure and production-ready REST API server for interacting with FairCoin's RPC interface. This server provides a web-friendly API layer over FairCoin's JSON-RPC protocol, making it easy to integrate FairCoin functionality into web applications and services.

**FairCoin Website:** [https://fairco.in/](https://fairco.in/)

## Features

- 🔒 **Security First**: Helmet for security headers, rate limiting, and environment-based configuration
- 🚀 **Production Ready**: CORS support, request logging, and error handling
- 📊 **FairCoin Integration**: Direct access to FairCoin RPC methods
- 🛡️ **Rate Limiting**: Built-in protection against abuse
- 📝 **Comprehensive Logging**: Morgan-based HTTP request logging
- 🏥 **Health Checks**: Built-in health endpoint for monitoring

## Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- Access to a FairCoin RPC server
- Git

## Installation

1. **Clone the repository:**

   ```bash
   git clone https://github.com/FairCoinOfficial/FairRPCAPIServer.git
   cd FairRPCAPIServer
   ```

2. **Install dependencies:**

   ```bash
   npm install
   ```

3. **Configure environment variables:**
   Create a `.env` file in the root directory:

   ```env
   PORT=3000
   RPC_USER=your_rpc_username
   RPC_PASS=your_secure_rpc_password
   RPC_PORT=40405
   RPC_HOST=your_faircoin_rpc_host
   ```

   **Security Note:** Never commit your `.env` file to version control. It's already included in `.gitignore`.

## Configuration

### Environment Variables

| Variable | Description | Default | Required |
|----------|-------------|---------|----------|
| `PORT` | Server port | 3000 | No |
| `RPC_USER` | FairCoin RPC username | - | Yes |
| `RPC_PASS` | FairCoin RPC password | - | Yes |
| `RPC_PORT` | FairCoin RPC port | 40405 | Yes |
| `RPC_HOST` | FairCoin RPC host | - | Yes |

## Running the Server

### Development

   ```bash
   npm run dev
   ```

### Production

   ```bash
   npm start
   ```

The server will start on the configured port (default: 3000).

## API Endpoints

### Health Check

- **GET** `/health`
- Returns server status and timestamp

### Network Information

- **GET** `/api/networkinfo`
- Returns FairCoin network information

### Blockchain Information

- **GET** `/api/blockchaininfo`
- Returns blockchain statistics and status

### Peer Information

- **GET** `/api/peerinfo`
- Returns information about connected peers

### Example Response

   ```json
   {
     "version": 210000,
     "subversion": "/FairCoin:2.1.0/",
     "protocolversion": 70016,
     "connections": 8,
     "relayfee": 0.00001
   }
   ```

## Deployment

### Digital Ocean App Platform

1. **Connect your repository:**
   - Go to Digital Ocean App Platform
   - Create a new app from GitHub
   - Select this repository

2. **Configure environment variables:**
   - In your app settings, add the environment variables from your `.env` file
   - Set `NODE_ENV` to `production`

3. **Deploy:**
   - Digital Ocean will automatically build and deploy your app
   - SSL certificates are handled automatically

### Manual Deployment

For other platforms, ensure you:

- Set environment variables in your deployment environment
- Use a process manager like PM2 for production
- Configure reverse proxy (nginx) for additional security

## Security Considerations

- **Change default RPC credentials** before deployment
- **Use strong passwords** for RPC authentication
- **Enable HTTPS** in production (handled automatically by Digital Ocean)
- **Monitor logs** for suspicious activity
- **Keep dependencies updated** for security patches

## Project Development

### Project Structure

```text
FairRPCAPIServer/
├── server.ts          # Main server file
├── package.json       # Dependencies and scripts
├── tsconfig.json      # TypeScript configuration
├── .env               # Environment variables (not committed)
├── .gitignore         # Git ignore rules
└── README.md          # This file
```

### Available Scripts

- `npm start` - Start production server
- `npm run dev` - Start development server with hot reload

## Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/your-feature`
3. Make your changes and test thoroughly
4. Commit your changes: `git commit -am 'Add your feature'`
5. Push to the branch: `git push origin feature/your-feature`
6. Submit a pull request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Support

For issues and questions:

- Open an issue on GitHub
- Check the FairCoin documentation
- Review server logs for error details

## Disclaimer

This software is provided as-is. Always test thoroughly in development before deploying to production. Ensure your FairCoin RPC server is properly secured and monitored.
