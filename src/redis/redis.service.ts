import { Inject, Injectable } from '@nestjs/common';
import type { RedisClientType } from 'redis';
import { REDIS_CLIENT } from 'src/core/redis/redis.provider';
import { RedisType } from './type.redis';

@Injectable()
export class RedisService {
  constructor(@Inject(REDIS_CLIENT) private readonly client: RedisClientType) {}

  async ping(): Promise<string> {
    return this.client.ping();
  }

  async createIndex(index: string): Promise<any> {
    return this.client.sendCommand([
      'FT.CREATE',
      index,
      'ON',
      'HASH',
      'SCHEMA',
      'title',
      'TEXT',
      'body',
      'TEXT',
    ]);
  }

  async dropIndex(index: string): Promise<any> {
    return this.client.sendCommand(['FT.DROPINDEX', index]);
  }

  async createJsonIndex(index: string): Promise<any> {
    return this.createDynamicIndex(index, RedisType.JSON, {
      '$.title': 'TEXT',
      '$.body': 'TEXT',
    });
  }

  async createDynamicIndex(
    index: string,
    type: RedisType,
    schema: Record<string, string>,
  ): Promise<any> {
    const schemaArgs: string[] = [];

    for (const [fieldPath, fieldDef] of Object.entries(schema)) {
      schemaArgs.push(
        fieldPath,
        'AS',
        fieldPath.replace('$.', '').replace('.', '_'), // alias
        ...fieldDef.split(' '),
      );
    }

    return this.client.sendCommand([
      'FT.CREATE',
      index,
      'ON',
      type,
      'SCHEMA',
      ...schemaArgs,
    ]);
  }

  async search(index: string, query: string, limit = 10): Promise<any> {
    const test = await this.client.ft.search(index, query, {
      LIMIT: { from: 0, size: limit },
    });
    console.log('Search Test Result:', JSON.stringify(test, null, 2));
    return this.client.sendCommand([
      'FT.SEARCH',
      index,
      query,
      'LIMIT',
      '0',
      String(limit),
    ]);
  }

  async searchOnKey(
    index: string,
    key: string,
    query: string,
    limit = 10,
  ): Promise<any> {
    return this.client.sendCommand([
      'FT.SEARCH',
      index,
      `@${key}:${query}`,
      'LIMIT',
      '0',
      String(limit),
    ]);
  }

  async aggregate(index: string, query: string): Promise<any> {
    return this.client.sendCommand(['FT.AGGREGATE', index, query]);
  }

  async hSet(key: string, obj: Record<string, string>): Promise<number> {
    return this.client.hSet(key, obj as Record<string, string>);
  }

  async hGetAll(key: string): Promise<any> {
    console.log('Fetching all fields for key:', key);
    const result = await this.client.hGetAll(key);
    console.log('Fetched fields:', result);
    return result;
  }

  // ==================== LIST OPERATIONS ====================

  async lPush(key: string, ...values: string[]): Promise<number> {
    return this.client.lPush(key, values);
  }

  async rPush(key: string, ...values: string[]): Promise<number> {
    return this.client.rPush(key, values);
  }

  async lPop(key: string): Promise<string | null> {
    return this.client.lPop(key) as Promise<string | null>;
  }

  async rPop(key: string): Promise<string | null> {
    return this.client.rPop(key) as Promise<string | null>;
  }

  async lRange(key: string, start: number, stop: number): Promise<string[]> {
    return this.client.lRange(key, start, stop);
  }

  async lLen(key: string): Promise<number> {
    return this.client.lLen(key);
  }

  async lIndex(key: string, index: number): Promise<string | null> {
    return this.client.lIndex(key, index) as Promise<string | null>;
  }

  async lTrim(key: string, start: number, stop: number): Promise<string> {
    return this.client.lTrim(key, start, stop);
  }

  async lRem(key: string, count: number, value: string): Promise<number> {
    return this.client.lRem(key, count, value);
  }

  // ==================== SET OPERATIONS ====================

  async sAdd(key: string, ...members: string[]): Promise<number> {
    return this.client.sAdd(key, members);
  }

  async sRem(key: string, ...members: string[]): Promise<number> {
    return this.client.sRem(key, members);
  }

  async sMembers(key: string): Promise<string[]> {
    return this.client.sMembers(key);
  }

  async sIsMember(key: string, member: string): Promise<boolean> {
    const result = await this.client.sIsMember(key, member);
    return Boolean(result);
  }

  async sCard(key: string): Promise<number> {
    return this.client.sCard(key);
  }

  async sPop(key: string, count?: number): Promise<string | string[] | null> {
    if (count !== undefined) {
      return this.client.sendCommand(['SPOP', key, String(count)]) as Promise<
        string[]
      >;
    }
    return this.client.sPop(key) as Promise<string | null>;
  }

