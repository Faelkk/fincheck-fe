import { Category } from "../../Entities/Category";

import { httpClient } from "../httpClient";

type CategoriesResponse = Array<Category>;

export async function getAllCategorys() {
    const { data } = await httpClient.get<CategoriesResponse>("/categories");

    return data;
}
