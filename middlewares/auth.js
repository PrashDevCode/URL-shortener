import { getUserIdFromSession } from "../services/auth.js";


async function restrictToLoggedInUserOnly(req, res, next) {
    const sessionId = req.cookies?.sessionId;

    if (!sessionId) {
        return res.status(401).send("Unauthorized: No session ID");
    }   
    if (!getUserIdFromSession(sessionId)) {
        return res.status(401).send("Unauthorized: Invalid session ID");
    }
    req.userId = getUserIdFromSession(sessionId);
    next();
}

export default restrictToLoggedInUserOnly;