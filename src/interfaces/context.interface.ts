import { Context as ContextTelegraf } from 'telegraf';

export interface Context extends ContextTelegraf {
	message: any;
	update: any;
	groupId: string;
}
