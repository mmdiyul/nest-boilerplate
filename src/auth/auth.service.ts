import { HttpStatus, Injectable, Logger } from '@nestjs/common';
import { UsersRepository } from '../users/users.repository';
import { verify } from 'argon2';
import { GenericException } from '../../core/exception/generic.exception';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  logger = new Logger(AuthService.name);
  constructor(
    private userRepository: UsersRepository,
    private jwtService: JwtService,
  ) {}

  async validateUser(username: string, password: string) {
    const user = await this.userRepository.findOne({
      where: { username },
      relations: ['role', 'position'],
      select: [
        'id',
        'password',
        'username',
        'email',
        'fullname',
        'deleted_at',
        'created_at',
        'updated_at',
        'created_by',
        'deleted_by',
        'updated_by',
      ],
    });
    if (user && (await verify(user.password, password))) {
      const { password, ...result } = user;
      return result;
    }
    throw new GenericException(
      'Invalid Username or Password',
      HttpStatus.UNAUTHORIZED,
    );
  }

  async login(username: string, password: string) {
    const userData = await this.validateUser(username, password);
    const currentTime = new Date().getTime();
    const iat = Math.floor(currentTime / 1000);
    const exp = iat + 365 * 24 * 60 * 60;
    const payload = {
      username,
      sub: userData.id,
    };
    const jwt = this.jwtService.sign(payload);
    return {
      jwt,
      userData,
    };
  }
}
