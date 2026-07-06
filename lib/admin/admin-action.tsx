"use server";

import { db } from "@/db";
import { products } from "@/db/schema";
import { eq, InferSelectModel } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { success } from "zod";

type Product = InferSelectModel<typeof products>

export const approveProductAction = async (productId: Product["id"]) => {
    console.log("Approved");

    try {
        await db.update(products).set({ status: "approved", approvedAt: new Date() }).where(eq(products.id, productId));
        revalidatePath("/admin");
        return {
            success: true,
            message: "Product approved successfully"
        }
    } catch (error) {
        console.error(error);
        return {
            success: false,
            message: "Failed to approve product"
        }
    }
}
export const rejectProductAction = async (productId: Product["id"]) => {
    console.log("Rejected");
    try {
        await db.update(products).set({ status: "rejected" }).where(eq(products.id, productId));
        revalidatePath("/admin");

        return {
            success: true,
            message: "Product rejected successfully"
        }
    } catch (error) {
        console.error(error);
        return {
            success: false,
            message: "Failed to reject product"
        }
    }
}