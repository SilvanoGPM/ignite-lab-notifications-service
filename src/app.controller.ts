import { Body, Controller, Get, Post } from '@nestjs/common';
import { randomUUID } from 'node:crypto';
import { Notification, PrismaPromise } from '@prisma/client';
import { PrismaService } from './prisma.service';
import { CreateNotificationDto } from './create-notification.dto';

@Controller('notifications')
export class AppController {
  constructor(private readonly prismaService: PrismaService) {}

  @Get()
  list(): PrismaPromise<Notification[]> {
    return this.prismaService.notification.findMany();
  }

  @Post()
  async create(@Body() createNotificationDto: CreateNotificationDto) {
    await this.prismaService.notification.create({
      data: {
        id: randomUUID(),
        ...createNotificationDto,
      },
    });
  }
}
