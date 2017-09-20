import Form from "../form/form";
import Input from "../input/input";
import Block from "../block/block"

class AuthForm extends Form {
	constructor() {
		const fieldPrototypes = [
			{ type: "text", placeholder: "Логин" },
			{ type: "email", placeholder: "Email" },
			{ type: "password", placeholder: "Пароль" }
		];

		const fields = [];
		fieldPrototypes.forEach((fieldPrototype) => {
			fields.push(Input.Create(fieldPrototype.type, ["auth-form__field"], {
				name: fieldPrototype.type,
				placeholder: fieldPrototype.placeholder,
				required: "required"
			}));
		});

		fields.push(Input.Create("submit", ["auth-form__field"], { value: "Войти" }));
		fields.push(Block.Create("a", [], { href: "#" }).setText("Регистрация"));

		super(fields, ["auth-form"]);
	}
}

export default AuthForm;
