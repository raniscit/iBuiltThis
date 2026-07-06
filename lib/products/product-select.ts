import { db } from "@/db";
import { products } from "@/db/schema";
import { desc, eq } from "drizzle-orm";

export async function getAllApprovedProducts() {
    "use cache";
    const productsdata = await db
        .select()
        .from(products)
        .where(eq(products.status, "approved"))
        .orderBy(desc(products.voteCount));

    return productsdata;
}

export async function getAllProducts() {
    "use cache";
    const productsdata = await db
        .select()
        .from(products)
        .orderBy(desc(products.voteCount));

    return productsdata;
}

export async function getProducts() {
    const productsdata = await db
        .select()
        .from(products)
        .where(eq(products.status, "approved"))
        .orderBy(desc(products.voteCount));

    return productsdata;
}

export async function getRecentlyLaunchedProducts() {
    const productsdata = await getProducts();
    const oneWeekAgo = new Date();
    oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);

    return productsdata.filter(
        product =>
            product.createdAt &&
            new Date(product.createdAt) >= oneWeekAgo
    );
}

export async function getProductBySlug(slug: string){
    const product = await db
    .select()
    .from(products)
    .where(eq(products.slug,slug));    

    return product?.[0]??null;
}