import { IsNotEmpty, IsOptional, IsString, MaxLength } from 'class-validator';

// createdBy、updatedByはリクエストから取得しないため、ここでは確認しない
// create時にtitle、contentは必須。update時はPartialTypeにより任意になる
export class CreateArticleDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(255)
  title: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(3000)
  content: string;

  @IsString()
  @IsOptional()
  @MaxLength(255)
  img: string;
}
