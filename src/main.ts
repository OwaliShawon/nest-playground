import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { AuthGuard } from './guards/auth.guards';
import cluster from 'cluster';
import * as os from 'os';
import { FastifyAdapter, NestFastifyApplication } from '@nestjs/platform-fastify';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { HttpExceptionFilter } from './core/filters/http-exception.filter';
import { ValidationPipe } from './core/pipes/validation.pipe';
import { ZodValidationPipe } from './core/pipes/zod.pipe';

// async function bootstrap() {
//   const app = await NestFactory.create(AppModule);
//   // app.useGlobalGuards(new AuthGuard)
//   await app.listen(process.env.PORT ?? 4000);
//   console.log(`Application is running on: ${await app.getUrl()}`);
// }

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(AppModule, new FastifyAdapter({ logger: true }));
  // app.useGlobalGuards(new AuthGuard)
  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalFilters(new HttpExceptionFilter());

  const config = new DocumentBuilder()
    .setTitle('Cats example')
    .setDescription('The cats API description')
    .setVersion('1.0')
    .addTag('cats')
    .build();
  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, documentFactory);

  await app.listen(process.env.PORT ?? 4000);
  console.log(`Application is running on: ${await app.getUrl()}`);
}

// if (cluster.isPrimary) {
//   const cpuCount = os.cpus().length;

//   for (let i = 0; i < cpuCount; i++) {
//     console.log("forking with core", i + 1)
//     cluster.fork();
//   }

//   cluster.on('exit', (worker) => {
//     console.log(`Worker ${worker.process.pid} died. Restarting...`);
//     cluster.fork();
//   });
// } else {
//   bootstrap();
// }

bootstrap();
