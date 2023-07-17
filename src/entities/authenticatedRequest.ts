import { Request } from "express";
import { TokenPayload } from "src/auth/entities/auth.entity";

export interface AuthenticatedRequest extends Request{
    tokenPayload: TokenPayload
}