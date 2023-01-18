import { Body, ForbiddenException, Injectable } from "@nestjs/common";
import { User, Bookmark } from "@prisma/client";
import { PrismaService } from "src/prisma/prisma.service";
import { AuthDto } from "./dto";
import * as argon2 from "argon2";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime";

@Injectable({})

export class AuthService {
    constructor(private prisma: PrismaService){
        
    }

    async signup(dto: AuthDto){
        //generate hash
        const hash = await argon2.hash(dto.password);
        
        //save the new user in the db
        try {
            const user = await this.prisma.user.create({
                data: {
                    email: dto.email,
                    hash,
                }
            });
    
            delete user.hash;
            //return saved user
            return user;
        } catch (error) {
            if(error instanceof PrismaClientKnownRequestError){
                if(error.code === 'P2002'){
                    throw new ForbiddenException('Credentials taken')
                }
            }

            throw error;
        }
        
    }

    async signin(dto: AuthDto){
        //find the user with email id
        const user = await this.prisma.user.findUnique({
            where: {
                email: dto.email,
            }
        });

        //if user doesn't exist throw exception
        if(!user){
            throw new ForbiddenException('Credentials incorrect');
        }

        //compare password
        const pwMatches = await argon2.verify(user.hash, dto.password);

        if(!pwMatches){
            throw new ForbiddenException('Credentials incorrect');
        }

        delete user.hash;
        return user;
    }
}