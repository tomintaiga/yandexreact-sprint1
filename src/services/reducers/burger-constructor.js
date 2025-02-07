import { CONSTRUCTOR_ADD_ITEM, CONSTRUCTOR_REMOVE_ITEM } from "../actions/constructor";

const initialState = {
    ingredients: [],
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
                    }
                } else if(count === 1) {
                    return {
                        ...state,
                        ingredients: [...state.ingredients, cur ],
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
                };
            }

            return {
                ...state,
                ingredients: [state.ingredients[0], cur, ...state.ingredients.slice(1)],
            }
        }
        case CONSTRUCTOR_REMOVE_ITEM: {
            console.log(CONSTRUCTOR_REMOVE_ITEM, state);
            return state;
        }
        default: {
            return state;
        }
    }
}