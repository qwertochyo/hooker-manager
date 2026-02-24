import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { TasksService } from "./tasks.service";
import { TasksController } from "./tasks.controller";
import { Task } from "./task.entity";
import { TaskType } from "./taskType.entity";

@Module({
    imports: [TypeOrmModule.forFeature([Task, TaskType])],
    providers: [TasksService],
    controllers: [TasksController],
})
export class TasksModule {}