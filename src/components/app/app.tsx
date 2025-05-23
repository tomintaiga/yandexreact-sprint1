import React from 'react';

import Root from '../../pages/root/root';
import Main from '../../pages/main/main';
import Register from '../../pages/register/register';
import Login from '../../pages/login/login';
import ForgotPassword from '../../pages/forgot-password/forgot-password';
import ResetPassword from '../../pages/reset-password/reset-password';
import ProfileRoutes from '../profile-routes/profile-routes';
import Ingredient from '../../pages/ingredient/ingredient';
import NotFound from '../../pages/not-found/not-found';
import Feed from '../../pages/feed/feed';
import Order from '../../pages/order/order';

import { Routes, Route } from 'react-router-dom';
import { useLocation, useNavigate } from 'react-router-dom';
import ProtectedRouteElement from '../protected-route-element/protected-route-element';
import Modal from '../modal/modal';
import { useGetIngredientsQuery } from '../../api/ingredients';
import Centered from '../centered/centered';

const App: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const { data, isLoading, isError } = useGetIngredientsQuery();

  if (isLoading) {
    return (
      <Centered>
        <p className="text text_type_main-default text_color_inactive">
          Загрузка ингредиентов...
        </p>
      </Centered>
    );
  }
  if (isError) {
    return (
      <Centered>
        <p className="text text_type_main-default text_color_inactive">
          Ошибка загрузки ингредиентов. Попробуйте позже
        </p>
      </Centered>
    );
  }
  if (!data) {
    return (
      <Centered>
        <p className="text text_type_main-default text_color_inactive">
          Ингредиенты не найдены
        </p>
      </Centered>
    );
  }

  const background = location.state && location.state.background;
  const ingredientId: string | undefined = location.state && location.state.id;
  const type: string | undefined = location.state && location.state.type;
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
        <Route path="/feed" Component={Feed} />
        <Route
          path="/feed/:id"
          element={
            <Centered>
              <Order />
            </Centered>
          }
        />
        <Route path="/ingredients/:id" Component={Ingredient} />

        <Route
          path="/profile/*"
          element={
            <ProtectedRouteElement>
              <ProfileRoutes />
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

      {background && type === 'order' && (
        <Routes>
          <Route
            path="/feed/:id"
            element={
              <Modal onClose={handleClose} isOpen={true}>
                <Order />
              </Modal>
            }
          />
          <Route
            path="/profile/orders/:id"
            element={
              <Modal onClose={handleClose} isOpen={true}>
                <ProtectedRouteElement>
                  <Order />
                </ProtectedRouteElement>
              </Modal>
            }
          />
        </Routes>
      )}
    </Root>
  );
};

export default App;
