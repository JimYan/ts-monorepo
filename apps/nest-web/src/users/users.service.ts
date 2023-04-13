import { Injectable, Inject } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
// import { CreateUserDto } from 'src/generated/nestjs-dto/create-user.dto';

@Injectable()
export class UsersService {
  @Inject(PrismaService)
  private readonly prismaService: PrismaService;

  async create(createUserDto: CreateUserDto) {
    const info = await this.prismaService.user.create({
      data: createUserDto,
    });
    return info;
  }

  async findAll() {
    const list = await this.prismaService.user.findMany();
    return list;
  }

  findOne(id: number) {
    return this.prismaService.user.findUnique({
      where: {
        id,
      },
    });
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return this.prismaService.user.update({
      data: updateUserDto,
      where: {
        id,
      },
    });
  }

  remove(id: number) {
    return this.prismaService.user.delete({
      where: {
        id,
      },
    });
  }
}
