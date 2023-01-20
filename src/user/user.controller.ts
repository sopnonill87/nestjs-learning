import { Body, Controller, Get, Param, Patch, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { User } from '@prisma/client';
import { Request } from 'express';
import { GetUser } from 'src/auth/decorator';
import { JwtGuard } from 'src/auth/guard';
import { EditUserDto } from './dto';
import { UserService } from './user.service';

@UseGuards(JwtGuard)
@Controller('users')
export class UserController {
    constructor(private service: UserService){
        
    }

    @Get('me')
    getMe(@GetUser() user: User, @GetUser('email') email: string){        
        return user;
    }

    @Patch(':id')
    update(@Param('id') id: string, @Body() dto: EditUserDto){
        return this.service.update(+id, dto);
    }

}
