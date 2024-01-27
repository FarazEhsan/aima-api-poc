import { Body, Controller, Post, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ClientCreds } from './auth.dto';
import { ApiTags } from '@nestjs/swagger';

@Controller('auth')
@ApiTags('Auth Token')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post()
  async login(@Body() clientCreds:ClientCreds) {
    const client = await this.authService.validateClient(clientCreds.clientId, clientCreds.clientSecret);
    if (!client) {
      throw new UnauthorizedException();
    }
    return this.authService.login(client);
  }
}
