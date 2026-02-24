import { ApiProperty } from "@nestjs/swagger";
import { IsString, MinLength } from "class-validator";

export class CreateTypeDto {
    @ApiProperty({ description: "Название eng-rus" ,example: 'Программирование' })
    @IsString()
    @MinLength(1)
    title: string;
}