import axios from 'axios';
import { useCallback, useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import Avatar from '@mui/material/Avatar';
import { BackgroundLetterAvatars } from '../BackgroundLetterAvatars';
import { House, MapPin, ShoppingCart } from 'phosphor-react';

import Logo from '../../assets/Logo.svg'
import { Cart, HeaderContainer, Location, Home } from "./styles";

interface IAdress {
  cep: string;
  logradouro: string;
  complemento: string;
  bairro: string;
  localidade: string;
  uf: string;
}

export function Header() {

  const [adress, setAdress] = useState<IAdress>()
  const [imageProfile, setImageProfile] = useState(true)

  const fetchLocal = useCallback(
    async () => {
      const response = await axios.get("https://viacep.com.br/ws/69054699/json/");
      const { cep, logradouro, complemento, bairro, localidade, uf } = response.data

      setAdress({
        cep,
        logradouro,
        complemento,
        bairro,
        localidade,
        uf
      })

    }, []
  );

  useEffect(() => {
    fetchLocal()
  }, [fetchLocal]);

  console.log(adress);

  return (
    <HeaderContainer>
      <img src={Logo} alt="Logo do header" />
      <nav className="actions">

        <NavLink to="/" title='Home' >
          <Home> <House weight='fill' size={22} /> </Home>
        </NavLink>

        <NavLink to="/checkout" title='Checkout'>
          <Cart> <ShoppingCart weight='fill' size={22} /> </Cart>
        </NavLink>

        <NavLink to='#' title='Edit profile'>
          {
            imageProfile ? (
              <Avatar alt="Mathews" src="https://avatars.githubusercontent.com/u/97031798?v=4" variant='rounded' sx={{ width: 38, height: 38 }} />
            ) : (
              <BackgroundLetterAvatars />
            )
          }
        </NavLink>

        <Location> <MapPin weight='fill' size={22} /> {adress?.localidade},{" "}{adress?.uf}</Location>
      </nav>
    </HeaderContainer>
  )
}
