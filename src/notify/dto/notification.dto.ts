export interface NotificationDto {
	name?: string
	firstName?: string
	lastName?: string
	email?: string
	phone?: string
	delivery?: string
	orderPrice?: number
	goods?: {title: string, count: number}[]
}
