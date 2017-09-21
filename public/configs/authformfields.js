const title = "Вход";

const fieldPrototypes = [
	{
		type: "text",
		attributes: {
			name: "login",
			placeholder: "Логин"
		}
	},
	{
		type: "password",
		attributes: {
			name: "password",
			placeholder: "Пароль"
		}
	},
	{
		type: "submit",
		attributes: {
			value: "Вход"
		}
	}
];

const refPrototype = {
	text: "Создать аккаунт",
	attributes: {
		href: "",
	}
};


export {title, fieldPrototypes, refPrototype};
