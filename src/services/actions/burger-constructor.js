import { INCREMENT_INGREDIENT_COUNTER, DECREMENT_INGREDIENT_COUNTER } from "./ingredient";

export const CONSTRUCTOR_ADD_ITEM = "CONSTRUCTOR_ADD_ITEM";
export const CONSTRUCTOR_REMOVE_ITEM = "CONSTRUCTOR_REMOVE_ITEM";

export function addIngredient(dispatch, ingredient, ingredients) {
    console.log("Call to addIngredient for", ingredient);

    const addIngredient = (dispatch, ingredient) => {
        dispatch({
            type: CONSTRUCTOR_ADD_ITEM,
            payload: ingredient,
        });
        dispatch({
            type: INCREMENT_INGREDIENT_COUNTER,
            payload: ingredient._id,
        });
    };

    if (ingredient.type === "bun") {
        // Считаем сколько булочек у нас есть
        const count = ingredients.filter(item => item.type === "bun").length;
        console.log("Bun count", count);
        if (count === 0) {
            // Булочек в конструкторе нет - добавляем сразу две
            addIngredient(dispatch, ingredient);
            addIngredient(dispatch, ingredient);
            return
        } else {
            // Если у нас уже есть булочки - больше нам не надо
            return
        }
    }

    console.log("Not a bun");

    // Два варианта - если нет булочки и есть есть
    // В обоих - это проблемы редьюсера
    addIngredient(dispatch, ingredient);
}

export function removeIngredient(dispatch, ingredient) {
    // Не удаляем булочки
    if (ingredient.type === "bun") {
        return;
    }

    dispatch({
        type: CONSTRUCTOR_REMOVE_ITEM,
        payload: ingredient,
    });

    dispatch({
        type: DECREMENT_INGREDIENT_COUNTER,
        payload: ingredient._id,
    })
}