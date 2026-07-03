"use server";

import { auth, currentUser } from "@clerk/nextjs/server";
import { productSchema } from "./product-validations";
import { db } from "@/db";
import { products } from "@/db/schema";
import z from "zod";
import { eq, sql } from "drizzle-orm";
import { revalidatePath } from "next/cache";

type FormState = {
    success: boolean;
    errors?: Record<string, string[]>;
    message: string;
};


export const addProductAction = async (prevState: FormState, formData: FormData): Promise<FormState> => {
    try {

        const { userId, orgId } = await auth();

        if (!userId) {
            return {
                success: false,
                errors: {},
                message: "You must be signed in to submit the product"
            };
        }

        if (!orgId) {
            return {
                success: false,
                errors: {},
                message: "You must be a member of an organization to submit a product"
            };
        }

        //data from form
        const rawFormData = Object.fromEntries(formData.entries());

        const user = await currentUser();

        const userEmail = user?.emailAddresses?.[0].emailAddress || "anonymous";

        //validate the data
        const validatedData = productSchema.safeParse(rawFormData);

        if (!validatedData.success) {
            return {
                success: false,
                errors: validatedData.error.flatten().fieldErrors,
                message: "Invalid data",
            }
        }

        const { name, slug, tagline, description, websiteUrl, tags } = validatedData.data;

        const existingProduct = await db
            .select()
            .from(products)
            .where(eq(products.slug, slug))
            .limit(1);

        if (existingProduct.length > 0) {
            return {
                success: false,
                errors: {
                    slug: ["This slug is already taken"],
                },
                message: "Slug already exists",
            };
        }

        const tagsArray = tags ? tags.filter((tag) => typeof tag == "string") : [];
        //transform the data

        await db.insert(products).values({
            name,
            slug,
            tagline,
            description,
            websiteUrl,
            tags: tagsArray,
            status: "pending",
            submittedBy: userEmail,
            organizationId: orgId,
            userId
        });
        revalidatePath("/");  //for fresh data after inserting data in db
        console.log("PRODUCT INSERTED SUCCESSFULLY");
        return {
            success: true,
            errors: {},
            message: "Product submitted successfully! It will be reviewed shortly.",
        };

    } catch (error) {
        console.error("ACTION ERROR:", error);

        if (error instanceof z.ZodError) {
            return {
                success: false,
                errors: error.flatten().fieldErrors,
                message: "Invalid data",
            };
        }

        return {
            success: false,
            errors: {},
            message: "Failed to submit produuct"
        };
    }
}

export const upvoteProductAction = async (productId: number) => {
    try {
        const { userId, orgId } = await auth();

        if (!userId) {
            return {
                success: false,
                errors: {},
                message: "You must be signed in to submit the product"
            };
        }

        if (!orgId) {
            return {
                success: false,
                errors: {},
                message: "You must be a member of an organization to submit a product"
            };
        }

        await db
            .update(products)
            .set({
                voteCount: sql`GREATEST(0,vote_count + 1)`,
            })
            .where(eq(products.id, productId));

        // Fetch slug
        const product = await db.query.products.findFirst({
            where: eq(products.id, productId),
            columns: {
                slug: true,
            },
        });

        revalidatePath("/");

        if (product) {
            revalidatePath(`/products/${product.slug}`);
        }

        return {
            success: true,
            message: "Product upvoted successfully",
        }

    } catch (error) {
        console.error(error);
        return {
            success: false,
            message: "Failed to upvote product",
            voteCount: 0,
        };
    }
};

export const downvoteProductAction = async (productId: number) => {
    try {
        const { userId, orgId } = await auth();

        if (!userId) {
            return {
                success: false,
                errors: {},
                message: "You must be signed in to submit the product"
            };
        }

        if (!orgId) {
            return {
                success: false,
                errors: {},
                message: "You must be a member of an organization to submit a product"
            };
        }

        await db
            .update(products)
            .set({
                voteCount: sql`GREATEST(0,vote_count - 1)`,
            })
            .where(eq(products.id, productId));

        // Fetch slug
        const product = await db.query.products.findFirst({
            where: eq(products.id, productId),
            columns: {
                slug: true,
            },
        });

        revalidatePath("/");

        if (product) {
            revalidatePath(`/products/${product.slug}`);
        }

        return {
            success: true,
            message: "Product downvoted successfully",
        }

    } catch (error) {
        console.error(error);
        return {
            success: false,
            message: "Failed to downvote product",
            voteCount: 0,
        };
    }
};