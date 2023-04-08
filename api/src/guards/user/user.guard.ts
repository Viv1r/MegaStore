import { CanActivate, ExecutionContext, HttpException, Injectable } from '@nestjs/common';
import { UsersService } from "../../services/users/users.service";

@Injectable()
export class UserGuard implements CanActivate {

  constructor(protected usersService: UsersService) {}

  public async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();

    let user;
    try {
      const token = this.getToken(request);
      user = await this.usersService.get(token) as any;
    } catch {}

    if (user?.is_banned) {
      throw new HttpException('You are banned!', 500);
    }

    if (user?.email === 'root') {
      user.is_root = true;
      user.is_admin = true;
    }

    if (user) {
      request.user = user;
      return true;
    }

    throw new HttpException('Bad authorization token!', 500);
  }

  protected getToken(request: {
    cookies: any
  }): string | null {
    return request.cookies['token'];
  }
}
