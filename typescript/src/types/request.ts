import { Request } from "express";

type UUID = { traceId?: string };
export type RequestUUID = Request & UUID;
