import { ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { EditUserDto } from './dto';

@Injectable()
export class UserService {
    constructor(private prisma: PrismaService){}
    
    async update(id, dto: EditUserDto){

        const userExist = await this.prisma.user.findUnique({
            where: {
                id: id
            }
        });

        if(!userExist){
            throw new ForbiddenException("User doesn't exist");
        }

        const user = await this.prisma.user.update({
            where: {
                id: id
            },
            data: {
                email: dto.email,
                firstName: dto.firstName,
                lastName: dto.lastName
            }
        });

        delete user.hash;
        return user;
    }
}
