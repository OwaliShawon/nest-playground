import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { RedisService } from './redis.service';
import { ApiBody, ApiTags } from '@nestjs/swagger';

@ApiTags('Redis')
@Controller('redis')
export class RedisController {
  constructor(private readonly redis: RedisService) { }

  @Get('ping')
  ping() {
    return this.redis.ping();
  }

  @Post('hash/:key')
  @ApiBody({ schema: { type: 'object', additionalProperties: { type: 'string' } } })
  setHash(@Param('key') key: string, @Body() body: Record<string, string>) {
    return this.redis.hSet(key, body);
  }

  @Get('hash/:key')
  getHash(@Param('key') key: string) {
    return this.redis.hGetAll(key);
  }

  @Post('ft/create/:index')
  createIndex(@Param('index') index: string) {
    return this.redis.createIndex(index);
  }

  @Post('ft/create/json/:index')
  createJsonIndex(@Param('index') index: string) {
    return this.redis.createJsonIndex(index);
  }

  // @Post('ft/create-dynamic/:index')
  // createDynamicIndex(@Param('index') index: string) {
  //   return this.redis.createDynamicIndex(index);
  // }

  @Get('ft/search/:index')
  search(@Param('index') index: string, @Query('q') q?: string) {
    return this.redis.search(index, q || '*');
  }

  @Get('ft/search/key/:index')
  searchOnKey(@Param('index') index: string, @Query('key') key?: string, @Query('q') q?: string) {
    return this.redis.searchOnKey(index, key || '*', q || '*');
  }

  @Get('ft/aggregate/:index')
  aggregate(@Param('index') index: string, @Query('q') q?: string) {
    return this.redis.aggregate(index, q || '*');
  }

  // ==================== LIST OPERATIONS ====================

  @Post('list/:key/lpush')
  @ApiBody({ schema: { type: 'object', properties: { values: { type: 'array', items: { type: 'string' } } } } })
  lPush(@Param('key') key: string, @Body() body: { values: string[] }) {
    return this.redis.lPush(key, ...body.values);
  }

  @Post('list/:key/rpush')
  @ApiBody({ schema: { type: 'object', properties: { values: { type: 'array', items: { type: 'string' } } } } })
  rPush(@Param('key') key: string, @Body() body: { values: string[] }) {
    return this.redis.rPush(key, ...body.values);
  }

  @Post('list/:key/lpop')
  lPop(@Param('key') key: string) {
    return this.redis.lPop(key);
  }

  @Post('list/:key/rpop')
  rPop(@Param('key') key: string) {
    return this.redis.rPop(key);
  }

  @Get('list/:key/range')
  lRange(
    @Param('key') key: string,
    @Query('start') start: string = '0',
    @Query('stop') stop: string = '-1'
  ) {
    return this.redis.lRange(key, parseInt(start), parseInt(stop));
  }

  @Get('list/:key/length')
  lLen(@Param('key') key: string) {
    return this.redis.lLen(key);
  }

  @Get('list/:key/index/:index')
  lIndex(@Param('key') key: string, @Param('index') index: string) {
    return this.redis.lIndex(key, parseInt(index));
  }

  @Post('list/:key/trim')
  @ApiBody({ schema: { type: 'object', properties: { start: { type: 'number' }, stop: { type: 'number' } } } })
  lTrim(@Param('key') key: string, @Body() body: { start: number; stop: number }) {
    return this.redis.lTrim(key, body.start, body.stop);
  }

  @Post('list/:key/rem')
  @ApiBody({ schema: { type: 'object', properties: { count: { type: 'number' }, value: { type: 'string' } } } })
  lRem(@Param('key') key: string, @Body() body: { count: number; value: string }) {
    return this.redis.lRem(key, body.count, body.value);
  }

  // ==================== SET OPERATIONS ====================

  @Post('set/:key/add')
  @ApiBody({ schema: { type: 'object', properties: { members: { type: 'array', items: { type: 'string' } } } } })
  sAdd(@Param('key') key: string, @Body() body: { members: string[] }) {
    return this.redis.sAdd(key, ...body.members);
  }

  @Post('set/:key/rem')
  @ApiBody({ schema: { type: 'object', properties: { members: { type: 'array', items: { type: 'string' } } } } })
  sRem(@Param('key') key: string, @Body() body: { members: string[] }) {
    return this.redis.sRem(key, ...body.members);
  }

  @Get('set/:key/members')
  sMembers(@Param('key') key: string) {
    return this.redis.sMembers(key);
  }

  @Get('set/:key/ismember/:member')
  sIsMember(@Param('key') key: string, @Param('member') member: string) {
    return this.redis.sIsMember(key, member);
  }

  @Get('set/:key/card')
  sCard(@Param('key') key: string) {
    return this.redis.sCard(key);
  }

  @Post('set/:key/pop')
  sPop(@Param('key') key: string, @Query('count') count?: string) {
    return this.redis.sPop(key, count ? parseInt(count) : undefined);
  }

  @Get('set/:key/randmember')
  sRandMember(@Param('key') key: string, @Query('count') count?: string) {
    return this.redis.sRandMember(key, count ? parseInt(count) : undefined);
  }

  @Post('set/diff')
  @ApiBody({ schema: { type: 'object', properties: { keys: { type: 'array', items: { type: 'string' } } } } })
  sDiff(@Body() body: { keys: string[] }) {
    return this.redis.sDiff(body.keys);
  }

  @Post('set/inter')
  @ApiBody({ schema: { type: 'object', properties: { keys: { type: 'array', items: { type: 'string' } } } } })
  sInter(@Body() body: { keys: string[] }) {
    return this.redis.sInter(body.keys);
  }

