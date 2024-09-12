import { Injectable, CanActivate, ExecutionContext, BadRequestException } from '@nestjs/common';// Import the service
import mongoose from 'mongoose';

@Injectable()
export class checkValidId implements CanActivate {

  async canActivate(
    context: ExecutionContext,
  ): Promise<any> {
    const request = context.switchToHttp().getRequest();
    const method = request.params.id;

    // Check if the email is unique
    const isValid = mongoose.Types.ObjectId.isValid(method);
    if (!isValid) {
      throw new BadRequestException('Id is not valid');
    }
    return true;
  }
}
