import { Injectable, CanActivate, ExecutionContext, BadRequestException } from '@nestjs/common';
import { UsersService } from 'src/users/users.service'; // Import the service

@Injectable()
export class UniqueGmail implements CanActivate {
  constructor(private readonly usersService: UsersService) {}

  async canActivate(
    context: ExecutionContext,
  ): Promise<any> {
    const request = context.switchToHttp().getRequest();
    const email = request.body.email;

    // Check if the email is unique
    const user = await this.usersService.findOneByEmail(email);
    if (user) {
      throw new BadRequestException(`Email ${email} already exists. Please use a different email.`);
    }
    return true;
  }
}
