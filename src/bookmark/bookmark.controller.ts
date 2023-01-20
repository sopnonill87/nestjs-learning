import { Controller, UseGuards } from '@nestjs/common';
import { JwtGuard } from 'src/auth/guard';
import { BookmarkService } from './bookmark.service';

@UseGuards(JwtGuard)
@Controller('bookmarks')

export class BookmarkController {
    constructor(private service: BookmarkService){
    
    }

    @Get()
    getBookmarks(){
        return this.service.getBookmarks();
    }

    @Post()
    createBookmark(){

    }

    @Get()
    getBookmarkById(){

    }

    @Patch()
    update(){

    }

    @Delete()
    deleteBookmark(){

    } 
}
