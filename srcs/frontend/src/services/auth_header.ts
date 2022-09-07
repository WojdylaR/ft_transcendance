import { createRoutesFromChildren } from "react-router-dom";
import { LocalUser } from "../interfaces/user.interface";

// Record<>: Constructs an object type whose property keys are Keys and whose property values are Type. 
// This utility can be used to map the properties of a type to another type.
export default function authHeader(): {Authorization: string } | Record<string, never> {
    try {
        const user: LocalUser = JSON.parse(localStorage.getItem('user') as string);
        if (user && user.accessToken) {
            return { Authorization: 'Bearer' + user.accessToken.trim() };
        }
        return {};
    } catch(e) {
        return {};
    }
}