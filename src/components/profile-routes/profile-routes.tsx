import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import Profile from '../../pages/profile/profile';
import ProfileForm from '../../components/profile-form/profile-form';
import ProfileOrder from '../profile-order/profile-order';
import { useGetProfileQuery } from '../../api/profile';
import Centered from '../centered/centered';
import Order from '../../pages/order/order';

const ProfileRoutes: React.FC = () => {
  const { data, isLoading, error } = useGetProfileQuery();

  // Состояние загрузки
  if (isLoading) {
    return (
      <Centered>
        <p className="text text_type_main-large">Загрузка...</p>
      </Centered>
    );
  }

  // Обработка ошибки (только после завершения загрузки)
  if (error) {
    console.log(error);
    return (
      <Centered>
        <p className="text text_type_main-large">Ошибка загрузки данных</p>
        <Link to="/login" className="text text_type_main-medium">
          Войти
        </Link>
      </Centered>
    );
  }

  // Проверка данных (только после завершения загрузки)
  if (!data) {
    return (
      <Centered>
        <p className="text text_type_main-large">Пользователь не найден</p>
        <Link to="/login" className="text text_type_main-medium">
          Войти
        </Link>
      </Centered>
    );
  }

  // Успешная загрузка данных
  return (
    <Routes>
      <Route path="/" element={<Profile />}>
        <Route index element={<ProfileForm user={data.user} />} />
        <Route path="orders" element={<ProfileOrder />} />
        <Route path="orders/:id" element={<Order />} />
      </Route>
    </Routes>
  );
};

export default ProfileRoutes;