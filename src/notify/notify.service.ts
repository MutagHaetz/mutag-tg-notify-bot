import { Injectable } from '@nestjs/common';
import axios from 'axios';
import { BotUpdate } from '../bot/bot.update';
import { NotificationDto } from './dto/notification.dto';

@Injectable()
export class NotifyService {
	constructor(private readonly botUpdate: BotUpdate) { }

	async notifyMessage(dto: NotificationDto) {
		let message: string

		if (!dto.orderPrice) {
			message =
				`🆘Received new contact request📞:

			Name: ${dto.name}
			Email: ${dto.email}
			Phone: ${dto.phone}`
		}

			if (dto.orderPrice) {
				let goodsList = ''
				if (dto.goods.length > 0) {
					goodsList = dto.goods.map(({ title, count }) => `${title}: x${count}, `).join('')
				}
			
				message =
					`✅Received new order🛒:

			FirstName: ${dto.firstName}
			LastName: ${dto.lastName}

			Email: ${dto.email}
			Phone: ${dto.phone}

			Delivery: ${dto.delivery}
			OrderPrice: ${dto.orderPrice}
			Goods: ${goodsList}`;
		}
		
			return await this.botUpdate.sendMessage(message);
		}

	

	async checkNotify(): Promise < string > {
			try {
				console.log(process.env.HOST_URL)
			const response = await axios.get(process.env.HOST_URL + '/notify');
				return response.data;
			} catch(error) {
				console.error('Error when checking notify:', error);
				throw error;
			}
		}
	}


