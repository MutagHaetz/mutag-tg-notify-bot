import {
	Update,
	Ctx,
	Start,
	InjectBot,
} from 'nestjs-telegraf';
import { Telegraf } from 'telegraf';
import { Context } from 'src/interfaces/context.interface';

@Update()
export class BotUpdate {
	constructor(
		@InjectBot() private readonly bot: Telegraf<Context>,
	) {}

	@Start()
	async start(@Ctx() ctx: Context) {
		await ctx.reply(
			`👋hello`,
		
		);
	}

	async sendMessage(message: string) {
		const groupId = process.env.GROUP_ID; 
		try {
			await this.bot.telegram.sendMessage(groupId, message);
		} catch (error) {
			console.error('Error sending message:', error);
		}
	}

}
