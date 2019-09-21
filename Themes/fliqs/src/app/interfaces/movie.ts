export interface Movie {
    id: string;
    title: string;
    image: string;
    videoCover: string;
    description: string;
    trailer: string;
    classification: string;
    releaseDate: string;
    runningTime: string;
    directors: string;
    cast: string;
    rating: number;
    sessionTimes: string[];
    favourite: boolean;
}