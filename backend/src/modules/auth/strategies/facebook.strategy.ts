// import { PassportStrategy } from '@nestjs/passport';
// import { Strategy } from 'passport-facebook';
// import { Injectable } from '@nestjs/common';
// import { ConfigService } from '@nestjs/config';
// import { AuthService } from '../auth.service';

// @Injectable()
// export class FacebookStrategy extends PassportStrategy(Strategy, 'facebook') {
//     constructor(
//         private configService: ConfigService,
//         private authService: AuthService,
//     ) {
//         super({
//             clientID: configService.get<string>('FACEBOOK_CLIENT_ID') || '',
//             clientSecret: configService.get<string>('FACEBOOK_CLIENT_SECRET') || '',
//             callbackURL: configService.get<string>('FACEBOOK_CALLBACK_URL') || '',
//             scope: ['email', 'public_profile'], // Các quyền yêu cầu từ Facebook
//             profileFields: ['id', 'displayName', 'emails', 'photos'], // Fields to request
//         });
//     }

//     async validate(
//         accessToken: string,
//         refreshToken: string,
//         profile: any,
//         done: Function,
//     ): Promise<any> {
//         const { id, displayName, emails, photos } = profile;
//         const user = {
//             facebookId: id,
//             email: emails[0].value,
//             username: displayName,
//             avatarUrl: photos[0].value,
//             // Extract first and last name if available in displayName or other fields
//         };

//         const existingUser = await this.authService.findOrCreateOAuthUser(user, 'facebook');
//         done(null, existingUser);
//     }
// }
