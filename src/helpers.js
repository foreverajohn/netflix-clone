import db from "./firebase";

export const addToList = (movie, userId) => {
    db.collection('customers')
        .doc(userId)
        .collection('movie_list')
        .add({
            movie: movie
        })
        .catch((error) => {
            console.error("Error writing document: ", error);
        });
}

