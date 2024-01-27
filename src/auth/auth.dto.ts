import { IsNotEmpty, MinLength } from "class-validator";

export class ClientCreds{
    @IsNotEmpty()
    @MinLength(3)
    clientId: string;

    @IsNotEmpty()
    @MinLength(3)
    clientSecret: string;
}