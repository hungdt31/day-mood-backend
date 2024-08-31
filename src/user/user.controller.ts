import { Controller, Delete, Get } from '@nestjs/common';


@Controller('user')
export class UserController {

  @Get() // GET => http://localhost:3000/user
  findAll(): string {
    return 'This action returns all users';
  }

  @Delete("/by-id") // DELETE => http://localhost:3000/user/by-id
  findById(): string {
    return 'This action removes a user by id';
  }
}
