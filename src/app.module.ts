import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UrlModule } from './url/url.module';

@Module({
  imports: [MongooseModule.forRoot('mongodb://localhost:12345/urlshortener'), UrlModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
