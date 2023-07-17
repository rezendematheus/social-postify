import { IsBoolean, IsISO8601, IsString } from "class-validator";

export class CreatePublicationDto {
    @IsString()
    image: string;
    @IsString()
    title: string;
    @IsString()
    text: string;
    @IsISO8601()
    dateToPublish: string;
    @IsBoolean()
    published: boolean;
    @IsString()
    socialMedia: string;
}
