import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthCredentialsDto } from './dto/auth-credential.dto';
import { UserRspository } from './user.repository';

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(UserRspository)
        private userRepository: UserRspository
    ) { }

    async signUp(authCredentialDto: AuthCredentialsDto): Promise<void> {
        return this.userRepository.createUser(authCredentialDto);
    }
}
