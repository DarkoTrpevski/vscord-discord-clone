import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { ServerModule } from './server/server.module';
import { AuthModule } from './auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DatabaseConnectionService } from './db/db-connection.service';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({ useClass: DatabaseConnectionService }),
    // ServeStaticModule.forRoot({
    //   rootPath: join(__dirname, '..', 'client/build'),
    // }),
    AuthModule,
    UserModule,
    ServerModule
    ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}