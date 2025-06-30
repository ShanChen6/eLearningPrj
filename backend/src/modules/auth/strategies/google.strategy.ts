// import { PassportStrategy } from '@nestjs/passport';
// import { Strategy, VerifyCallback } from 'passport-google-oauth20';
// import { Inject, Injectable } from '@nestjs/common';
// import { ConfigService, ConfigType } from '@nestjs/config';
// import { AuthService } from '../auth.service';
// import googleOauthConfig from 'src/config/google-auth.config';

// @Injectable()
// export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {
//     constructor(
//         @Inject(googleOauthConfig.KEY) private googleConfiguration: ConfigType<typeof googleOauthConfig>,
//         private authService: AuthService,
//     ) {
//         super({
//             clientID: googleConfiguration.clientID!,
//             clientSecret: googleConfiguration.clientSecret!,
//             callbackURL: googleConfiguration.callbackURL!,
//             scope: ['email', 'profile'],
//             passReqToCallback: true,
//         });
//     }


//     async validate(
//         req: any,
//         accessToken: string,
//         refreshToken: string,
//         profile: any,
//         done: VerifyCallback,
//     ): Promise<any> {
//         console.log({ profile });
//         const { name, emails, id } = profile;
//         const user = {
//             googleId: id,
//             email: emails[0].value,
//             username: name.givenName + ' ' + name.familyName,
//             firstName: name.givenName,
//             lastName: name.familyName,
//             avatarUrl: profile.photos[0].value,
//         };

//         // Tìm hoặc tạo người dùng trong database của bạn
//         const existingUser = await this.authService.findOrCreateOAuthUser(user, 'google');

//         done(null, existingUser);
//     }
// }
