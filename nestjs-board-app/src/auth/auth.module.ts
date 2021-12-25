import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Type } from 'class-transformer';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UserRspository } from './user.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserRspository])
  ],
  controllers: [AuthController],
  providers: [AuthService]
})
export class AuthModule { }
