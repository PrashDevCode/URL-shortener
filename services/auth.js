const sessionIdToUserIdMap = new Map();

export function createSession(sessionId, userId) {
  sessionIdToUserIdMap.set(sessionId, userId);
}

export function getUserIdFromSession(sessionId) {
  return sessionIdToUserIdMap.get(sessionId);
}
