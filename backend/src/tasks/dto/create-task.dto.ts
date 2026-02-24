import { ApiProperty } from "@nestjs/swagger";
import { IsNumber, IsString, Max, Min, MinLength } from "class-validator";

export class CreateTaskDto {
    @ApiProperty({ description: "Название eng-rus" ,example: 'Создать Hookster' })
    @IsString()
    @MinLength(1)
    title: string;

    @ApiProperty({ description: "Описание eng-rus" ,example: 'Найти разработчиков, кинуть их' })
    @IsString()
    description: string;

    @ApiProperty({ description: "Тип, к которому относится задача rus-eng" ,example: 'Programming' })
    @IsString()
    type: string;

    @ApiProperty({ description: "Приоритет от 1 до 5 включительно" ,example: 1 })
    @IsNumber()
    @Min(1)
    @Max(5)
    priority: number;

    @ApiProperty({ description: "Дата, формат гггг-мм-дд" ,example: '2023-10-25' })
    @IsString()
    deadline: string;
}