import { IsNotEmpty } from "class-validator";

export class CreateFileDto {
    @IsNotEmpty()
    readonly name: string;

    @IsNotEmpty()
    readonly format: string;
}