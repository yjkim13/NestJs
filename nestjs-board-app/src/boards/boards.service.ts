import { Injectable, NotFoundException } from '@nestjs/common';
import { BoardStatus } from './board-status.enum';
import { v1 as uuid } from 'uuid';
// 여기서 v1은 uuid의 버젼 v1을 쓰는거고 as 이름을 v1이 아닌 uuid로 쓰기 위함
import { CreateBoardDto } from './dto/create-board.dto';
import { BoardRepository } from './board.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { Board } from './board.entity';

@Injectable()
export class BoardsService {
  constructor(
    // 이 데코레이터를 이용해서 이 서비스에서 BoardRepository를 이용한다고 이걸 boardRepository 변수에 넣어줍니다.
    @InjectRepository(BoardRepository)
    private boardRepository: BoardRepository,
  ) { }


  // getAllBoards(): Board[] {
  //   return this.boards;
  // }

  // creatBoard(createBoardDto: CreateBoardDto) {
  //   const { title, description } = createBoardDto

  //   const board: Board = {
  //     id: uuid(),
  //     title,
  //     description,
  //     // javascript에서는 description: description; 일때 위처럼 선언할 수 있다.
  //     status: BoardStatus.PUBLIC,
  //   };

  //   this.boards.push(board);
  //   return board;
  // }

  createBoard(createBoardDto: CreateBoardDto): Promise<Board> {

    return this.boardRepository.createBoard(createBoardDto)
  }

  async getBoardById(id: number): Promise<Board> {//Entitiy를 type으로 선언한다.
    const found = await this.boardRepository.findOne(id);

    if (!found) {
      throw new NotFoundException(`Can't find Board with id ${id}`)
    }

    return found

  }
  // getBoardById(id: string): Board {
  //   const found = this.boards.find((board) => board.id === id);
  //   if (!found) {
  //     throw new NotFoundException(`Can't find Board with id ${id}`);
  //   }
  //   return found
  // }

  // deleteBoard(id: string): void {
  //   const found = this.getBoardById(id)
  //   this.boards = this.boards.filter((board) => board.id !== found.id)
  // }

  // updateBoardStatus(id: string, status: BoardStatus): Board {
  //   const board = this.getBoardById(id);
  //   board.status = status;
  //   return board;
  // }
}
