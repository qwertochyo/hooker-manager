import { ApiProperty } from "@nestjs/swagger";
import { Exclude, Expose } from "class-transformer";

@Exclude()
export class ReturnTaskDto {
    @ApiProperty({ description: "Идентификатор задачи" ,example: 1 })
    @Expose()
    id: number;

    @ApiProperty({ description: "Название eng-rus" ,example: 'Создать Hookster' })
    @Expose()
    title: string;

    @ApiProperty({ description: "Описание eng-rus" ,example: 'Найти разработчиков, кинуть их' })
    @Expose()
    description: string;

    @ApiProperty({ description: "Тип, к которому относится задача rus-eng" ,example: 'Programming' })
    @Expose()
    type: string;

    @ApiProperty({ description: "Приоритет от 1 до 5 включительно" ,example: 1 })
    @Expose()
    priority: number;

    @ApiProperty({ description: "Дата, формат гггг-мм-дд" ,example: '2023-10-25' })
    @Expose()
    deadline: string;

    constructor(partial: Partial<ReturnTaskDto>) {
        Object.assign(this, partial);
    }
}