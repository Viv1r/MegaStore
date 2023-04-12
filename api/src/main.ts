import { AppModule } from './app.module';
import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';
import express from 'express';
import cookieParser from 'cookie-parser';

const PORT = 443;

async function bootstrap() {
	const app = await NestFactory.create<NestExpressApplication>(AppModule, {
		cors: true
	});
	app.use((req, res, next) => {
		res.header('Access-Control-Allow-Origin', '*');
		res.header('Access-Control-Allow-Headers', '*');
		res.header(
			'Access-Control-Allow-Headers',
			'Origin, Content-Type, Accept, X-Requested-With, app_token, Authorization',
		);
		res.header('Content-Security-Policy', "default-src 'self'");
		if (req.method === 'OPTIONS') {
			res.header(
				'Access-Control-Allow-Methods',
				'PUT, PATCH, POST, DELETE, GET',
			);
			return res.status(200).json({});
		}
		next();
	});
	const assets = join(__dirname, '..', 'public');
	app.useStaticAssets(assets);
	app.setGlobalPrefix('api');
	app.use(cookieParser());
	app.use(express.json({limit: '10mb'}));
	await app.listen(PORT);
}

bootstrap();