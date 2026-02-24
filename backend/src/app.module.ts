import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Task } from './tasks/task.entity';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TasksModule } from './tasks/tasks.module';
import { TaskType } from './tasks/taskType.entity';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        type: 'postgres',
        host: config.get('DB_HOST'),
        port: Number(config.get('DB_PORT')),
        username: config.get('DB_USER_USERNAME'),
        password: config.get('DB_USER_PASSWORD'),
        database: config.get('DB_DATABASE_NAME'),
        entities: [Task, TaskType],
        synchronize: true,
      })
    }),
    TasksModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
