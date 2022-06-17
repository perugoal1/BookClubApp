db = db.getSiblingDB('bookclub');
db.users.insertMany([
    {
        email: 'admin',
        password: '$2a$10$K8rFZA4IcBbJoXAa91dURepBNgifrZQkA3UUkjAXf.ozDUcmthX1q', //password
        name: 'Admin User',
        role: 'admin',
        date_joined: new Date()
    },
    {
        email: 'test',
        password: '$2a$10$K8rFZA4IcBbJoXAa91dURepBNgifrZQkA3UUkjAXf.ozDUcmthX1q', //password
        name: 'Test User',
        role: 'admin',
        date_joined: new Date()
    },
    {
        email: 'member',
        password: '$2a$10$K8rFZA4IcBbJoXAa91dURepBNgifrZQkA3UUkjAXf.ozDUcmthX1q', //password
        name: 'Member User',
        role: 'member',
        date_joined: new Date()
    },
    {
        email: 'editor',
        password: '$2a$10$K8rFZA4IcBbJoXAa91dURepBNgifrZQkA3UUkjAXf.ozDUcmthX1q', //password
        name: 'Editor User',
        role: 'member',
        date_joined: new Date()
    }
]);

db.books.insertMany([
    {
        title: 'The Da Vinci Code',
        description: 'The Da Vinci Code follows "symbologist"[clarification needed] Robert Langdon and cryptologist Sophie Neveu after a murder in the Louvre Museum in Paris causes them to become involved in a battle between the Priory of Sion and Opus Dei over the possibility of Jesus Christ and Mary Magdalene having had a child together.',
        genre: ['mystery', 'thriller'],
        author: 'Dan Brown',
        published_year: 2003,
        availability: true
    },
    {
        title: 'The Hunger Games',
        description: 'In the ruins of a place once known as North America lies the nation of Panem, a shining Capitol surrounded by twelve outlying districts. The Capitol is harsh and cruel and keeps the districts in line by forcing them all to send one boy and one girl between the ages of twelve and eighteen to participate in the annual Hunger Games, a fight to the death on live TV. Sixteen-year-old Katniss Everdeen, who lives alone with her mother and younger sister, regards it as a death sentence when she steps forward to take her sisters place in the Games. But Katniss has been close to dead before—and survival, for her, is second nature. Without really meaning to, she becomes a contender. But if she is to win, she will have to start making choices that weight survival against humanity and life against love.',
        genre: ['fiction', 'fantasy'],
        author: 'Suzanne Collins',
        published_year: 2008,
        availability: true
    },
    {
        title: 'Harry Potter',
        description: 'The novels chronicle the lives of a young wizard, Harry Potter, and his friends Hermione Granger and Ron Weasley, all of whom are students at Hogwarts School of Witchcraft and Wizardry. ',
        genre: ['fiction', 'fantasy'],
        author: 'J.K. Rowling',
        published_year: 2004,
        availability: true
    },
    {
        title: 'To Kill a Mockingbird',
        description: 'The unforgettable novel of a childhood in a sleepy Southern town and the crisis of conscience that rocked it. "To Kill A Mockingbird" became both an instant bestseller and a critical success when it was first published in 1960. It went on to win the Pulitzer Prize in 1961 and was later made into an Academy Award-winning film, also a classic.',
        genre: ['fiction', 'classic'],
        author: 'Harper Lee',
        published_year: 2006,
        availability: true
    },
    {
        title: 'Pride and Prejudice',
        description: 'Since its immediate success in 1813, Pride and Prejudice has remained one of the most popular novels in the English language. Jane Austen called this brilliant work "her own darling child" and its vivacious heroine, Elizabeth Bennet, "as delightful a creature as ever appeared in print." The romantic clash between the opinionated Elizabeth and her proud beau, Mr. Darcy, is a splendid performance of civilized sparring. And Jane Austens radiant wit sparkles as her characters dance a delicate quadrille of flirtation and intrigue, making this book the most superb comedy of manners of Regency England.',
        genre: ['fiction', 'classic', 'romance'],
        author: 'Jane Austen, Anna Quindlen',
        published_year: 2000,
        availability: true
    },
    {
        title: 'Twilight',
        description: 'Deeply seductive and extraordinarily suspenseful, Twilight is a love story with bite.',
        genre: ['fiction', 'fantasy', 'romance'],
        author: 'Stephenie Meyer',
        published_year: 2006,
        availability: true
    },
    {
        title: 'The Hobbit',
        description: 'In The Hobbit, Bilbo Baggins is whisked away from his comfortable, unambitious life in Hobbiton by the wizard Gandalf and a company of dwarves. He finds himself caught up in a plot to raid the treasure hoard of Smaug the Magnificent, a large and very dangerous dragon.',
        genre: ['fiction', 'fantasy', 'Adventure'],
        author: 'J.R.R. Tolkien',
        published_year: 2012,
        availability: true
    },
]);