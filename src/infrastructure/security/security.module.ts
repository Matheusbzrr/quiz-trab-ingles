import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { APP_GUARD } from '@nestjs/core';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { JwtAuthGuardConfig } from './jwt-guard.config';
import { JwtStrategyConfig } from './jwt-strategy.config';

@Module({
  imports: [
    PassportModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SECRET'),
        signOptions: { expiresIn: '5h' },
      }),
    }),
  ],
  providers: [
    JwtStrategyConfig,
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuardConfig,
    },
  ],
  exports: [JwtModule],
})
export class SecurityModule {}
