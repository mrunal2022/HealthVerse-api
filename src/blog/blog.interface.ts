export interface IRecipeParams {
    recipe?: string | null;
    cuisine?: string;
    ingredients?: string;
    minCarbs?: number;
    maxCarbs?: number;
    minProtein?: number;
    maxProtein?: number;
    minCalories?: number;
    maxCalories?: number;
    diet?: string;
    mealType?: string;
    instructionsRequired: boolean,
    addRecipeInformation: boolean,
    addRecipeInstructions: boolean,
}