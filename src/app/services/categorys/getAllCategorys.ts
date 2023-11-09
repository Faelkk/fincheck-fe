import { Category } from "../../Entities/Category";
import { sleep } from "../../utils/sleep";
import { httpClient } from "../httpClient";

type CategoriesResponse = Array<Category>;

export async function getAllCategorys() {
    await sleep(500);
    const { data } = await httpClient.get<CategoriesResponse>("/categories");

    return data;
}
