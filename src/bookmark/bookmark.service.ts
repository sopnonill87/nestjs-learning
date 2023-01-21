import { Body, Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import { GetUser } from 'src/auth/decorator';
import { PrismaService } from 'src/prisma/prisma.service';
import { BookmarkDto } from './dto/bookmark.dto';

@Injectable()
export class BookmarkService {
    constructor(private prisma: PrismaService){

    }

    async getBookmarks(){
        const bookmarks = await this.prisma.bookmark.findMany();
        return bookmarks;
    }

    async createBookmark(userId: number, @Body() dto: BookmarkDto){
        const bookmark = await this.prisma.bookmark.create({
            data: {
                userId: userId,
                ...dto
            }
        });
        
        return bookmark;

    }

    // getBookmarkById(){

    // }

    // updateBookmarkById(){

    // }

    // deleteBookmarkById(){
        
    // } 
}
