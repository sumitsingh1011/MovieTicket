
import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import { connectToDB } from './config/DBConnect.js';
import { clerkMiddleware, clerkClient, requireAuth, getAuth } from '@clerk/express'


//inngest dependency
import { serve } from "inngest/express";
import { inngest, functions } from "./inngest/index.js"
import showRouter from './routes/shows.routes.js';
import bookingRoutes from './routes/booking.routes.js';
import adminRouter from './routes/admin.route.js';




const app = express();



//Middleware for app
app.use(express.json())
app.use(cors({ origin: ["http://localhost:5173"] }))
app.use(clerkMiddleware())



app.get("/api/check-auth", async (req, res) => {
  const { userId, sessionId } = getAuth(req);

  if (!userId) {
    return res.status(401).json({ success: false, message: "Unauthorized - No userId" });
  }

  try {
    const user = await clerkClient.users.getUser(userId);

    res.json({
      success: true,
      userId,
      email: user?.emailAddresses?.[0]?.emailAddress,
      role: user.privateMetadata?.role || 'none',
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});




const port = process.env.PORT || 5476;

app.listen(port, () => {
    console.log("Server running on port ", port)
})

await connectToDB()  // connect to database


app.get("/", (req, res) => { // basic api request
    res.send("Server is live")
})
app.use("/api/inngest", serve({ client: inngest, functions }));


app.use("/api/show", showRouter)
app.use("/api/booking", bookingRoutes)
app.use("/api/admin", adminRouter)