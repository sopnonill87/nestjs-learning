import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, ParseIntPipe, Patch, Post, UseGuards } from '@nestjs/common';
import { User } from '@prisma/client';
import { GetUser } from 'src/auth/decorator';
import { JwtGuard } from 'src/auth/guard';
import { BookmarkService } from './bookmark.service';
import { EditBookmarkDto } from './dto';
import { CreateBookmarkDto } from './dto/create-bookmark.dto';

@UseGuards(JwtGuard)
@Controller('bookmarks')

export class BookmarkController {
    constructor(private service: BookmarkService){
    
    }

    @Post()
    create(@GetUser('id') userId: number,  @Body() dto: CreateBookmarkDto){
        return this.service.createBookmark(userId, dto);
    }


    @Get()
    findAll(@GetUser('id') userId: number){
        return this.service.getBookmarks(userId);
    }

    

    @Get(":id")
    getBookmarkById(@GetUser('id') userId: number,  @Param('id', ParseIntPipe) id: number ){
        return this.service.getBookmarkById(userId, id);
    }

    @Patch(":id")
    update(@GetUser('id') userId: number, @Param('id', ParseIntPipe) id: number, @Body() dto: EditBookmarkDto){
        return this.service.updateBookmarkById(userId, id, dto);
    }

    @HttpCode(HttpStatus.NO_CONTENT)
    @Delete(":id")
    deleteBookmark(@GetUser('id') userId: number, @Param('id', ParseIntPipe) id: number){
        return this.service.deleteBookmarkById(userId, id);
    } 
}
