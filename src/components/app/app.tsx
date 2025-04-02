import React, { useEffect } from 'react';

import Root from '../../pages/root/root';
import Main from '../../pages/main/main';
import Register from '../../pages/register/register';
import Login from '../../pages/login/login';
import ForgotPassword from '../../pages/forgot-password/forgot-password';
import ResetPassword from '../../pages/reset-password/reset-password';
import Profile from '../../pages/profile/profile';
import Ingredient from '../../pages/ingredient/ingredient';
import NotFound from '../../pages/not-found/not-found';

import { Routes, Route } from 'react-router-dom';
import { useLocation, useNavigate } from 'react-router-dom';
import ProtectedRouteElement from '../protected-route-element/protected-route-element';
import Modal from '../modal/modal';
import { useGetIngredientsQuery } from '../../api/ingredients';

const App: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const {data, isLoading, isError} = useGetIngredientsQuery();

  if (isLoading) {
    return <div>Загрузка ингредиентов...</div>;
  }
  if (isError) {
    return <div>Ошибка загрузки ингредиентов</div>;
  }
  if (!data) {
    return <div>Ингредиенты не найдены</div>;
  }

  const background = location.state && location.state.background;
  const ingredientId: string | undefined = location.state && location.state.id;
  const ingredient = data.find((item) => item._id === ingredientId);


  const handleClose = () => {
    navigate(-1);
  };

  return (
    <Root>
      <Routes location={background || location}>
        <Route path="/register" Component={Register} />
        <Route path="/login" Component={Login} />
        <Route path="/forgot-password" Component={ForgotPassword} />
        <Route path="/reset-password" Component={ResetPassword} />
        <Route path="/" Component={Main} />

        <Route
          path="/profile"
          element={
            <ProtectedRouteElement>
              <Profile />
            </ProtectedRouteElement>
          }
        />
        <Route
          path="/ingredients/:id"
          element={
            <ProtectedRouteElement>
              <Ingredient />
            </ProtectedRouteElement>
          }
        />

        <Route path="*" Component={NotFound} />
      </Routes>

      {background && ingredient && (
        <Routes>
          <Route
            path="/ingredients/:id"
            element={
              <Modal
                onClose={handleClose}
                isOpen={true}
                title={ingredient.name}
              >
                <Ingredient />
              </Modal>
            }
          />
        </Routes>
      )}
    </Root>
  );
};

export default App;
