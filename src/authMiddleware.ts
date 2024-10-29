import dotenv from 'dotenv';
import { NextFunction, Request, Response } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';

dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET || 'jwt_secret';

console.log('JWT_SECRET in authMiddleware:', JWT_SECRET);

// Extend Request to include authenticated player information
export interface AuthenticatedRequest extends Request {
	player?: { playerId: string; role: string };
}

// Middleware to verify JWT token and attach player info to request
export const authenticateToken = (
	req: AuthenticatedRequest,
	res: Response,
	next: NextFunction
) => {
	const authHeader = req.headers['authorization'];
	const token = authHeader && authHeader.split(' ')[1];

	if (!token) {
		return res
			.status(403)
			.json({ message: 'Access denied, no token provided' });
	}

	jwt.verify(token, JWT_SECRET, (err, decoded) => {
		if (err) {
			return res.status(403).json({ message: 'Invalid token' });
		}

		// Attach player information from decoded token to request
		req.player = decoded as { playerId: string; role: string };
		next();
	});
};

// Middleware to authorize a player based on role
export const authorizePlayer = () => {
	return (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
		if (!req.player || req.player.role !== 'player') {
			return res.status(403).json({ message: 'Access denied' });
		}
		next();
	};
};
