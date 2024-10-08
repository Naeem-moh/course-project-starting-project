import { RecipesService } from './../recipes/recipes.service';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Recipe } from '../recipes/recipe.model';
import { exhaustMap, map, take, tap } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { AuthService } from '../auth/auth.service';
import { User } from '../auth/user.model';

@Injectable({
  providedIn: 'root',
})
export class DataStorageService {
  constructor(
    private http: HttpClient,
    private recipeService: RecipesService,
    private authService: AuthService
  ) {}

  storeData() {
    const recipes = this.recipeService.recipes;

    this.http
      .put(
        'https://recipe-book-a9ca7-default-rtdb.europe-west1.firebasedatabase.app/recipes.json',
        recipes
      )
      .subscribe((body) => {
        console.log(body);
      });
  }

  fetchData(): Observable<Recipe[]> {
    return this.http
      .get<Recipe[]>(
        'https://recipe-book-a9ca7-default-rtdb.europe-west1.firebasedatabase.app/recipes.json'
      )
      .pipe(
        map((recipes: Recipe[]) => {
          return recipes.map((recipe: Recipe) => {
            return {
              ...recipe,
              ingredients: recipe.ingredients ? recipe.ingredients : [],
            };
          });
        }),
        tap((recipes) => {
          this.recipeService.recipes = recipes;
        })
      );
  }
}
