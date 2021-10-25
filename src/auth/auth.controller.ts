import { Body, Controller, Post } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiConflictResponse,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
  ApiUnauthorizedResponse,
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

  @Post('/signin')
  @ApiOperation({
    summary: '로그인 API',
    description: 'username과 password로 로그인한다.',
  })
  @ApiOkResponse({ description: '로그인 성공' })
  @ApiBadRequestResponse({ description: '요청 양식 오류' })
  @ApiUnauthorizedResponse({ description: '인증 실패' })
  signIn(
    @Body() authCredentialsDto: AuthCredentialsDto,
  ): Promise<{ accessToken: string }> {
    return this.authService.signIn(authCredentialsDto);
  }
}

/** NOTE JWT (JSON Web Tokens)
 * header.payload.signature로 구성
 * - header: 토큰에 관한 메타데이터(타입, 해싱 알고리즘 등) 포함
 * - payload: claims(entity에 대한 statements, 예를 들어 user)와 추가 데이터 포함
 * - signature: the result of the encoded header, encoded payload, signed against a secret
 * 누구나 decode할 수 있으므로 password와 같은 sensitive information을 담지 말아야 한다
 * short-lived로 구성해야 한다
 */
