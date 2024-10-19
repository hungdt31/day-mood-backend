import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { IUser } from 'src/interface/users.interface';
import { RolesService } from 'src/roles/roles.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly configService: ConfigService,
    private readonly roleService: RolesService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get<string>('JWT_ACCESS_TOKEN_SECRET'),
    });
  }

  // trả về response sau khi xác thực token thành công
  async validate(payload: IUser) {
    const { _id, email, name, role } = payload;

    // get permissions from role
    const userRole = role as unknown as { _id: string; name: string };
    if (userRole) {
      const foundRole = await this.roleService.findOne(userRole._id);

      return {
        _id,
        email,
        name,
        role,
        permissions: foundRole?.permissions ?? [],
      };
    }
    return {
      _id,
      email,
      name
    }
  }
}
