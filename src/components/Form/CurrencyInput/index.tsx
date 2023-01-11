import { FieldError } from 'react-hook-form';
import React, { useState, forwardRef, CSSProperties } from 'react';

import { Label } from './Label';
import CurrencyInput, { CurrencyInputProps } from 'react-currency-input-field';

import { WarningCircle } from 'phosphor-react';

import { Container, RequiredText, ErrorText, ContainerInput, ErrorSymbol } from './styles';

interface Props extends CurrencyInputProps {
	name: string;
	label?: string;
	error?: FieldError;
	containerStyle?: CSSProperties;
	maxLength?: number;
}

export const CurrencyInputField: React.FC<Props> = forwardRef(({ id, label, name, error, containerStyle, className, maxLength, required, placeholder, ...rest }, ref) => {
	const [focused, setFocused] = useState(false);
	const [errorMessage, setErrorMessage] = useState('');
	const [addClassName, setAddClassName] = useState('');
	const [rawValue, setRawValue] = useState<string | undefined>(' ');

	return (
		<Container ref={ref} style={containerStyle} className={`${focused ? 'getFocus' : 'outOfFocus'} ${error ? 'is-invalid' : ''}`}>
			{label && (
				<Label htmlFor={name}>
					{label}

					{required && <RequiredText title='Esse campo é obrigatório'>*</RequiredText>}
				</Label>
			)}

			<ContainerInput>
				<CurrencyInput
					id={name}
					name={name}
					allowDecimals={true}
					placeholder={placeholder}
					decimalsLimit={2}
					maxLength={maxLength}
					decimalSeparator=','
					groupSeparator='.'
					onFocusCapture={() => setFocused(true)}
					onBlurCapture={() => setFocused(false)}
					className={`form-control ${addClassName}`}
					prefix={'R$'}
					{...rest}
				/>

				{error && (
					<ErrorSymbol>
						{' '}
						<WarningCircle size={22} />{' '}
					</ErrorSymbol>
				)}
			</ContainerInput>

			<div>{!!error && <ErrorText>{error.message}</ErrorText>}</div>
		</Container>
	);
});
