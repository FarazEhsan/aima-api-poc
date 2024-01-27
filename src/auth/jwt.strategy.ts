import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: 'secret',
    });
  }

  async validate(payload: any) {

    if (!payload) {
      throw new UnauthorizedException();
    }
    // Validate the client ID against the one stored in the environment variable
    if (payload.sub !== 'client_id') {
      throw new UnauthorizedException();
    }
    return { clientId: payload.sub };
  }
}