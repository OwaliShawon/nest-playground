import { Controller, Get, Inject, Request } from '@nestjs/common';
import { ContextService } from './cls.service';

@Controller('context')
export class ContextController {
  constructor(private readonly contextService: ContextService) {}

  /**
   * Get the current request context
   */
  @Get('current')
  getCurrentContext(@Request() req: any) {
    return {
      message: 'Current request context',
      context: this.contextService.getContext(),
      requestAttachments: {
        requestId: req.requestId,
        ipAddress: req.ipAddress,
        tenantId: req.tenantId,
        userId: req.userId,
      },
    };
  }

  /**
   * Get request ID
   */
  @Get('request-id')
  getRequestId() {
    return {
      requestId: this.contextService.getRequestId(),
    };
  }

  /**
   * Get IP address
   */
  @Get('ip-address')
  getIpAddress() {
    return {
      ipAddress: this.contextService.getIpAddress(),
    };
  }

  /**
   * Get tenant ID
   */
  @Get('tenant-id')
  getTenantId() {
    return {
      tenantId: this.contextService.getTenantId(),
    };
  }

  /**
   * Get user ID
   */
  @Get('user-id')
  getUserId() {
    return {
      userId: this.contextService.getUserId(),
    };
  }

  /**
   * Example with custom tenant and user headers
   * Usage: GET /context/example?tenantId=tenant-123&userId=user-456
   * Or use headers: x-tenant-id: tenant-123, x-user-id: user-456
   */
  @Get('example')
  exampleUsage() {
    return {
      message: 'CLS context is automatically populated for all requests',
      currentContext: this.contextService.getContext(),
      howToUse: {
        requestId: 'Automatically generated with x-request-id header',
        ipAddress:
          'Extracted from request, supports proxy headers (x-forwarded-for, x-real-ip)',
        tenantId: 'Pass via x-tenant-id header or as subdomain',
        userId:
          'Pass via x-user-id header or will be extracted from JWT if available',
      },
    };
  }
}
