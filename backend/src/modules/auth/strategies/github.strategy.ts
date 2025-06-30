// // src/modules/auth/strategies/github.strategy.ts
// import { PassportStrategy } from '@nestjs/passport';
// import { Strategy } from 'passport-github2';
// import { Injectable } from '@nestjs/common';
// import { ConfigService } from '@nestjs/config';
// import { AuthService } from '../auth.service';

// @Injectable()
// export class GithubStrategy extends PassportStrategy(Strategy, 'github') {
//     constructor(
//         private configService: ConfigService,
//         private authService: AuthService,
//     ) {
//         super({
//             clientID: configService.get<string>('GITHUB_CLIENT_ID') ?? '',
//             clientSecret: configService.get<string>('GITHUB_CLIENT_SECRET') ?? '',
//             callbackURL: configService.get<string>('GITHUB_CALLBACK_URL') ?? '',
//             scope: ['user:email'],
//         });
//     }

//     async validate(
//         accessToken: string,
//         refreshToken: string,
//         profile: any,
//         done: Function,
//     ): Promise<any> {
//         const { id, username, emails, photos } = profile;
//         const user = {
//             githubId: id,
//             email: emails[0].value,
//             username: username,
//             avatarUrl: photos[0].value,
//             // Extract real name if available in profile.displayName or profile._json.name
//         };

//         const existingUser = await this.authService.findOrCreateOAuthUser(user, 'github');
//         done(null, existingUser);
//     }
// }
