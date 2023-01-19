import { Body, ForbiddenException, Injectable } from "@nestjs/common";
import { User, Bookmark } from "@prisma/client";
import { PrismaService } from "src/prisma/prisma.service";
import { AuthDto } from "./dto";
import * as argon2 from "argon2";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime";
import { JwtService } from "@nestjs/jwt";
import { ConfigService } from "@nestjs/config";

@Injectable({})

export class AuthService {
    constructor(private prisma: PrismaService, private jwt: JwtService, private config: ConfigService){
        
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
    
            //delete user.hash;
            //return saved user
            //return user;

            //after implementing jwt token, no need to return user obj

            return this.signToken(user.id, user.email);
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

        // delete user.hash;
        // return user;
        //after implementing jwt token, no need to return user obj

        return this.signToken(user.id, user.email);
    }

    async signToken(userId: number, email: string): Promise<{ access_token: string }>{
        const payload = {
            sub: userId,
            email: email
        };

        const secret = this.config.get('JWT_SECRET');

        const token = await this.jwt.signAsync(payload, {
            expiresIn: "15m",
            secret: secret
        });

        return {
            access_token: token,
        }

    }
}