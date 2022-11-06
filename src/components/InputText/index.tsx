import React, { CSSProperties, useState } from 'react';
import { Eye, EyeSlash } from 'phosphor-react';
import { WarningCircle } from 'phosphor-react';
import { Props as PropsMask } from 'react-input-mask';
import { Label } from './Label';

import { Container, TextInput, ErrorText, RequiredText, ButtonEyeView, ContainerInput, ErrorSymbol } from './styles';

interface Props extends PropsMask {
	label?: string;
	error?: string;
	containerStyle?: CSSProperties;
	passwordView?: boolean;
}

const InputText: React.FC<Props> = React.forwardRef(({ id, label, error, mask, required, containerStyle, type, passwordView, className, ...rest }, ref: any) => {
	const [passwordViewType, setPasswordViewType] = useState<'password' | 'text'>('password');
	const [insertFocus, setInsertFocus] = useState('');

	return (
		<Container ref={ref} style={containerStyle} className={insertFocus}>
			{label && (
				<Label htmlFor={id} style={{ marginBottom: 2 }}>
					{label}
					{required && <RequiredText title='Esse campo é obrigatório'>*</RequiredText>}
				</Label>
			)}
			<ContainerInput>
				<TextInput
					id={id}
					type={passwordView ? passwordViewType : type}
					mask={mask}
					className={`${error ? 'is-invalid' : ''} ${className ? className : ''}`}
					onFocusCapture={() => setInsertFocus('getFocus')}
					onBlurCapture={() => setInsertFocus('')}
					{...rest}
				/>

				{passwordView && (
					<ButtonEyeView type='button' onClick={() => setPasswordViewType(passwordViewType === 'password' ? 'text' : 'password')}>
						{passwordViewType === 'password' ? <Eye size={16} color='#838383' /> : <EyeSlash size={16} color='#838383' />}
					</ButtonEyeView>
				)}

				{error && (
					<ErrorSymbol>
						{' '}
						<WarningCircle size={22} />{' '}
					</ErrorSymbol>
				)}
			</ContainerInput>

			{error && <ErrorText>{error}</ErrorText>}
		</Container>
	);
});

export { InputText };
