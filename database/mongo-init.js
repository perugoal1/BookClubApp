db = db.getSiblingDB('bookclub');
db.users.insertOne(
    {
        email: 'admin',
        password: '$2a$10$K8rFZA4IcBbJoXAa91dURepBNgifrZQkA3UUkjAXf.ozDUcmthX1q', //password
        role: 'admin',
    },
);

db.books.insertOne(
    {
        title: 'The Da Vinci Code',
        description: 'The Da Vinci Code follows "symbologist"[clarification needed] Robert Langdon and cryptologist Sophie Neveu after a murder in the Louvre Museum in Paris causes them to become involved in a battle between the Priory of Sion and Opus Dei over the possibility of Jesus Christ and Mary Magdalene having had a child together.',
        genre: ['mystery', 'thriller'],
        author: 'Dan Brown',
        published_year: 'April 2003',
        availability: '3',
        last_borrower: 'adam'
    },
);