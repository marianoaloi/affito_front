
import * as admin from "firebase-admin";
import { NextFunction, Request, Response } from "express";

// Initialize Firebase Admin SDK explicitly with project ID
// This helps resolve 'Failed to determine project ID' errors,
// especially during local emulation or if environment variables are not picked up automatically.
admin.initializeApp({ projectId: process.env.GCLOUD_PROJECT });


// Middleware to verify Firebase ID Token
const authenticate = async (req: Request, res: Response, next: NextFunction) => {
  if (!req.headers.authorization || !req.headers.authorization.startsWith("Bearer ")) {
    console.error("No Firebase ID token was passed as a Bearer token in the Authorization header.",
        "Make sure you authorize your request by providing the following HTTP header:",
        "    Authorization: Bearer <Firebase ID Token>");
    res.status(403).send("Unauthorized");
    return;
  }

  const idToken = req.headers.authorization.split("Bearer ")[1];

  try {
    const decodedIdToken = await admin.auth().verifyIdToken(idToken);
    (req as any).user = decodedIdToken; // Attach decoded token to request
    next();
  } catch (error) {
    console.error("Error while verifying Firebase ID token:", error);
    res.status(403).send("Unauthorized");
  }
};

export default authenticate;
