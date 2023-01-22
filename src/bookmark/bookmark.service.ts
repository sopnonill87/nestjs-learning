import { Body, ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { User } from '@prisma/client';
import { GetUser } from 'src/auth/decorator';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateBookmarkDto, EditBookmarkDto } from './dto';

@Injectable()
export class BookmarkService {
    constructor(private prisma: PrismaService){

    }

    async getBookmarks(userId: number){
        const bookmarks = await this.prisma.bookmark.findMany({
            where: {
                userId
            }
        });
        return bookmarks;
    }

    async createBookmark(userId: number, @Body() dto: CreateBookmarkDto){
        const bookmark = await this.prisma.bookmark.create({
            data: {
                userId: userId,
                ...dto
            }
        });
        
        return bookmark;

    }

    async getBookmarkById(userId: number, id){
        const bookmark = await this.prisma.bookmark.findMany({
            where: {
                userId,
                id: id,
            }
        });

        return bookmark;
    }

    async updateBookmarkById(userId: number, id, dto: EditBookmarkDto){
        const bookmarkCheck = await this.prisma.bookmark.findFirst({
            where: {
                userId,
                id: id,
            }
        });

        if(!bookmarkCheck || bookmarkCheck.userId !== userId){
            throw new ForbiddenException("Access to resource denied");
        }

        const bookmark = await this.prisma.bookmark.update({
            where: {
                id: id
            },
            data: {
                ...dto
            }
        });

        return bookmark;
    }

    async deleteBookmarkById(userId, id){
        const bookmarkCheck = await this.prisma.bookmark.findFirst({
            where: {
                userId,
                id: id,
            }
        });

        if(!bookmarkCheck || bookmarkCheck.userId !== userId){
            throw new ForbiddenException("Access to resource denied");
        }

        await this.prisma.bookmark.delete({
            where: {
                id: id
            }
        });
    } 
}
