import { BadRequestException, Controller, Get, Header, Query } from '@nestjs/common';
import { ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { BlogService } from './blog.service';
import { IRecipeParams } from './blog.interface';

@Controller()
export class BlogController {

    constructor(private blogService :BlogService){}

    @Get('/getBlogs')
    @Header('Content-Type', 'application/json')
    @ApiTags('Gets Blog List')
    @ApiResponse({ status: 200, description: 'Data Fetched Successfully' })
    @ApiResponse({ status: 400, description: 'Bad Request' })
    @ApiResponse({ status: 401, description: 'Unauthorized' })
    async getBlogs(): Promise<any> {
        try {
            return await this.blogService.getBlogs();
        } catch (error) {
            throw new BadRequestException(error.detail);
        }
    }

    @Get('/getRecipes')
    @Header('Content-Type', 'application/json')
    @ApiTags('Gets Recipe List')
    @ApiResponse({ status: 200, description: 'Data Fetched Successfully' })
    @ApiResponse({ status: 400, description: 'Bad Request' })
    @ApiResponse({ status: 401, description: 'Unauthorized' })
    @ApiQuery({ name: 'recipeParams' })
    async getRecipes(@Query('recipeParams') recipeParams: IRecipeParams): Promise<any> {
        try {
            return await this.blogService.getRecipes(recipeParams);
        } catch (error) {
            throw new BadRequestException(error.detail);
        }
    }
}
// https://api.spoonacular.com/recipes/complexSearch?apiKey=${import.meta.env.VITE_API_KEY}&query=${recipeName}