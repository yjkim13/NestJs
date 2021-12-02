import { Injectable } from '@nestjs/common';

@Injectable()
export class BoardsService {
    private boards = []; //private를 사용한 이유는 다른 컴포넌트에서 수정이 가능하기 때문이다.

    getAllBoards() {
        return this.boards;
    
    }
}
