import { CanActivate, ExecutionContext, HttpException, Injectable } from '@nestjs/common';
import { UsersService } from "../../services/users/users.service";

@Injectable()
export class AdminGuard implements CanActivate {

  constructor(protected usersService: UsersService) {}

  public async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();

    try {
      const token = this.getToken(request);
      const user = await this.usersService.get(token);
      if (user?.is_admin) {
        request.user = user;
        return true;
      }
    } catch {}

    throw new HttpException('Bad authorization token!', 500);
  }

  protected getToken(request: {
    cookies: any
  }): string | null {
    return request.cookies['token'];
  }
}
