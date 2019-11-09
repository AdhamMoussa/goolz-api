import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConnectionOptions } from 'mongoose';

import { AppController } from './app.controller';
import { AppService } from './app.service';

import { GoalsModule } from './goals/goals.module';

import { env } from './utils/env';

@Module({
  imports: [
    MongooseModule.forRoot(env.DB, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false,
    } as ConnectionOptions),
    GoalsModule,
  ],

  controllers: [AppController],

  providers: [AppService],
})
export class AppModule {}