  @Post('set/union')
  @ApiBody({ schema: { type: 'object', properties: { keys: { type: 'array', items: { type: 'string' } } } } })
  sUnion(@Body() body: { keys: string[] }) {
    return this.redis.sUnion(body.keys);
  }

  // ==================== SORTED SET OPERATIONS ====================

  @Post('zset/:key/add')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        members: {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              score: { type: 'number' },
              value: { type: 'string' }
            }
          }
        }
      }
    }
  })
  zAdd(@Param('key') key: string, @Body() body: { members: Array<{ score: number; value: string }> }) {
    return this.redis.zAdd(key, body.members);
  }

  @Post('zset/:key/rem')
  @ApiBody({ schema: { type: 'object', properties: { members: { type: 'array', items: { type: 'string' } } } } })
  zRem(@Param('key') key: string, @Body() body: { members: string[] }) {
    return this.redis.zRem(key, ...body.members);
  }

  @Get('zset/:key/range')
  zRange(
    @Param('key') key: string,
    @Query('start') start: string = '0',
    @Query('stop') stop: string = '-1',
    @Query('withScores') withScores?: string
  ) {
    return this.redis.zRange(key, parseInt(start), parseInt(stop), withScores === 'true');
  }

  @Get('zset/:key/rangebyscore')
  zRangeByScore(
    @Param('key') key: string,
    @Query('min') min: string = '-inf',
    @Query('max') max: string = '+inf',
    @Query('withScores') withScores?: string
  ) {
    const minVal = isNaN(parseFloat(min)) ? min : parseFloat(min);
    const maxVal = isNaN(parseFloat(max)) ? max : parseFloat(max);
    return this.redis.zRangeByScore(key, minVal, maxVal, withScores === 'true');
  }

  @Get('zset/:key/score/:member')
  zScore(@Param('key') key: string, @Param('member') member: string) {
    return this.redis.zScore(key, member);
  }

  @Get('zset/:key/card')
  zCard(@Param('key') key: string) {
    return this.redis.zCard(key);
  }

  @Get('zset/:key/rank/:member')
  zRank(@Param('key') key: string, @Param('member') member: string) {
    return this.redis.zRank(key, member);
  }

  @Get('zset/:key/revrank/:member')
  zRevRank(@Param('key') key: string, @Param('member') member: string) {
    return this.redis.zRevRank(key, member);
  }

  @Post('zset/:key/incrby')
  @ApiBody({ schema: { type: 'object', properties: { increment: { type: 'number' }, member: { type: 'string' } } } })
  zIncrBy(@Param('key') key: string, @Body() body: { increment: number; member: string }) {
    return this.redis.zIncrBy(key, body.increment, body.member);
  }

  @Get('zset/:key/revrange')
  zRevRange(
    @Param('key') key: string,
    @Query('start') start: string = '0',
    @Query('stop') stop: string = '-1',
    @Query('withScores') withScores?: string
  ) {
    return this.redis.zRevRange(key, parseInt(start), parseInt(stop), withScores === 'true');
  }

  @Get('zset/:key/count')
  zCount(
    @Param('key') key: string,
    @Query('min') min: string = '-inf',
    @Query('max') max: string = '+inf'
  ) {
    const minVal = isNaN(parseFloat(min)) ? min : parseFloat(min);
    const maxVal = isNaN(parseFloat(max)) ? max : parseFloat(max);
    return this.redis.zCount(key, minVal, maxVal);
  }

  // ==================== PUB/SUB OPERATIONS ====================

  @Post('pubsub/publish/:channel')
  @ApiBody({ schema: { type: 'object', properties: { message: { type: 'string' } } } })
  publish(@Param('channel') channel: string, @Body() body: { message: string }) {
    return this.redis.publish(channel, body.message);
  }

  @Get('pubsub/channels')
  pubSubChannels(@Query('pattern') pattern?: string) {
    return this.redis.pubSubChannels(pattern);
  }

  @Post('pubsub/numsub')
  @ApiBody({ schema: { type: 'object', properties: { channels: { type: 'array', items: { type: 'string' } } } } })
  pubSubNumSub(@Body() body: { channels: string[] }) {
    return this.redis.pubSubNumSub(...body.channels);
  }

  // ==================== DEMO ENDPOINT ====================

  @Get('demo/all')
  async demoAll() {
    const results: any = {};

    await this.redis.rPush('demo:list', 'item1', 'item2', 'item3');
    results.list = {
      items: await this.redis.lRange('demo:list', 0, -1),
      length: await this.redis.lLen('demo:list'),
    };

    await this.redis.sAdd('demo:set', 'tag1', 'tag2', 'tag3', 'tag1');
    results.set = {
      members: await this.redis.sMembers('demo:set'),
      count: await this.redis.sCard('demo:set'),
      hasTag1: await this.redis.sIsMember('demo:set', 'tag1'),
    };

    await this.redis.zAdd('demo:leaderboard', [
      { score: 100, value: 'player1' },
      { score: 250, value: 'player2' },
      { score: 175, value: 'player3' },
    ]);
    results.sortedSet = {
      all: await this.redis.zRange('demo:leaderboard', 0, -1, true),
      top2: await this.redis.zRevRange('demo:leaderboard', 0, 1, true),
      player2Score: await this.redis.zScore('demo:leaderboard', 'player2'),
      player2Rank: await this.redis.zRevRank('demo:leaderboard', 'player2'),
    };

    // Pub/Sub info
    results.pubsub = {
      channels: await this.redis.pubSubChannels(),
    };

    return results;
  }
}
