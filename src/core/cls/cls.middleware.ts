import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { v4 as uuidv4 } from 'uuid';
import { ContextService } from './cls.service';

@Injectable()
export class ContextMiddleware implements NestMiddleware {
  constructor(private readonly contextService: ContextService) {}

  use(req: Request, res: Response, next: NextFunction) {
    // Generate or retrieve request ID
    const requestId = (req.headers['x-request-id'] as string) || uuidv4();
    console.log('Generated/Retrieved Request ID:', requestId);

    // Extract IP address - check various headers for proxy scenarios
    const ipAddress =
      (req.headers['x-forwarded-for'] as string)?.split(',')[0].trim() ||
      (req.headers['x-real-ip'] as string) ||
      req.ip ||
      req.socket.remoteAddress ||
      'unknown';

    // Extract tenant ID from header or subdomain
    let tenantId = req.headers['x-tenant-id'] as string;
    console.log('Tenant ID from header:', req.headers['x-tenant-id']);
    // if (!tenantId && req.subdomains.length > 0) {
    //   tenantId = req.subdomains[0];
    // }

    // Extract user ID from header or JWT (if decoded by auth guard)
    let userId = req.headers['x-user-id'] as string;
    console.log('User ID from header:', req.headers['x-user-id']);
    if (!userId && (req as any).user) {
      userId = (req as any).user.id || (req as any).user.sub;
    }

    // Set the context with all metadata
    this.contextService.setContext({
      requestId,
      ipAddress,
      tenantId,
      userId,
      timestamp: Date.now(),
    });

    // Attach to request object for easy access
    (req as any).requestId = requestId;
    (req as any).ipAddress = ipAddress;
    (req as any).tenantId = tenantId;
    (req as any).userId = userId;

    // Add request ID to response headers for tracing
    res.setHeader('x-request-id', requestId);
    if (tenantId) {
      res.setHeader('x-tenant-id', tenantId);
    }

    next();
  }
}
