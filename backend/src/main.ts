import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DataSource } from 'typeorm';
// import { createInitialAdmin } from './modules/users/mock_user_admin';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const dataSource = app.get(DataSource);

  // // Tạo admin user nếu đang chạy ở môi trường phát triển
  // if (process.env.NODE_ENV !== 'production') {
  //   await createInitialAdmin(dataSource);
  // }

  await app.listen(process.env.PORT ?? 3001);
}
bootstrap();
