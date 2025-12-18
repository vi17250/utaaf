import { HttpException, HttpStatus } from "@nestjs/common";

export class customException extends HttpException{
    constructor(){
        super('Interdit !', HttpStatus.FORBIDDEN)
    }
}