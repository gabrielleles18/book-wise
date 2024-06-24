import type {NextApiRequest, NextApiResponse} from 'next'
import {prisma} from '@/lib/prisma';

/**
 * This is the main handler for the /api/books endpoint.
 * It handles GET requests and returns a list of books.
 * The books can be filtered by category and/or by a search term.
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

    // Extract the categoryId and search parameters from the request query.
    const {categoryId, search} = req.query;
    let where = {};

    // If a search term is provided, add a condition to the where object
    // to filter books by name.
    if (search) {
        where = {
            ...where,
            OR: [{
                name: {
                    contains: search
                }
            }]
        }
    }

    // If a category ID is provided, add a condition to the where object
    // to filter books by category.
    if (categoryId) {
        where = {
            ...where,
            categories: {
                some: {
                    categoryId: categoryId
                }
            }
        }
    }

    // Fetch the books from the database using the where object.
    const books = await prisma.book.findMany({
        where,
        include: {
            ratings: true,
        }
    });

    // Return the books as a JSON response with a 200 status code.
    return res.status(200).json(books);
}
