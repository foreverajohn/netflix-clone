import db from "./firebase";

export const addToList = (movie, userId) => {
    db.collection('customers')
        .doc(userId)
        .collection('movie_list')
        .add({
            id: movie.id,
            movie
        })
        .catch((error) => {
            console.error("Error writing document: ", error);
        });
}

export const checkList = async (movieId, movieList) => {
    console.log(movieList?.includes(movieId))
}