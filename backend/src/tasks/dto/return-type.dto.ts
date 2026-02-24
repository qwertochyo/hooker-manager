import { ApiProperty } from "@nestjs/swagger";
import { Exclude, Expose } from "class-transformer";

@Exclude()
export class ReturnTypeDto {
    @ApiProperty({ description: "Идентификатор типа задачи" ,example: 1 })
    @Expose()
    id: number;

    @ApiProperty({ description: "Название типа задачи" ,example: 'Программирование' })
    @Expose()
    title: string;

    constructor(partial: Partial<ReturnTypeDto>) {
        Object.assign(this, partial);
    }
}