import { db } from "@/db";
import { products } from "@/db/schema";
import { desc, eq } from "drizzle-orm";

export async function getFeaturedProducts() {
    const productsdata = await db
        .select()
        .from(products)
        .where(eq(products.status, "approved"))
        .orderBy(desc(products.voteCount));

    return productsdata;
}

export async function getRecentlyLaunchedProducts() {
    const productsdata = await getFeaturedProducts();
    const oneWeekAgo = new Date();
    oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);

    return productsdata.filter(
        product =>
            product.createdAt &&
            new Date(product.createdAt) >= oneWeekAgo
    );
}