import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BlogController } from './blog/blog.controller';
import { BlogService } from './blog/blog.service';
import { MongooseModule } from '@nestjs/mongoose';
import { BlogSchema } from './blog_schema/blog.schema';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }), // Load .env globally
    MongooseModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        uri: configService.get<string>('MONGO_URI'),
      }),
    }),
    MongooseModule.forFeature([{ name: 'BlogDetails', schema: BlogSchema }]),
  ],
  controllers: [AppController,BlogController],
  providers: [AppService,BlogService],
})
export class AppModule {}
