import { Injectable, Module } from '@nestjs/common';
import { TelegrafModule } from 'nestjs-telegraf';
import { BotUpdate } from './bot.update';

@Module({
	providers: [BotUpdate]
})
export class BotModule {}
