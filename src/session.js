import session from "express-session";
import express from "express";
import createMemoryStore from "memorystore";

const memorystore = createMemoryStore(session)
const sessionConfig = {
    secret: 'dallae',
    resave: false,
    saveUninitialized: true,
    store: new memorystore()
}

const sessionMiddleware = session(sessionConfig);
const sessions = {}

export { sessionMiddleware, sessions };