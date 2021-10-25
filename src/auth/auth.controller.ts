import { Body, Controller, Post } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiConflictResponse,
  ApiCreatedResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';

@Controller('auth')
@ApiTags('Auth API')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/signup')
  @ApiOperation({
    summary: '회원가입 API',
    description: 'username과 password로 회원가입한다.',
  })
  @ApiCreatedResponse({ description: '회원가입 성공' })
  @ApiBadRequestResponse({ description: '요청 양식 오류' })
  @ApiConflictResponse({ description: 'username 중복' })
  signUp(@Body() authCredentialsDto: AuthCredentialsDto): Promise<void> {
    return this.authService.signUp(authCredentialsDto);
  }
}
