import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, UsePipes, SetMetadata } from '@nestjs/common';
import { UsersService } from './users.service';
import { JwtAuthGuard } from 'src/guards/jwt-auth.guard';
import { ZodValidationPipe } from 'src/core/pipes/zod.pipe';
import * as createUserDto from './dto/create-user.dto';
import { log } from 'console';
import { AuthGuard } from 'src/guards/auth.guards';
import { Roles } from 'src/decorators/roles.decorator';

@Roles(['superadmin'])
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) { }

  @Post()
  @UsePipes(new ZodValidationPipe(createUserDto.createUserSchema))
  create(@Body() createUserDto: createUserDto.CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Get()
  @Roles(['admin'])
  @UseGuards(JwtAuthGuard, AuthGuard)
  findAll() {
    return this.usersService.findAll();
  }

  @Get(':username')
  findOne(@Param('username') username: string) {
    return this.usersService.findOne(username);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: any) {
    return this.usersService.update(+id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(+id);
  }

  @Post("create-many")
  // @UsePipes(new ZodValidationPipe(createUserDto.createUserSchema))
  createMany(@Body() createUserDto: any[]) {
    console.log("Create many", createUserDto)
    return this.usersService.createMany(createUserDto);
  }
}
