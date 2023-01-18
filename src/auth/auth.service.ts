import { Body, Injectable } from "@nestjs/common";
import { User, Bookmark } from "@prisma/client";
import { PrismaService } from "src/prisma/prisma.service";
import { AuthDto } from "./dto";
import * as argon2 from "argon2";

@Injectable({})

export class AuthService {
    constructor(private prisma: PrismaService){
        
    }

    async signup(dto: AuthDto){
        //generate hash
        const hash = await argon2.hash(dto.password);
        
        //save the new user in the db
        const user = await this.prisma.user.create({
            data: {
                email: dto.email,
                hash,
            }
        });

        //return saved user
        return user;
    }

    signin(){
        return {
            msg : "signin"
        };
    }
}