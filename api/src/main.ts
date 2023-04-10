import { AppModule } from './app.module';
import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';
import express from 'express';
import cookieParser from 'cookie-parser';

const PORT = 80;

async function bootstrap() {
	const app = await NestFactory.create<NestExpressApplication>(AppModule);
	const assets = join(__dirname, '..', 'public');
	app.useStaticAssets(assets);
	app.setGlobalPrefix('api');
	app.use(cookieParser());
	app.use(express.json({limit: '10mb'}));
	await app.listen(PORT);
}

bootstrap();