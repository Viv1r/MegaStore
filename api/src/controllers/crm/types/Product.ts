import {Decimal} from "@prisma/client/runtime";

interface Store {
    name: string
}

interface Category {
    name: string
}

export interface Product {
    id: number,
    title: string,
    description?: string,
    price: Decimal,
    attributes?: string | object,
    count_available?: number,
    picture?: string,
    store?: Store,
    category?: Category
}