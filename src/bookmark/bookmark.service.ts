import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class BookmarkService {
    constructor(private prisma: PrismaService){

    }

    getBookmarks(){

    }

    createBookmark(){

    }

    getBookmarkById(){

    }

    updateBookmarkById(){

    }

    deleteBookmarkById(){
        
    } 
}