import {
  IsEmail,
  IsNotEmpty,
  IsString,
  IsStrongPassword,
  MaxLength,
  Validate,
} from 'class-validator';
import IsUniqueEmail from 'src/lib/validator';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(50)
  user_name: string;

  @IsEmail()
  @IsNotEmpty()
  @MaxLength(100)
  @Validate(IsUniqueEmail, {
    message: '有効なメールアドレスを入力してください。',
  })
  email: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(100)
  @IsStrongPassword(
    {
      minLength: 8,
      minLowercase: 1,
      minNumbers: 1,
      minUppercase: 1,
      minSymbols: 0,
    },
    {
      message:
        'パスワードは8文字以上、英大文字・小文字、数字をそれぞれ1文字以上含む必要があります。',
    },
  )
  password: string;
}
