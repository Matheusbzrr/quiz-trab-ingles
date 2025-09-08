import {
  Injectable,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Reflector } from '@nestjs/core';
import { IS_PUBLIC_KEY } from 'src/domain/common/decorators/public-route.decorator';
import { IS_TEACHER } from 'src/domain/common/decorators/teacher.decorator';

@Injectable()
export class JwtAuthGuardConfig extends AuthGuard('jwt') {
  constructor(private reflector: Reflector) {
    super();
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (isPublic) {
      return true;
    }
    try {
      await super.canActivate(context);
    } catch (error) {
      throw new UnauthorizedException('Token inválido ou expirado.');
    }

    const isSuperAdmRoute = this.reflector.getAllAndOverride<boolean>(
      IS_TEACHER,
      [context.getHandler(), context.getClass()],
    );
    if (!isSuperAdmRoute) {
      return true;
    }
    const { user } = context.switchToHttp().getRequest();
    if (user?.isTeacher === true) {
      return true;
    }
    throw new UnauthorizedException('Acesso restrito a Super Administradores.');
  }
}
