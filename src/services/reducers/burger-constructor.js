import {
  CONSTRUCTOR_ADD_ITEM,
  CONSTRUCTOR_REMOVE_ITEM,
  CONSTRUCTOR_MOVE_ITEM,
} from '../actions/burger-constructor';

const initialState = {
  ingredients: [],
  totalPrice: 0,
};

export const burgerConstructorReducer = (state = initialState, action) => {
  switch (action.type) {
    case CONSTRUCTOR_ADD_ITEM: {
      const cur = action.payload;

      // Считаем сколько булочек у нас есть
      const count = state.ingredients.filter(
        (item) => item.type === 'bun',
      ).length;
      if (cur.type === 'bun') {
        // Не больше двух булок в бургере
        if (count === 0) {
          return {
            ...state,
            ingredients: [cur, ...state.ingredients],
            totalPrice: state.totalPrice + cur.price,
          };
        } else if (count === 1) {
          return {
            ...state,
            ingredients: [...state.ingredients, cur],
            totalPrice: state.totalPrice + cur.price,
          };
        } else {
          // Заменяем старую булку на новую
          let price = 0;
          const ingredients = state.ingredients.map((item) => {
            if (item.type === 'bun') {
              price = item.price;
              return cur;
            }
            return item;
          });

          return {
            ...state,
            ingredients: ingredients,
            totalPrice: state.totalPrice + cur.price * 2 - price,
          };
        }
      }

      // Обрабатываем не булочки
      if (count == 0) {
        return {
          ...state,
          ingredients: [cur, ...state.ingredients],
          totalPrice: state.totalPrice + cur.price,
        };
      }

      return {
        ...state,
        ingredients: [state.ingredients[0], cur, ...state.ingredients.slice(1)],
        totalPrice: state.totalPrice + cur.price,
      };
    }
    case CONSTRUCTOR_REMOVE_ITEM: {
      const cur = action.payload;
      // Не даем удалять булочки
      if (cur.type === 'bun') {
        return state;
      }

      return {
        ...state,
        ingredients: state.ingredients.filter((item) => item._id != cur._id),
        totalPrice: state.totalPrice - cur.price,
      };
    }
    case CONSTRUCTOR_MOVE_ITEM: {
      const { dragId, dropId } = action.payload;
      const dragIndex = state.ingredients.findIndex(
        (item) => item.id === dragId,
      );
      const dropIndex = state.ingredients.findIndex(
        (item) => item.id === dropId,
      );

      const newIngredients = state.ingredients.map((item, index) => {
        if (index === dragIndex) {
          return state.ingredients[dropIndex];
        } else if (index === dropIndex) {
          return state.ingredients[dragIndex];
        }
        return item;
      });

      return {
        ...state,
        ingredients: newIngredients,
      };
    }
    default: {
      return state;
    }
  }
};
