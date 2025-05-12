import { Inject, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { BlogDetails } from 'src/blog_schema/blog.schema';
import { IRecipeParams } from './blog.interface';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class BlogService {
  private readonly apiKey: string;

  constructor(
    @InjectModel('BlogDetails') private readonly blogDetailsModel: Model<BlogDetails>,
    @Inject(ConfigService) private readonly configService: ConfigService,
  ) {
    this.apiKey = this.configService.get<string>('SPOONACULAR_API_KEY') || "";
  }

  async getBlogs(): Promise<BlogDetails[]> {
    return this.blogDetailsModel.find().exec();
  }

  async getRecipes(recipeParams: IRecipeParams): Promise<any> {
    const parsedRecipeParams = typeof recipeParams === 'string' ? JSON.parse(recipeParams) : recipeParams;
    const { recipe, cuisine, diet, ingredients, mealType, minCarbs, maxCarbs, minCalories, maxCalories, minProtein, maxProtein, instructionsRequired, addRecipeInformation, addRecipeInstructions, addRecipeNutrition } = parsedRecipeParams;

    const queryParams = new URLSearchParams({ apiKey: this.apiKey });

    if (recipe) queryParams.append('query', recipe);
    if (cuisine) queryParams.append('cuisine', cuisine);
    if (diet) queryParams.append('diet', diet);
    if (ingredients) queryParams.append('includeIngredients', ingredients);
    if (mealType) queryParams.append('type', mealType);
    if (minCarbs) queryParams.append('minCarbs', minCarbs);
    if (maxCarbs) queryParams.append('maxCarbs', maxCarbs);
    if (minCalories) queryParams.append('minCalories', minCalories);
    if (maxCalories) queryParams.append('maxCalories', maxCalories);
    if (minProtein) queryParams.append('minProtein', minProtein);
    if (maxProtein) queryParams.append('maxProtein', maxProtein);
    if (instructionsRequired) queryParams.append('instructionsRequired', instructionsRequired);
    if (addRecipeInformation) queryParams.append('addRecipeInformation', addRecipeInformation);
    if (addRecipeInstructions) queryParams.append('addRecipeInstructions', addRecipeInstructions);

    const response = await fetch(`https://api.spoonacular.com/recipes/complexSearch?${queryParams.toString()}`);

    if (!response.ok) {
      throw new Error('Failed to fetch recipes.');
    }
    return response.json();
  }
}



