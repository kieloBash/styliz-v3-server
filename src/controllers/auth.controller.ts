import { Body, Controller, Post } from '@nestjs/common';
import { Public } from 'src/auth/auth.public.decorator';
import { LoginUserRequestDTO, RegisterUserRequestDTO } from 'src/requests';
import { UserService } from 'src/services/user.service';

@Public()
@Controller('api/auth')
export class AuthController {
  constructor(private readonly userService: UserService) {}

  @Post('/login')
  async login(@Body() { email, password }: LoginUserRequestDTO) {
    return this.userService.loginUser(email, password);
  }

  @Post('/register')
  async registerUser(@Body() request: RegisterUserRequestDTO) {
    return this.userService.registerUser(request);
  }
}
