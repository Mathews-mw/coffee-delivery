import { useForm } from "react-hook-form";
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup'
import { InputText } from "../../components/InputText"
import { UserPlus } from 'phosphor-react';
import IconButton from '@mui/material/IconButton';
import PhotoCamera from '@mui/icons-material/PhotoCamera';
import { RegisterCard, RegisterContainer, Form } from "./styles"
import { useState } from "react";

const registerFormSchema = yup.object({
  name: yup.string().required('Campo obrigatório!'),
  email: yup.string().email().required('Campo obrigatório!'),
  phone: yup.string().required('Campo obrigatório!'),
  password: yup.string().required('Campo obrigatório!').min(8, 'Sua senha precisa ter no mínimo 8 dígitos'),
  confirmPassword: yup.string().required('Campo obrigatório!'),
  avatarFile: yup.string().notRequired(),
  createdOn: yup.date().default(() => {
    return new Date();
  }),
});

type RegisterFormInputs = yup.InferType<typeof registerFormSchema>

export function Register() {

  const { register, handleSubmit, watch, formState: { errors } } = useForm<RegisterFormInputs>({
    resolver: yupResolver(registerFormSchema)
  });

  function handleRegisterNewUser(data: RegisterFormInputs) {

  }

  return (
    <RegisterContainer>
      <Form onSubmit={handleSubmit(handleRegisterNewUser)}>
        <RegisterCard>
          <div className='headerGroup'>
            <span> <UserPlus size={22} /> </span>
            <div>
              <h4>Crie sua conta</h4>
              <p>Registe-se na nossa plataforma para ter uma melhor experiência</p>
            </div>
          </div>

          <InputText mask='' type='text' label='Nome' {...register('name')} error={errors.name?.message} />
          <InputText mask='' type='email' label='E-mail' {...register('email')} error={errors.email?.message} />
          <InputText mask='(99) 99999-9999' label='Telefone' {...register('phone')} error={errors.phone?.message} />
          <InputText mask='' type='password' label='Senha' passwordView {...register('password')} error={errors.password?.message} />
          <InputText mask='' type='password' label='Confirmar senha' passwordView {...register('confirmPassword')} error={errors.confirmPassword?.message} />

          <div>
            <span>Inserir uma foto de perfil?</span>
            <IconButton color="secondary" aria-label="upload picture" component="label">
              <input hidden type="file" accept="image/png, image/jpeg" {...register('avatarFile')} />
              <PhotoCamera />
            </IconButton>
          </div>

          <button type="submit"> Criar </button>

        </RegisterCard>
      </Form>
    </RegisterContainer>
  )
}