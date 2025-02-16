export type UserProfileType = {
	email: string;
	first_name: string;
	last_name: string;
	profile_image: string;
};

export type UserBalanceType = {
	balance: number;
};

export type UserServicesType = {
	service_code: string;
	service_name: string;
	service_icon: string;
	service_tariff: number;
};

export type UserBannersType = {
	banner_name: string;
	banner_image: string;
	description: string;
};

export type UserTransactionType = {
	invoice_number: string;
	service_code: string;
	service_name: string;
	transaction_type: string;
	total_amount: number;
	created_on: string;
};

export type ShowBalanceType = {
	showBalance: boolean;
};