  async sRandMember(key: string, count?: number): Promise<string | string[]> {
    if (count !== undefined) {
      return this.client.sendCommand([
        'SRANDMEMBER',
        key,
        String(count),
      ]) as Promise<string[]>;
    }
    return this.client.sRandMember(key) as Promise<string>;
  }

  async sDiff(keys: string[]): Promise<string[]> {
    return this.client.sDiff(keys);
  }

  async sInter(keys: string[]): Promise<string[]> {
    return this.client.sInter(keys);
  }

  async sUnion(keys: string[]): Promise<string[]> {
    return this.client.sUnion(keys);
  }

  // ==================== SORTED SET OPERATIONS ====================

  async zAdd(
    key: string,
    members: Array<{ score: number; value: string }>,
  ): Promise<number> {
    return this.client.zAdd(key, members);
  }

  async zRem(key: string, ...members: string[]): Promise<number> {
    return this.client.zRem(key, members);
  }

  async zRange(
    key: string,
    start: number,
    stop: number,
    withScores?: boolean,
  ): Promise<string[] | Array<{ value: string; score: number }>> {
    if (withScores) {
      return this.client.zRangeWithScores(key, start, stop);
    }
    return this.client.zRange(key, start, stop);
  }

  async zRangeByScore(
    key: string,
    min: number | string,
    max: number | string,
    withScores?: boolean,
  ): Promise<string[] | Array<{ value: string; score: number }>> {
    if (withScores) {
      return this.client.zRangeByScoreWithScores(key, min, max);
    }
    return this.client.zRangeByScore(key, min, max);
  }

  async zScore(key: string, member: string): Promise<number | null> {
    return this.client.zScore(key, member);
  }

  async zCard(key: string): Promise<number> {
    return this.client.zCard(key);
  }

  async zRank(key: string, member: string): Promise<number | null> {
    return this.client.zRank(key, member) as Promise<number | null>;
  }

  async zRevRank(key: string, member: string): Promise<number | null> {
    const result = await this.client.sendCommand(['ZREVRANK', key, member]);
    return result !== null ? Number(result) : null;
  }

  async zIncrBy(
    key: string,
    increment: number,
    member: string,
  ): Promise<number> {
    return this.client.zIncrBy(key, increment, member);
  }

  async zRevRange(
    key: string,
    start: number,
    stop: number,
    withScores?: boolean,
  ): Promise<string[] | Array<{ value: string; score: number }>> {
    if (withScores) {
      const result = await this.client.sendCommand([
        'ZREVRANGE',
        key,
        String(start),
        String(stop),
        'WITHSCORES',
      ]);
      const scored: Array<{ value: string; score: number }> = [];
      if (Array.isArray(result)) {
        for (let i = 0; i < result.length; i += 2) {
          scored.push({
            value: result[i] as string,
            score: parseFloat(result[i + 1] as string),
          });
        }
      }
      return scored;
    }
    return this.client.sendCommand([
      'ZREVRANGE',
      key,
      String(start),
      String(stop),
    ]) as Promise<string[]>;
  }

  async zCount(
    key: string,
    min: number | string,
    max: number | string,
  ): Promise<number> {
    return this.client.zCount(key, min, max);
  }

  // ==================== PUB/SUB OPERATIONS ====================

  async publish(channel: string, message: string): Promise<number> {
    return this.client.publish(channel, message);
  }

  async subscribe(
    channel: string,
    callback: (message: string, channel: string) => void,
  ): Promise<void> {
    const subscriber = this.client.duplicate();
    await subscriber.connect();

    await subscriber.subscribe(channel, (message, channelName) => {
      callback(message, channelName);
    });
  }

  async pSubscribe(
    pattern: string,
    callback: (message: string, channel: string) => void,
  ): Promise<void> {
    const subscriber = this.client.duplicate();
    await subscriber.connect();

    await subscriber.pSubscribe(pattern, (message, channelName) => {
      callback(message, channelName);
    });
  }

  async pubSubNumSub(...channels: string[]): Promise<Record<string, number>> {
    const result = await this.client.sendCommand([
      'PUBSUB',
      'NUMSUB',
      ...channels,
    ]);
    const output: Record<string, number> = {};

    if (Array.isArray(result)) {
      for (let i = 0; i < result.length; i += 2) {
        output[result[i] as string] = result[i + 1] as number;
      }
    }

    return output;
  }

  async pubSubChannels(pattern?: string): Promise<string[]> {
    const args = ['PUBSUB', 'CHANNELS'];
    if (pattern) {
      args.push(pattern);
    }
    return this.client.sendCommand(args) as Promise<string[]>;
  }

  async sendCommand(args: string[]): Promise<any> {
    return this.client.sendCommand(args);
  }
}
