import { Injectable } from '@nestjs/common';
import { ClsService } from 'nestjs-cls';

export interface RequestContext {
    requestId: string;
    ipAddress: string;
    tenantId?: string;
    userId?: string;
    timestamp: number;
}

@Injectable()
export class ContextService {
    constructor(private readonly cls: ClsService) { }

    /**
     * Set the request context with all metadata
     */
    setContext(context: Partial<RequestContext>): void {
        if (context.requestId !== undefined) {
            this.cls.set('requestId', context.requestId);
        }
        if (context.ipAddress !== undefined) {
            this.cls.set('ipAddress', context.ipAddress);
        }
        if (context.tenantId !== undefined) {
            this.cls.set('tenantId', context.tenantId);
        }
        if (context.userId !== undefined) {
            this.cls.set('userId', context.userId);
        }
        if (context.timestamp !== undefined) {
            this.cls.set('timestamp', context.timestamp);
        }

    }

    /**
     * Get the entire request context
     */
    getContext(): Partial<RequestContext> {
        return {
            requestId: this.getRequestId(),
            ipAddress: this.getIpAddress(),
            tenantId: this.getTenantId(),
            userId: this.getUserId(),
            timestamp: this.getTimestamp(),
        };
    }

    /**
     * Set and get Request ID
     */
    setRequestId(requestId: string): void {
        this.cls.set('requestId', requestId);
    }

    getRequestId(): string | undefined {
        return this.cls.get('requestId');
    }

    /**
     * Set and get IP Address
     */
    setIpAddress(ipAddress: string): void {
        this.cls.set('ipAddress', ipAddress);
    }

    getIpAddress(): string | undefined {
        return this.cls.get('ipAddress');
    }

    /**
     * Set and get Tenant ID
     */
    setTenantId(tenantId: string): void {
        this.cls.set('tenantId', tenantId);
    }

    getTenantId(): string | undefined {
        return this.cls.get('tenantId');
    }

    /**
     * Set and get User ID
     */
    setUserId(userId: string): void {
        this.cls.set('userId', userId);
    }

    getUserId(): string | undefined {
        return this.cls.get('userId');
    }

    /**
     * Set and get Timestamp
     */
    setTimestamp(timestamp: number): void {
        this.cls.set('timestamp', timestamp);
    }

    getTimestamp(): number | undefined {
        return this.cls.get('timestamp');
    }

    /**
    * Example with custom tenant and user headers
    */
   


}
