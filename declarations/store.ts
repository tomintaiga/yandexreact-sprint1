import { TBurgerIngredient } from "./burger";
import { TIngredient } from "./ingredient";
import { TUser } from "./user";

export type TStore = {
    burger: {
        ingredients: TBurgerIngredient[];
        totalPrice: number;
    };
    auth: {
        isAuth: boolean;
        isLoginRequest: boolean;
        isLoginError: boolean;
        isRegisterRequest: boolean;
        isRegisterError: boolean;
        isLogoutRequest: boolean;
        isLogoutError: boolean;
        isTokenRequest: boolean;
        isTokenError: boolean;
        user: TUser | null;
    };
    ingredient: {
        ingredients: TBurgerIngredient[];
        ingredientsRequest: boolean;
        ingredientsError: boolean;
    };
    ingredientDetail: {
        ingredient: TIngredient | null;
        showDetail: boolean;
    };
    order: {
        showOrder: boolean;
        order: {
            name: string;
            number: number;
        };
        orderLoading: boolean;
        orderLoadingError: boolean;
    };
    forgotPassword: {
        forgotPasswordLoading: boolean;
        forgotPasswordLoadingError: boolean;
        forgotPasswordSuccess: boolean;
    };
    resetPassword: {
        resetPasswordRequest: boolean;
        resetPasswordError: boolean;
    };
    profile: {
        user: TUser | null;
        name: string;
        email: string;
        password: string;
        profileRequest: boolean;
        profileRequestFailed: boolean;
        profileEditRequest: boolean;
        profileEditRequestFailed: boolean;
    }
};