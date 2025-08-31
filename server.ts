import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import rateLimit from "express-rate-limit";
import dotenv from "dotenv";

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

const RPC_USER = process.env.RPC_USER;
const RPC_PASS = process.env.RPC_PASS;
const RPC_PORT = process.env.RPC_PORT;
const RPC_HOST = process.env.RPC_HOST;

// Validate required environment variables
if (!RPC_USER || !RPC_PASS || !RPC_PORT || !RPC_HOST) {
  console.error("Missing required environment variables: RPC_USER, RPC_PASS, RPC_PORT, RPC_HOST");
  process.exit(1);
}

// Middleware
app.use(helmet()); // Security headers
app.use(cors()); // Enable CORS
app.use(morgan("combined")); // Logging
app.use(express.json()); // Parse JSON bodies

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  message: "Too many requests from this IP, please try again later.",
});
app.use(limiter);

// RPC call function with error handling
async function callRpc(method: string, params: any[] = []) {
  try {
    const res = await fetch(`http://${RPC_HOST}:${RPC_PORT}/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization":
          "Basic " + Buffer.from(`${RPC_USER}:${RPC_PASS}`).toString("base64"),
      },
      body: JSON.stringify({
        jsonrpc: "1.0",
        id: "faircoin",
        method,
        params,
      }),
    });

    if (!res.ok) {
      throw new Error(`RPC request failed with status ${res.status}`);
    }

    const data = await res.json();
    if (data.error) throw new Error(data.error.message);
    return data.result;
  } catch (error: any) {
    console.error(`RPC call error for method ${method}:`, error.message);
    throw error;
  }
}

// API endpoints with improved error handling
app.get("/api/networkinfo", async (_req, res) => {
  try {
    const info = await callRpc("getnetworkinfo");
    res.json(info);
  } catch (e: any) {
    console.error("Error in /api/networkinfo:", e.message);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.get("/api/blockchaininfo", async (_req, res) => {
  try {
    const info = await callRpc("getblockchaininfo");
    res.json(info);
  } catch (e: any) {
    console.error("Error in /api/blockchaininfo:", e.message);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.get("/api/peerinfo", async (_req, res) => {
  try {
    const info = await callRpc("getpeerinfo");
    res.json(info);
  } catch (e: any) {
    console.error("Error in /api/peerinfo:", e.message);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.get("/api/mininginfo", async (_req, res) => {
  try {
    const info = await callRpc("getmininginfo");
    res.json(info);
  } catch (e: any) {
    console.error("Error in /api/mininginfo:", e.message);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Health check endpoint
app.get("/health", (_req, res) => {
  res.json({ status: "OK", timestamp: new Date().toISOString() });
});

// Global error handler
app.use((err: any, _req: express.Request, res: express.Response, _next: express.NextFunction) => {
  console.error("Unhandled error:", err);
  res.status(500).json({ error: "Internal server error" });
});

// Start server
app.listen(PORT, () => {
  console.log(`FairServer running at http://localhost:${PORT}`);
});
