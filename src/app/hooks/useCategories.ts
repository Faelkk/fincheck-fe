import { useQuery } from "@tanstack/react-query";
import { categoriesService } from "../services/categorys";

export function useCategories() {
    const { data, isFetching } = useQuery({
        queryKey: ["categories"],
        queryFn: categoriesService.getAllCategorys,
    });
    return { categories: data ?? [], isLoading: isFetching };
}
