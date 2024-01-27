import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductModule } from './product/product.module';
import { InventoryModule } from './inventory/inventory.module';
import { AuthModule } from './auth/auth.module';

console.log(require('glob').sync('**/*.entity{.ts,.js}'));
@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.TYPEORM_HOST || 'localhost',
      port: Number(process.env.TYPEORM_PORT) || 5433,
      username: 'postgres',
      password: 'password',
      database: 'aima-db',
      entities: ['dist/**/*.entity{.ts,.js}'],
      synchronize: true,
    }),

    ProductModule,

    InventoryModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],

})
export class AppModule {}
