import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put, Query } from "@nestjs/common";
import { TasksService } from "./tasks.service";
import { CreateTaskDto } from "./dto/create-task.dto";
import { UpdateTaskDto } from "./dto/update-task.dto";
import { ReturnTaskDto } from "./dto/return-task.dto";
import { ApiBody, ApiOperation, ApiParam, ApiResponse, ApiTags } from "@nestjs/swagger";
import { DeleteResult } from "typeorm";
import { CreateTypeDto } from "./dto/create-type.dto";
import { ReturnTypeDto } from "./dto/return-type.dto";

@ApiTags('TAK BCE')
@Controller('tasks')
export class TasksController {
    constructor(private readonly tasksService: TasksService) {}

    @Post()
    @ApiOperation({ summary: 'Добавить задачу' })
    @ApiResponse({ type: CreateTaskDto })
    @ApiBody({type: CreateTaskDto})
    createTask(@Body() taskDto: CreateTaskDto) {
        return this.tasksService.create(taskDto);
    }

    @Post('types')
    @ApiOperation({ summary: 'Добавить тип задачи' })
    @ApiResponse({ type: CreateTypeDto })
    @ApiBody({type: CreateTypeDto})
    createType(@Body() typeDto: CreateTypeDto) {
        return this.tasksService.createType(typeDto);
    }

    @Get()
    @ApiOperation({ summary: 'Вернуть все задачи' })
    @ApiResponse({ type: [ReturnTaskDto] })
    async returnTasks() {
        const tasks = await this.tasksService.findAll();
        return tasks.map(task => new ReturnTaskDto(task));
    }

    @Get('types')
    @ApiOperation({ summary: 'Вернуть все типы задач' })
    @ApiResponse({ type: [ReturnTypeDto] })
    async returnTypes() {
        const types = await this.tasksService.findAllTypes();
        return types.map(type => new ReturnTypeDto(type));
    }

    @Put(':id')
    @ApiOperation({ summary: 'Изменить задачу' })
    @ApiResponse({ type: UpdateTaskDto })
    @ApiParam({ name: 'id', example: 1  })
    @ApiBody({type: UpdateTaskDto})
    updateTask(
        @Param('id', ParseIntPipe) task_id: number,
        @Body() taskDto: UpdateTaskDto) {

        return this.tasksService.update(task_id, taskDto);
    }

    @Delete(':id')
    @ApiOperation({ summary: 'Удалить задачу' })
    @ApiResponse({ type: DeleteResult })
    @ApiParam({ name: 'id', example: 1 })
    deleteTask(@Param('id', ParseIntPipe) task_id: number) {
        return this.tasksService.delete(task_id);
    }

    @Delete('types/:id')
    @ApiOperation({ summary: 'Удалить тип задачи' })
    @ApiResponse({ type: DeleteResult })
    @ApiParam({ name: 'id', example: 1 })
    deleteType(@Param('id', ParseIntPipe) type_id: number) {
        return this.tasksService.deleteType(type_id);
    }

    @Delete()
    @ApiOperation({ summary: 'Удалить все задачи' })
    @ApiResponse({ type: DeleteResult })
    deleteAll() {
        return this.tasksService.deleteAll();
    }
}