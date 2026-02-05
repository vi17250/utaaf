import { Request } from "express";

type UUID = { requestId?: string };
export type RequestUUID = Request & UUID;
