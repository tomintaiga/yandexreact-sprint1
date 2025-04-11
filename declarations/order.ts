import { TBurgerIngredient } from "./burger";
import { TOwner } from "./owner";

export type TOrder = {
    name: string;
    number: number;
    ingredients: Array<TBurgerIngredient>;
    _id: string;
    status: string;
    createdAt: string;
    updatedAt: string;
    owner: TOwner;
    price: number;
};