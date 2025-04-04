import { TBurgerIngredient } from "./burger";

export type TOrder = {
    ingredients: Array<TBurgerIngredient>;
    _id: string;
    owner: {
        name: string;
        email: string;
        createdAt: string;
        updatedAt: string;
    }
    status: string;
    createdAt: string;
    updatedAt: string;
    name: string;
    number: number;
    price: number;
}