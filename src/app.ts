import compression from "compression";
import cors from "cors";
import express from "express";
import cookieParser from "cookie-parser";
import expresssession from "express-session";
import passport from "passport";
import "./app/config/passport";

import { UserRouter } from "./app/modules/user/user.routes";
import { BlogRouter } from "./app/modules/blog/blog.routers";
import { ProjectRouter } from "./app/modules/project/project.routes";
import { AuthRouters } from "./app/modules/auth/auth.routers";
import { ContactRouter } from "./app/modules/contact/contact.route";
import { globalErrorHandler } from "./app/middlewares/globalErrorHandlers";
import notFound from "./app/middlewares/notFound";

const app = express();

// CORRECT ORDER — BODY PARSERS FIRST!
app.use(
  cors({
    origin: [
      "http://localhost:3000",
      "https://portfolio-frontend-snowy-ten.vercel.app",
    ],
    credentials: true,
  })
);

app.use(express.json()); // 1ST — PARSE JSON FIRST!
app.use(express.urlencoded({ extended: true })); // optional

app.use(cookieParser());

app.use(
  expresssession({
    secret: process.env.SESSION_SECRET || "fallback-secret-change-in-prod",
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: false, // set true in production with HTTPS
      httpOnly: true,
      maxAge: 1000 * 60 * 60 * 24 * 7, // 1 week
    },
  })
);

app.use(passport.initialize());
app.use(passport.session());
app.use(compression());

// Routes
app.use("/api/v1/user", UserRouter);
app.use("/api/v1/blog", BlogRouter);
app.use("/api/v1/project", ProjectRouter);
app.use("/api/v1/auth", AuthRouters);
app.use("/api/v1/contact", ContactRouter);

// Test route
app.get("/", (_req, res) => {
  res.send("API is running");
});

app.use(globalErrorHandler);
app.use(notFound);

export default app;
