import { CONSTRUCTOR_ADD_ITEM, CONSTRUCTOR_REMOVE_ITEM } from "../actions/burger-constructor";

const initialState = {
    ingredients: [],
    totalPrice: 0,
};

export const burgerConstructor = (state = initialState, action) => {
    switch (action.type) {
        case CONSTRUCTOR_ADD_ITEM: {
            console.log(CONSTRUCTOR_ADD_ITEM, state);
            const cur = action.payload;

            // Считаем сколько булочек у нас есть
            const count = state.ingredients.filter(item => item.type === "bun").length;
            if(cur.type === "bun") {
                // Не больше двух булок в бургере
                if(count === 0) {
                    return {
                        ...state,
                        ingredients: [cur, ...state.ingredients ],
                        totalPrice: state.totalPrice+cur.price,
                    }
                } else if(count === 1) {
                    return {
                        ...state,
                        ingredients: [...state.ingredients, cur ],
                        totalPrice: state.totalPrice+cur.price,
                    }
                }else {
                    // Присечь безобразия
                    return state
                }
            }

            // Обрабатываем не булочки
            if(count == 0) {
                return {
                    ...state,
                    ingredients: [cur, ...state.ingredients],
                    totalPrice: state.totalPrice+cur.price,
                };
            }

            return {
                ...state,
                ingredients: [state.ingredients[0], cur, ...state.ingredients.slice(1)],
                totalPrice: state.totalPrice+cur.price,
            }
        }
        case CONSTRUCTOR_REMOVE_ITEM: {
            console.log(CONSTRUCTOR_REMOVE_ITEM, state);
            const cur = action.payload;
            // Не даем удалять булочки
            if(cur.type === "bun"){
                return state;
            }

            return {
                ...state,
                ingredients: state.ingredients.filter(item => item._id != cur._id),
                totalPrice: state.totalPrice-cur.price,
            }
        }
        default: {
            return state;
        }
    }
}