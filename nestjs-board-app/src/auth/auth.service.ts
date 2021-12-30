import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthCredentialsDto } from './dto/auth-credential.dto';
import { UserRspository } from './user.repository';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(UserRspository)
        private userRepository: UserRspository
    ) { }

    async signUp(authCredentialDto: AuthCredentialsDto): Promise<void> {
        return this.userRepository.createUser(authCredentialDto);
    }

    async signIn(authCredentialDto: AuthCredentialsDto): Promise<string> { //type으로  string을 주기 때문에
        const { username, password } = authCredentialDto;
        const user = await this.userRepository.findOne({ username });

        if (user && (await bcrypt.compare(password, user.password))) {
            return 'login success'
        } else {
            throw new UnauthorizedException("login failed");
        }
    }
}
