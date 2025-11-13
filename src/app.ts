import compression from "compression";
import cors from "cors";
import express from "express";
import { UserRouter } from "./app/modules/user/user.routes";
import { BlogRouter } from "./app/modules/blog/blog.routers";
import { ProjectRouter } from "./app/modules/project/project.routes";
import { AuthRouters } from "./app/modules/auth/auth.routers";
import { globalErrorHandler } from "./app/middlewares/globalErrorHandlers";
import notFound from "./app/middlewares/notFound";
import cookieParser from "cookie-parser";
import passport from "passport";
import expresssession from "express-session";
import "./app/config/passport"
const app = express();

// Middleware
app.use(expresssession({
  secret: "your secret",
  resave:false,
  saveUninitialized:false
}))
app.use(passport.initialize())
app.use(passport.session())
app.use(cookieParser()); // Parse cookie
app.use(cors()); // Enables Cross-Origin Resource Sharing
app.use(compression()); // Compresses response bodies for faster delivery
app.use(express.json()); // Parse incoming JSON requests

app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);
app.use("/api/v1/user",UserRouter)
app.use("/api/v1/blog",BlogRouter)
app.use("/api/v1/project",ProjectRouter)
app.use("/api/v1/auth",AuthRouters)

// Default route for testing
app.get("/", (_req, res) => {
  res.send("API is running");
});


app.use(globalErrorHandler)
app.use(notFound)

export default app;
