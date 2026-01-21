import { Controller, Get, Post, Body, Patch, Param, Delete, UsePipes, Scope } from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ZodValidationPipe } from 'nestjs-zod';
import { ApiResponse } from '@nestjs/swagger';
import { FindProductsDto } from './dto/find-products.dto';
import { CacheKey, CacheTTL } from '@nestjs/cache-manager';

@Controller({ scope: Scope.DEFAULT, path: 'products' })
export class ProductsController {
  constructor(private readonly productsService: ProductsService) { }

  @Post()
  @UsePipes(ZodValidationPipe)
  @ApiResponse({
    status: 201,
  })
  create(@Body() createProductDto: any) {
    return this.productsService.create(createProductDto);
  }

  @Get()
  @CacheKey('custom_key')
  // @CacheTTL(20)
  findAll() {
    return this.productsService.findAll();
  }

  @Post('search')
  @UsePipes(ZodValidationPipe)
  findByFilter(@Body() filter: any) {
    return this.productsService.findAll(filter as any);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.productsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateProductDto: UpdateProductDto) {
    return this.productsService.update(+id, updateProductDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.productsService.remove(+id);
  }
}
