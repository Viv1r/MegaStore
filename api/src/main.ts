import { AppModule } from './app.module';
import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';

const PORT = 80;

async function bootstrap() {
	const app = await NestFactory.create<NestExpressApplication>(AppModule);
	const assets = join(__dirname, '..', 'public');
	app.useStaticAssets(assets);
	await app.listen(PORT);
}

bootstrap();