import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { User } from '@prisma/client';
import { GetUser } from 'src/auth/decorator';
import { JwtGuard } from 'src/auth/guard';
import { BookmarkService } from './bookmark.service';
import { BookmarkDto } from './dto/bookmark.dto';

@UseGuards(JwtGuard)
@Controller('bookmarks')

export class BookmarkController {
    constructor(private service: BookmarkService){
    
    }

    @Post()
    create(@GetUser('id') userId: number,  @Body() dto: BookmarkDto){
        return this.service.createBookmark(userId, dto);
    }


    @Get()
    findAll(){
        return this.service.getBookmarks();
    }

    

    // @Get()
    // getBookmarkById(){

    // }

    // @Patch()
    // update(){

    // }

    // @Delete()
    // deleteBookmark(){

    // } 
}
