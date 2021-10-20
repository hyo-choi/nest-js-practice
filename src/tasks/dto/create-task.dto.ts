import { ApiProperty } from '@nestjs/swagger';

export class CreateTaskDto {
  @ApiProperty({ description: '제목' })
  title: string;

  @ApiProperty({ description: '설명' })
  description: string;
}

/** NOTE Data Transfer Object (DTO)
 * NestJS에만 있는 개념은 아니고 필수는 아님 / 그러나 유지보수를 위해 권장됨
 * DTO는 model definition이 아니다. DTO는 특정 상황을 위한 data 형태를 정의한다
 * interface나 class로 정의할 수 있다
 * ㄴ class 권장(interface는 TS, class는 JS이므로)
 */
