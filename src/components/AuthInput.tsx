import { ChangeEvent } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';

interface AuthInputProps {
	value: string;
	setValue: (value: string) => void;
	placeholder: string;
	icon: IconDefinition;
	isPassword?: boolean;
}

const AuthInput = ({
	value,
	setValue,
	placeholder,
	icon,
	isPassword
}: AuthInputProps) => {
	return (
		<div className='auth-form__block'>
			<FontAwesomeIcon icon={icon} />
			<input
				type={isPassword ? 'password' : 'text'}
				className='auth-form__input'
				value={value}
				onChange={(e: ChangeEvent<HTMLInputElement>) =>
					setValue(e.target.value)
				}
				placeholder={placeholder}
			/>
		</div>
	);
};

export default AuthInput;
