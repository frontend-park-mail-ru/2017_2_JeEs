(function () {
	'use strict';

	window.signupFields = [
		{
			attrs: {
				type: 'email',
				name: 'email',
				placeholder: 'Введите E-Mail',
				required: 'required',
			},
		},
		{
			attrs: {
				type: 'username',
				name: 'username',
				placeholder: 'Введите логин',
				required: 'required',
			},
		},
		{
			attrs: {
				type: 'text',
				name: 'password',
				placeholder: 'Придумайте пароль длиннее 4 символов',
				required: 'required',
				pattern: '^\\S{4,}$',
			},
		},
		{
			attrs: {
				type: 'submit',
				value: 'Sign Up',
			},
		},
	];

})();
