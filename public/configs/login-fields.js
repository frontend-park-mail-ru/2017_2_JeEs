(function () {
	'use strict';

	window.loginFields = [
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
				type: 'password',
				name: 'password',
				placeholder: 'Введите пароль',
				required: 'required',
			},
		},
		{
			attrs: {
				type: 'submit',
				value: 'Log In',
			},
		},
	];

})();
