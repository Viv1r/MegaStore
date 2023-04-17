import { CanActivate, ExecutionContext, HttpException, Injectable } from '@nestjs/common';
import { UsersService } from "../../services/users/users.service";

@Injectable()
export class AdminGuard implements CanActivate {

  constructor(protected usersService: UsersService) {}

  public async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();

    const token = this.getToken(request);
    const user = await this.usersService.get(token);
    request.user = user;

    if (user?.id === 0) {
      user.is_root = true;
      return true;
    }

    if (user?.is_admin) {
      return true;
    }

    throw new HttpException('Not authorized as admin!', 500);
  }

  protected getToken(request: {
    cookies: any
  }): string | null {
    return request.cookies['token'];
  }
}
