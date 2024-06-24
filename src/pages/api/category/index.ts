import type {NextApiRequest, NextApiResponse} from 'next'
import {prisma} from "@/lib/prisma";

/**
 * This is the main handler for the /api/category endpoint.
 * It handles GET requests and returns a list of all categories.
 *
 * @param {NextApiRequest} req - The request object.
 * @param {NextApiResponse} res - The response object.
 * @returns {Promise} - The result of the handler function.
 */
export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse,
) {
    // If the request method is not GET, return a 405 status code.
    if (req.method !== 'GET') {
        return res.status(405).end()
    }

    // Fetch all categories from the database.
    const categories = await prisma.category.findMany();

    // Return the categories as a JSON response with a 201 status code.
    return res.status(201).json(categories);
}
