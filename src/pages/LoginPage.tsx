import { FormEvent, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { faEnvelope, faLock } from '@fortawesome/free-solid-svg-icons';
import AuthInput from '../components/AuthInput';
import { firebaseAuthSignIn } from '../firebase/auth';
import { CHAT_ROUTE, REGISTER_ROUTE } from '../utils/consts';
import { getErrorMessage } from '../utils/errors';
import { useAppDispatch } from '../hooks/reduxHooks';
import { setUser } from '../redux/slices/userSlice';

const LoginPage = () => {
	const [email, setEmail] = useState<string>('');
	const [password, setPassword] = useState<string>('');
	const [error, setError] = useState<string>('');

	const dispatch = useAppDispatch();
	const navigate = useNavigate();

	const signIn = async (event: FormEvent) => {
		setError('');
		event.preventDefault();
		if (email.trim() !== '' && password.trim() !== '') {
			const authResult = await firebaseAuthSignIn(email, password);

			if (typeof authResult === 'string') {
				setError(getErrorMessage(authResult));
			} else {
				const { displayName, email, uid } = authResult;
				const token = await authResult.getIdToken();
				dispatch(
					setUser({
						name: displayName,
						email,
						token,
						id: uid
					})
				);
				navigate(CHAT_ROUTE);
			}
		} else {
			setError('Ошибка: Заполните все поля');
		}
	};

	return (
		<div className='auth'>
			<form className='auth-form' onSubmit={signIn}>
				<h1 className='auth-form__title'>Вход</h1>
				<AuthInput
					value={email}
					setValue={setEmail}
					placeholder='E-mail'
					icon={faEnvelope}
				/>
				<AuthInput
					value={password}
					setValue={setPassword}
					placeholder='Пароль'
					icon={faLock}
					isPassword={true}
				/>
				<input type='submit' value='Войти' className='auth-form__submit' />
				<p className='auth-form__link'>
					У вас еще нет аккаунта: <Link to={REGISTER_ROUTE}>Регистрация</Link>
				</p>
				{error && <p className='auth-form__error'>{error}</p>}
			</form>
		</div>
	);
};

export default LoginPage;
