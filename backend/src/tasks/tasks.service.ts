import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Task } from "./task.entity";
import { Repository } from "typeorm";
import { CreateTaskDto } from "./dto/create-task.dto";
import { UpdateTaskDto } from "./dto/update-task.dto";
import { NotFoundError } from "rxjs";
import { CreateTypeDto } from "./dto/create-type.dto";
import { TaskType } from "./taskType.entity";

@Injectable()
export class TasksService {
    constructor(@InjectRepository(Task) private taskRepository: Repository<Task>,
                @InjectRepository(TaskType) private taskTypeRepository: Repository<TaskType>) {}

    create(dto: CreateTaskDto) {
        const task = this.taskRepository.create(dto);
        return this.taskRepository.save(task);
    }

    createType(dto: CreateTypeDto) {
        const type = this.taskTypeRepository.create(dto);
        return this.taskTypeRepository.save(type);
    }

    findAll() {
        return this.taskRepository.find();
    }

    findAllTypes() {
        return this.taskTypeRepository.find();
    }

    async update(task_id: number, dto: UpdateTaskDto) {
        const task = await this.taskRepository.preload({
            id: task_id,
            ...dto,
        });

        if (!task) {
            throw new NotFoundException('Task not found');
        }

        return this.taskRepository.save(task);
    }

    delete(task_id: number) {
        return this.taskRepository.delete({ id: task_id });
    }

    deleteType(type_id: number) {
        return this.taskTypeRepository.delete({ id: type_id });
    }

    deleteAll() {
        return this.taskRepository.deleteAll();
    }
}