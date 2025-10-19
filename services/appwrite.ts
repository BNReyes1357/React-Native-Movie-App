// track the searches made by a user

import {Client, Databases, ID, Query, TablesDB} from "react-native-appwrite";

const PROJECT_ID = process.env.EXPO_PUBLIC_APPWRITE_PROJECT_ID!;
const DATABASE_ID = process.env.EXPO_PUBLIC_APPWRITE_DATABASE_ID!;
const COLLECTION_ID = process.env.EXPO_PUBLIC_APPWRITE_COLLECTION_ID!;
const DATABASE_ENDPOINT = process.env.EXPO_PUBLIC_APPWRITE_ENDPOINT!;

const client = new Client()
    .setEndpoint(DATABASE_ENDPOINT)
    .setProject(PROJECT_ID);

const tablesDB = new TablesDB(client);

export const updateSearchCount = async (query: string, movie: Movie) => {
    try {
        console.log("I AM IN SEARCH COUNT! YAY!");
        const result = await tablesDB.listRows(DATABASE_ID, COLLECTION_ID, [Query.equal('searchTerm', query)]);

        if (result.total > 0) {
            const existingMovie = result.rows[0];

            await tablesDB.updateRow(
                DATABASE_ID, COLLECTION_ID, existingMovie.$id,
                {
                    count: existingMovie.$count + 1
                }
            )
        }
        else {
            await tablesDB.createRow(DATABASE_ID, COLLECTION_ID, ID.unique(), {
                searchTerm: query,
                movie_id: movie.id,
                count: 1,
                title: movie.title,
                poster_url: `https://image.tmdb.org/t/p/w500${movie.poster_path}`
            });
        }
    } catch (error) {
        console.log(error);
        throw error;
    }
}

export const getTrendingMovies = async (): Promise<TrendingMovie[] | undefined> => {
    try {
        const result = await tablesDB.listRows(
            DATABASE_ID,
            COLLECTION_ID,
            [Query.limit(5), Query.orderDesc('count')]
        );
        return result.rows as unknown as TrendingMovie[];
    } catch (error) {
        console.log(error);
        return undefined;
    }
}