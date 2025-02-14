import e from "express";
import cors from "cors";
import { rateLimit } from "express-rate-limit";
import { _tts } from "./tts.js";


const app = e();
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  limit: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes).
  standardHeaders: "draft-8", // draft-6: `RateLimit-*` headers; draft-7 & draft-8: combined `RateLimit` header
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers.
  // store: ... , // Redis, Memcached, etc. See below.
});
const port =  3000;

/// middleware
app.use(e.json());
app.use(cors());
app.use(limiter);

app.get("/", (req, res) => {
  res.json({ msg: "ttsfree-api", time: new Date() });
});

app.get("/ttsfree", async (req, res) => {
  console.log(req.query.text);

  const arrayBuffer = await (await _tts(req.query.text)).arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);

  res.setHeader("Content-Type", "audio/wav");
  res.setHeader("Content-Length", buffer.length);
  res.write(buffer);
  res.end();
});

app.listen(port, () => console.log(`http://localhost:${port}`));
