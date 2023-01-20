import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
//import { AppController } from './app.controller';
//import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { BookmarkModule } from './bookmark/bookmark.module';
import { PrismaModule } from './prisma/prisma.module';
import { ConfigModule } from '@nestjs/config';
import { BookmarService } from './bookmar/bookmar.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }), 
    AuthModule, 
    UserModule, 
    BookmarkModule, 
    PrismaModule
  ],
  providers: [BookmarService],
  
})
export class AppModule {}
