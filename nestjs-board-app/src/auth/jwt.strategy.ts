import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { InjectRepository } from "@nestjs/typeorm";
import { ExtractJwt, Strategy } from "passport-jwt";
import { User } from "./user.entity";
import { UserRepository } from "./user.repository";

@Injectable()
// 다른 곳에서도 주입해서 사용을 할 수 있게 하기 위해
export class JwtStrategy extends PassportStrategy(Strategy) {
    //class를 생성할 때, PassportStrategy안에 있는 기능을 사용하기위해 상속을 한다.
    //Strategy는 passport-jwt 사용하기 위해 넣어준다.
    constructor(
        @InjectRepository(UserRepository)
        private userRepository: UserRepository
    ) {
        super({
            secretOrKey: 'Secret1234',
            //토큰이 유요한지 체크하기 위해 사용.
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken()
            //토큰이 유효한지 확인한 다음에, payload안에 유저이름을 확인 후, 유저이름으로 유저객체를 DB에서 가져오기 위해 주입.
            //토큰이 어디서 가져오는지에 대해서 설정.
            //Authorization Header고 Bearer Token 타입으로 넘어오는걸 가져와서 유효한지 체크.
        })
    }

    //유효한지 확인이 되었으면 Payload안에 있는 username으로 데이터베이스에
    //있는 username인지 확인후. user가 있다면 return 값으로 던저준다.
    //없다면 error를 던져준다.
    async validate(payload) {
        const { username } = payload;
        const user: User = await this.userRepository.findOne({ username });

        if (!user) {
            throw new UnauthorizedException();
        }

        return user;
    }








}