import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserRspository } from './user.repository';

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(UserRspository)
        private userRepository: UserRspository
    ) { }
}
