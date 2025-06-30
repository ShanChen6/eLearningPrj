import { BadRequestException, Body, Controller, Get, HttpCode, HttpStatus, Post, Req, Request, Res, UseGuards } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { RegisterDto } from "./dto/register.dto";
import { User } from "src/common/entities/user.entity";
import { LocalAuthGuard } from "./guards/local-auth.guard";
import { AuthResponseDto } from "./dto/auth-response.dto";
import { JwtAuthGuard } from "./guards/jwt-auth.guard";
import { GoogleAuthGuard } from "./guards/google-auth.guard";
import { FacebookAuthGuard } from "./guards/facebook-auth.guard";
import { GithubAuthGuard } from "./guards/github-auth.guard";

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  // @HttpCode(HttpStatus.OK)
  // @UseGuards(LocalAuthGuard)
  // @Post('login')
  // async login(@Request() req) {
  //   const token = this.authService.login(req.user.id);
  //   return {
  //     id: req.user.id,
  //     token: token,
  //   }
}


// @Post('register')
// @HttpCode(HttpStatus.CREATED)
// async register(@Body() registerDto: RegisterDto): Promise<User> {
//   return this.authService.register(registerDto);
// }

// @HttpCode(HttpStatus.OK)
// @UseGuards(LocalAuthGuard)
// @Post('login')
// async login(@Body() loginDto: import('./dto/login.dto').LoginDto): Promise<AuthResponseDto> {
//   return this.authService.login(loginDto);
// }

// @Post('refresh')
// @HttpCode(HttpStatus.OK)
// async refreshTokens(@Body('refreshToken') refreshToken: string): Promise<AuthResponseDto> {
//   if (!refreshToken) {
//     throw new BadRequestException('Refresh token không được cung cấp.');
//   }
//   return this.authService.refreshTokens(refreshToken);
// }

// @UseGuards(JwtAuthGuard) // Bảo vệ route logout bằng JWT
// @Post('logout')
// @HttpCode(HttpStatus.OK)
// async logout(@Req() req: Request & { user: User }): Promise<{ message: string }> {
//   await this.authService.logout(req.user.id);
//   return { message: 'Đăng xuất thành công.' };
// }

// @UseGuards(JwtAuthGuard) // Bảo vệ route profile bằng JWT
// @Get('profile')
// getProfile(@Req() req: Request & { user: User }): User {
//   // req.user sẽ chứa đối tượng người dùng sau khi JwtAuthGuard xác thực thành công
//   return req.user;
// }

// ==================== OAuth Routes ====================

// @UseGuards(GoogleAuthGuard)
// @Get('google/login')
// async googleLogin(@Req() req) {
// }

// @UseGuards(GoogleAuthGuard)
// @Get('google/callback')
// async googleCallback(@Req() req) {
// }


// @Get('facebook')
// @UseGuards(FacebookAuthGuard)
// async facebookAuth(@Req() req) {
//   // Initiates the Facebook OAuth flow
// }

// @Get('facebook/callback')
// @UseGuards(FacebookAuthGuard)
// async facebookAuthCallback(@Req() req: Request & { user: User }, @Res() res: Response) {
//   const authResult = await this.authService.login(req.user);
//   const frontendRedirectUrl = `${this.authService.ConfigService.get('FRONTEND_URL')}/auth/oauth-callback?accessToken=${authResult.accessToken}&refreshToken=${authResult.refreshToken}`;
//   res.redirect(frontendRedirectUrl);
// }

// @Get('github')
// @UseGuards(GithubAuthGuard)
// async githubAuth(@Req() req) {
//   // Initiates the GitHub OAuth flow
// }

// @Get('github/callback')
// @UseGuards(GithubAuthGuard)
// async githubAuthCallback(@Req() req: Request & { user: User }, @Res() res: Response) {
//   const authResult = await this.authService.login(req.user);
//   const frontendRedirectUrl = `${this.authService.configService.get('FRONTEND_URL')}/auth/oauth-callback?accessToken=${authResult.accessToken}&refreshToken=${authResult.refreshToken}`;
//   res.redirect(frontendRedirectUrl);
// }

