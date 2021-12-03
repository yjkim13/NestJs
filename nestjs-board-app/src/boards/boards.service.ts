import { Injectable } from '@nestjs/common';
import { Board } from './board.model';


@Injectable()
export class BoardsService {
  private boards: Board[] = []; //private를 사용한 이유는 다른 컴포넌트에서 수정이 가능하기 때문이다.

  getAllBoards(): Board[] {
    return this.boards;
  }

}
