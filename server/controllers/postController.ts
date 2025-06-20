import { Request, Response } from 'express';
import prisma from '../prismaClient';

// ...existing code...

export const getMyPosts = async (req: Request, res: Response): Promise<void> => {
    try {
        const userId = (req.user as any).id;
        const posts = await prisma.post.findMany({
            where: { authorId: userId },
            include: {
                author: {
                    select: {
                        id: true,
                        username: true
                    }
                },
                comments: {
                    include: {
                        author: {
                            select: {
                                username: true
                            }
                        }
                    }
                }
            }
        });
        // Format the response to handle comment author names correctly
        const formattedPosts = posts.map(post => ({
            ...post,
            comments: post.comments.map(comment => ({
                ...comment,
                commenterName: comment.author ? comment.author.username : comment.userName
            }))
        }));
        res.json(formattedPosts);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching user posts' });
    }
};

// ...existing code...