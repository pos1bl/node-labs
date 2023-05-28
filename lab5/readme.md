database.ts: Цей файл містить клас Database, який встановлює з'єднання з базою даних PostgreSQL. Він використовує змінні середовища, щоб отримати налаштування підключення до бази даних. Клас містить метод query, який виконує SQL-запити до бази даних, а також метод close, який закриває підключення до бази даних.

queries.ts: Цей файл містить клас Queries, який виконує різні SQL-запити до бази даних. Він отримує об'єкт класу Database у конструкторі і використовує його для виконання запитів. Клас містить методи, такі як getUsersWithChannels, getTopLikedVideos, getVideosFromUserSubscription та інші, які виконують конкретні запити до бази даних.

index.ts: Цей файл містить функцію executeQueries, яка створює об'єкти класів Database і Queries, і викликає різні методи Queries для виконання запитів до бази даних. Ця функція виконується асинхронно і виводить результати запитів у консоль. На кінці файлу викликається функція executeQueries.

.env: Цей файл містить налаштування для з'єднання з базою даних PostgreSQL. Він встановлює значення змінних середовища, таких як DB_USER, DB_HOST, DB_NAME, DB_PASSWORD та DB_PORT, які використовуються в файлі database.ts для підключення до бази даних.