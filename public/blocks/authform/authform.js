import Form from "../form/form";

class AuthForm extends Form {
	constructor() {
		const fieldPrototypes = [
			{ name: "login", type: "text", placeholder: "Логин" },
			{ name: "password", type: "password", placeholder: "Пароль" },
		];

		const classes = {
			formClass: "auth-form",
			fieldClass: "auth-form__field",
			submitClass: "auth-form__field"
		};

		const submitText = "Войти";
		const hrefText = "Создать аккаунт";

		super(fieldPrototypes, classes, submitText, hrefText);
	}
}

export default AuthForm;
