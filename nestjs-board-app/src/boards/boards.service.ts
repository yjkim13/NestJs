import { Injectable, NotFoundException } from '@nestjs/common';
import { Board, BoardStatus } from './board.model';
import { v1 as uuid } from 'uuid';
// 여기서 v1은 uuid의 버젼 v1을 쓰는거고 as 이름을 v1이 아닌 uuid로 쓰기 위함
import { CreateBoardDto } from './dto/create-board.dto';

@Injectable()
export class BoardsService {
  private boards: Board[] = []; //private를 사용한 이유는 다른 컴포넌트에서 수정이 가능하기 때문이다.

  getAllBoards(): Board[] {
    return this.boards;
  }

  creatBoard(createBoardDto: CreateBoardDto) {
    const { title, description } = createBoardDto

    const board: Board = {
      id: uuid(),
      title,
      description,
      // javascript에서는 description: description; 일때 위처럼 선언할 수 있다.
      status: BoardStatus.PUBLIC,
    };

    this.boards.push(board);
    return board;
  }

  getBoardById(id: string): Board {
    const found = this.boards.find((board) => board.id === id);
    if (!found) {
      throw new NotFoundException(`Can't find Board with id ${id}`);
    }
    return found
  }

  deleteBoard(id: string): void {
    const found = this.getBoardById(id)
    this.boards = this.boards.filter((board) => board.id !== found.id)
  }

  updateBoardStatus(id: string, status: BoardStatus): Board {
    const board = this.getBoardById(id);
    board.status = status;
    return board;
  }
}
