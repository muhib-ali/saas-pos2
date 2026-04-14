import { Controller, Post, Body, Headers, Request } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiHeader, ApiBearerAuth } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { RefreshDto } from './dto/refresh.dto';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @ApiOperation({ summary: 'Login user' })
  @ApiHeader({ name: 'x-tenant-id', required: false })
  async login(@Body() loginDto: LoginDto, @Headers('x-tenant-id') tenantId?: string) {
    return this.authService.login(loginDto, tenantId);
  }

  @Post('refresh')
  @ApiOperation({ summary: 'Refresh access token' })
  @ApiHeader({ name: 'x-tenant-id', required: false })
  async refreshToken(
    @Body() refreshDto: RefreshDto,
    @Headers('x-tenant-id') tenantId?: string,
  ) {
    return this.authService.refreshToken(refreshDto, tenantId);
  }

  @Post('logout')
  @ApiOperation({ summary: 'Logout user' })
  @ApiBearerAuth()
  async logout(@Request() req) {
    const token = req.headers.authorization?.split(' ')[1];
    return this.authService.logout(token);
  }
}
