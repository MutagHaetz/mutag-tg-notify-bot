import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { BotModule } from './bot/bot.module';
import { TasksService } from './cron.service';
import { ScheduleModule } from '@nestjs/schedule';
import { NotifyController } from './notify/notify.controller';
import { NotifyService } from './notify/notify.service';
import { TelegrafModule } from 'nestjs-telegraf';
import { BotUpdate } from './bot/bot.update';

@Module({
	imports: [ConfigModule.forRoot(), ScheduleModule.forRoot(),
		ConfigModule.forRoot({ isGlobal: true, envFilePath: '.env' }),
		TelegrafModule.forRoot({ token: process.env.BOT_API_TOKEN }),
		BotModule],
	controllers: [NotifyController],
	providers: [TasksService, NotifyService, BotUpdate],
})
export class AppModule {}
