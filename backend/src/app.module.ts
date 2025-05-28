import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './modules/users/users.module';
import { LessonsModule } from './modules/lessons/lessons.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { getTypeOrmConfig } from './config/typeorm.config';
import { RolesModule } from './modules/roles/roles.module';
import { CoursesModule } from './modules/courses/courses.module';
import { EnrollmentModule } from './modules/enrollment/enrollment.module';
import { PaymentsModule } from './modules/payments/payments.module';
import { ProgressesModule } from './modules/progresses/progresses.module';
import { QuizModule } from './modules/quiz/quiz.module';
import { ChatModule } from './modules/chat/chat.module';
import { BlogsModule } from './modules/blogs/blogs.module';
import { AuthModule } from './modules/auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: getTypeOrmConfig,
    }),
    UsersModule,
    LessonsModule,
    RolesModule,
    CoursesModule,
    EnrollmentModule,
    PaymentsModule,
    ProgressesModule,
    QuizModule,
    ChatModule,
    BlogsModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
