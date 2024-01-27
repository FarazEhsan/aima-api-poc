import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ClientCreds } from './auth.dto';

@Injectable()
export class AuthService {
  constructor(private jwtService: JwtService) {}

  async validateClient(clientId: string, clientSecret: string): Promise<any> {

    const hardcodedClientId = 'client_id';
    const hardcodedClientSecret = 'client_secret';


    if (clientId === hardcodedClientId && clientSecret === hardcodedClientSecret) {
      const client = { clientId: clientId, clientSecret: clientSecret };
      return client;
    } else {
      throw new UnauthorizedException('Invalid client ID or secret');
    }
  }

  async login(client: ClientCreds) {
    const payload = { sub: client.clientId };
    return {
      access_token: this.jwtService.sign(payload,  { secret: 'secret' }),
    };
  }
}
