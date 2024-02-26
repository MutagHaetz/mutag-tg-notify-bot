import { Injectable } from '@nestjs/common';
import axios from 'axios';
import { BotUpdate } from '../bot/bot.update';
import { NotificationDto } from './dto/notification.dto';

@Injectable()
export class NotifyService {
	constructor(private readonly botUpdate: BotUpdate) {}

	async notifyMessage(dto: NotificationDto) {
		let message: string;

		if (!dto.orderPrice) {
			message =
				// `🆘Received new contact request📞:
				`🆘 קיבלתי בקשת קשר חדשה 📞:

שם: ${dto.name}
דואר: ${dto.email}
טלפון: ${dto.phone}`;
		}

		if (dto.orderPrice) {
			let goodsList = '';
			if (dto.goods.length > 0) {
				goodsList = dto.goods
					.map(({ title, count }) => `${title}: x${count}, `)
					.join('');
			}

			// message = `✅Received new order🛒:
			message = `✅ התקבלה הזמנה חדשה 🛒:

מספר הזמנה: ${dto.orderNum}
שם: ${dto.firstName}
שם משפחה: ${dto.lastName}
דואר: ${dto.email}
טלפון: ${dto.phone}
הובלה ל: ${dto.delivery}
מחיר הזמנה: ${dto.orderPrice}
מוצרים: ${goodsList}`;
		}

		return await this.botUpdate.sendMessage(message);
	}

	async checkNotify(): Promise<string> {
		try {
			console.log(process.env.HOST_URL);
			const response = await axios.get(process.env.HOST_URL + '/notify');
			return response.data;
		} catch (error) {
			console.error('Error when checking notify:', error);
			throw error;
		}
	}
}
