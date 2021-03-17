import { ConflictException, Injectable, InternalServerErrorException, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/entities/user.entity';
import { RegisterDTO, LoginDTO } from 'src/models/user.dto';
import { Repository } from 'typeorm';


@Injectable()
export class AuthService {

  constructor(@InjectRepository(User) private userRepo: Repository<User>, private jwtService: JwtService) {}

  async register(credentials: RegisterDTO) {
    console.log('Inside AuthService, credentials are: ', credentials);
    try {
      const user = await this.userRepo.findOne({ where: { email: credentials.email } });
      if(user) {
        throw new ConflictException('User with that email already exists');
      }
      const newUser = this.userRepo.create(credentials);
      await newUser.save();
      const payload = { email: newUser.email };
      const token = this.jwtService.sign(payload);

      console.log('Inside AuthService, register, user.toJSON is : ', newUser.toJSON());

      return { userProfile: { ...newUser.toJSON() }, token  };
    } catch (err) {
      console.log('Inside Error response, err is: ', err);
      if(err.response) {
        throw new ConflictException(err.response);
      }
      throw new InternalServerErrorException();
    }
  }

  async login(credentials: LoginDTO) {
    const { email, password } = credentials;
    try {
      const user = await this.userRepo.findOne({ where: { email } });
      const isValid = await user.comparePassword(password);
      if (!isValid) {
        throw new UnauthorizedException('Invalid credentials');
      }
      const payload = { email: user.email };
      const token = this.jwtService.sign(payload);
      console.log('Inside AuthService, login, payload is : ', payload);
      console.log('Inside AuthService, login, token is : ', token);


      console.log('Inside AuthService, login, user.toJSON is : ', user.toJSON());
      return { userProfile: { ...user.toJSON() }, token  };
    } catch (err) {
      throw new UnauthorizedException('Invalid credentials');
    }
  }

}