import express from "express";

import {
  addShow,
  getNowPlayingMovies,
  getShows,
  getSingleShow
} from "../controllers/show.controller.js"; 

import { protectAdmin } from "../middleware/auth.js";

const showRouter = express.Router();

// Publicly accessible movies
showRouter.get("/now-playing", getNowPlayingMovies);

// Admin-protected show creation
showRouter.post("/add", protectAdmin, addShow);

// Admin + Public route variations
showRouter.get("/all-show", protectAdmin, getShows);
showRouter.get("/all", getShows);

// Get individual movie show info
showRouter.get("/:movieId", getSingleShow);

export default showRouter;
