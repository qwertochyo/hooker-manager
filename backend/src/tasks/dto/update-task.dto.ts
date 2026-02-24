import { ApiProperty } from "@nestjs/swagger";
import { IsNumber, IsOptional, IsString, Max, Min, MinLength } from "class-validator";

export class UpdateTaskDto {

    @ApiProperty({ description: "Название eng-rus" ,example: 'Создать Hookster' })
    @IsOptional()
    @IsString()
    @MinLength(1)
    title: string;

    @ApiProperty({ description: "Описание eng-rus" ,example: 'Найти разработчиков, кинуть их' })
    @IsOptional()
    @IsString()
    description: string;

    @ApiProperty({ description: "Тип, к которому относится задача rus-eng" ,example: 'Programming' })
    @IsOptional()
    @IsString()
    type: string;

    @ApiProperty({ description: "Приоритет от 1 до 5 включительно" ,example: 1 })
    @IsOptional()
    @IsNumber()
    @Min(1)
    @Max(5)
    priority: number;

    @ApiProperty({ description: "Дата, формат гггг-мм-дд" ,example: '2023-10-25' })
    @IsOptional()
    @IsString()
    deadline: string;
}