import { Injectable, Inject } from '@nestjs/common';
import { UserPrismaService } from './user-prisma/user-prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  @Inject(UserPrismaService)
  private readonly prismaService: UserPrismaService;

  create(createUserDto: CreateUserDto) {
    return 'This action adds a new user';
  }

  findAll() {
    return `This action returns all users`;
  }

  findOne(id: number) {
    return this.prismaService.user.findUnique({
      where: {
        id,
      },
    });
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
