import {
  Controller,
  Post,
  Body,
  HttpCode,
  Get,
  Query,
  HttpStatus,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateAuthDto } from './dto/create-auth.dto';
import { LoginDto } from './dto/login.dto';
import { TokenDto } from './dto/token.dto';
import { plainToInstance } from 'class-transformer';
import { UserResponeDto } from './dto/user-response.dto';
import { JwtAuthGuard, RefreshGuard } from '../common/guard';
import { CurrentUser } from '../common/decorators/current-user.decorator';
import { JwtPayload } from 'jsonwebtoken';
import { ApiBody, ApiOperation, ApiResponse } from '@nestjs/swagger';

@Controller('v1/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @HttpCode(204)
  @Post('/register')
  @ApiOperation({ summary: 'Register a new user' })
  @ApiBody({ type: CreateAuthDto })
  @ApiResponse({ status: 201, description: 'User registered successfully.' })
  @ApiResponse({ status: 400, description: 'Bad Request.' })
  async registerUser(@Body() createAuthDto: CreateAuthDto) {
    await this.authService.register(createAuthDto);
  }

  @HttpCode(200)
  @Get('/verify/email')
  async verificationEmailRegister(@Query() params: any) {
    const tokenRegister: string = params.token;
    return await this.authService.verifyTokenEmailRegister(tokenRegister);
  }

  @HttpCode(HttpStatus.OK)
  @Post('login')
  async login(@Body() body: LoginDto): Promise<TokenDto> {
    return plainToInstance(TokenDto, await this.authService.login(body));
  }

  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.OK)
  @Get('me')
  async getCurrentUser(
    @CurrentUser() user: JwtPayload,
  ): Promise<UserResponeDto> {
    return plainToInstance(
      UserResponeDto,
      await this.authService.getCurrentUser(user.sub),
    );
  }

  @UseGuards(RefreshGuard)
  @HttpCode(HttpStatus.OK)
  @Post('refresh')
  async refreshToken(@CurrentUser() user: JwtPayload): Promise<TokenDto> {
    return plainToInstance(
      TokenDto,
      await this.authService.refresh(user.sub, user.jti),
    );
  }

  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.NO_CONTENT)
  @Post('logout')
  logout(@CurrentUser() user: JwtPayload): void {
    this.authService.logout(user.jti);
  }
}
