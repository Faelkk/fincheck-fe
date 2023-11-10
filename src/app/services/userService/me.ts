import { User } from "../../Entities/user";

import { httpClient } from "../httpClient";

export async function me() {
    const { data } = await httpClient.get<User>("/users/me");

    return data;
}
