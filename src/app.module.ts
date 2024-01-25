import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductModule } from './product/product.module';
import { InverntoryModule } from './inverntory/inverntory.module';



console.log(require('glob').sync('**/*.entity{.ts,.js}'))
@Module({
  imports: [
   
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5433,
      username: 'postgres',
      password: 'password',
      database: 'aima-db',
      entities: ['dist/**/*.entity{.ts,.js}'],
      synchronize: true,
    }),
   
    ProductModule,
   
    InverntoryModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
