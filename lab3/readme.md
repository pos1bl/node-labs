# Лабораторна робота №3

### 1. Напишіть функцію, яка приймає будь-який тип масиву та асинхронний колбек, який викликається для кожного елемента масиву послідовно. Результатом виклику має бути масив результатів колбеку. Усі типи мають застосовуватися автоматично (функція шаблону). Приклад виклику:
<br/>

    const array: Array<string> = ["one", "two", "three"];
  
    const results = await runSequent(array, (item, index) =>
      Promise.resolve({
          item,
          index,
      })
    );

  <br/>

IDE має розглядати змінні з прикладу так:
<br/>
item type = string
<br/>
index type = number
<br/>
results type = Array<{item: string, index: number}>

Відразу хочеться сказати, що була передана стрілочна функція з await, яка не вкладена в асинхронну функцію і тому виникала помилка, тому було прийняте рішення огорнути його в функцію:

    const processArray = async () => {
      const results = await runSequent(arr, (item: string, index: number) =>
        Promise.resolve({
          item,
          index,
        })
      );

      return Promise.all(results);
    }

Також я повертаю не просто results, а

    return Promise.all(results)

тому що, processArray() повертає масив промісів, отриманих з runSequent(). Я викликаю Promise.all() над цим масивом промісів, щоб отримати проміс, який розв'язується масивом фактичних результатів.

Щодо реалізації 

    const runSequent = (arr: Array<unknown>, callback: Function): Array<unknown> => {
      return arr.map((item, index) => callback(item, index));
    }

То я створюю стрілочну функцію, яка приймає параметри arr з типом Array`<unknown>` та колбек з типом Function, і повертає масив типу Array`<unknown>`. Все це проситься в умові (прийняття масиву будь-якого типу).

Далі я просто повертаю масив з заміною кожного елемента на колбек, який передається як аргумент.

Результат виконання програми:

![task1Result](img\task1\img.png)

<br>

### 2. Напишіть функцію, яка приймає будь-який тип масиву та правило для видалення елементів масиву. Функція змінює переданий масив, а усі видалені елементи функція повертає окремим масивом такого ж типу. Усі типи мають застосовуватися автоматично (функція шаблону). Приклад виклику:

    const array = [1, 2, 3, 6, 7, 9];
    const deletedElements = arrayChangeDelete(array, (item) => item % 2 === 0);

IDE має розглядати змінні з прикладу так:
<br>
item: number
<br>
deletedElements: Array
<br>

результат виклику:
<br>
array = [1, 3, 7, 9]
<br>
deletedElements = [2, 6]

Я створив стрілочну функцію, яка за умовою приймає масив будь-якого типу та правило (колбек) для видалення елементів масиву. Я не буду описувати кожну типізацію змінну, адже я це зробив ще для першого таску і вважаю ці пояснення для кожного taskу буде зайвим.

    const arrayChangeDelete = (arr: Array<unknown>, callback: Function): Array<unknown> => {
      const result: Array<unknown> = [];

      for (let i = 0; i < arr.length; i++) {
        if (callback(arr[i])) {
          result.push(arr[i]);
          arr.splice(i, 1);
        }
      }

      console.log(arr);

      return result;
    }

Далі я створюю пустив масив, в яким потім ми запушимо масив наших видалених елементів. Ми проходимося по масиву циклом і якщо елемент підпадає під правило видалення ми пушимо його в результуючий масив і видаляємо методом сплайс з наданого масива. За умовою ми повинні повернути саме масив видалених елементів, тому

    return result;

але також в коді є вивід в консоль:

    console.log(arr);

для перевірки умови 

>результат виклику:
<br>
array = [1, 3, 7, 9]
<br>
deletedElements = [2, 6]

Результат виконання програми:

![task2Result](img\task2\img.png)

<br>

### 3. Напишіть скрипт, який отримує з командного рядка рядковий параметр - шлях до JSON-файла із масивом рядків - посилань, читає та аналізує його вміст. Скрипт має створити папку «`<JSON_filename>`_pages» і для кожного посилання із `<JSON-файла>` отримати його HTML-вміст і зберегти цей вміст у окремому файлі в новоствореній папці. Приклад JSON-файла (list.json) прикріплений до цього практичного завдання нижче.

![task3File](img\task3\json.png)

Спочатку імортуємо всі необхідні бібліотеки для виконання таску:

    import * as fs from 'fs';
    import * as path from 'path';
    import * as readline from 'readline';
    import axios from 'axios';

fs (для роботи з файловою системою), path (для роботи з шляхами файлів), axios (для здійснення HTTP-запитів) і readline (для взаємодії з консоллю).

Далі створюємо допоміжну функцію:

    async function fetchHTMLContent(url: string): Promise<string> {
      try {
        const response = await axios.get(url);
        
        return response.data;
      } catch (error) {
        console.error(`Error fetching HTML content from ${url}:`, error);
        return '';
      }
    }

Ця функція використовує модуль axios для виконання GET-запиту до заданого URL і отримання HTML-вмісту. Якщо запит успішний, повертається HTML-вміст. У разі помилки виводиться повідомлення про помилку і повертається пустий рядок.

Далі створюємо нашу main функцію createHTMLFiles:

    async function createHTMLFiles(jsonFilePath: string) {
      try {
        const jsonData = JSON.parse(fs.readFileSync(jsonFilePath, 'utf8'));
        const jsonFilename = path.basename(jsonFilePath, '.json');
        const outputFolder = `${jsonFilename}_pages`;

        if (!fs.existsSync(outputFolder)) {
          fs.mkdirSync(outputFolder);
        }

        for (const url of jsonData) {
          const htmlContent = await fetchHTMLContent(url);
          const filename = url.replace(/[^a-zA-Z0-9]/g, '_') + '.html';
          const filePath = path.join(outputFolder, filename);
          fs.writeFileSync(filePath, htmlContent, 'utf8');
          console.log(`HTML content saved for ${url}`);
        }

        console.log('Process completed successfully.');
      } catch (error) {
        console.error('Error:', error);
      }
    }


Ця функція отримує шлях до JSON-файлу (jsonFilePath) як вхідний параметр. По-перше, вона зчитує вміст JSON-файлу (jsonData) за допомогою fs.readFileSync і парсить його в об'єкт.

Далі, вона отримує ім'я файлу без розширення з шляху до JSON-файлу (jsonFilename). Використовуючи це ім'я, створює нову папку для виведення файлів (outputFolder).

Якщо ця папка не існує, вона створюється за допомогою fs.mkdirSync.

Потім функція проходить по кожному URL у jsonData. Для кожного URL викликається функція fetchHTMLContent, яка отримує HTML-вміст. Потім генерується ім'я файлу на основі URL, замінюючи всі символи, які не є буквами або цифрами, на підкреслення. Формується повний шлях до файлу (filePath) у папці outputFolder.

Нарешті, використовуючи fs.writeFileSync, HTML-вміст записується у файл. Крім того, виводиться повідомлення про успішне збереження HTML-вмісту для кожного URL.

Якщо під час виконання виникає помилка, виводиться повідомлення про помилку.

Створення інтерфейсу для читання з консолі:

    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout
    });

Цей код створює інтерфейс rl для зчитування з вхідного потоку (process.stdin) і виводу вихідного потоку (process.stdout), що використовується для взаємодії з консоллю.

І нарешті запитування шляху до JSON-файлу в консолі:

    rl.question('Enter the path to the JSON file: ', (jsonFilePath) => {
      rl.close();

      if (jsonFilePath) {
        createHTMLFiles(jsonFilePath);
      } else {
        console.error('No JSON file path entered.');
      }
    });

Цей код викликає rl.question і запитує користувача ввести шлях до JSON-файлу. Коли користувач вводить шлях і натискає Enter, викликається зворотний виклик з аргументом jsonFilePath, який містить введений шлях.

Далі, інтерфейс rl закривається за допомогою rl.close().

Якщо введений шлях jsonFilePath не є порожнім рядком, викликається функція createHTMLFiles з введеним шляхом. У разі, якщо шлях не був введений, виводиться повідомлення про те, що шлях до JSON-файл

Результат виклику функції в консолі і створення нової папки:

![task3Result](img\task3\result.png)

![task3Folder](img\task3\folder.png)

### 4. Напишіть скрипт, який отримує з командного рядка числовий параметр – частоту в секундах. Скрипт має виводити на кожному тику (визначеному частотою) наступну системну інформацію:

- operating system;
- architecture;
- current user name;
- cpu cores models;
- cpu temperature;
- graphic controllers vendors and models;
- total memory, used memory, free memory в GB;
- дані про батарею (charging, percent, remaining time). 

Знайдіть і використайте функціональність підходящих модулів.

Спочатку в мене з'явилася думка використати fs та os модулі, але вони не охоплювали всі запити, тому я знайшов універсальну бібліотеку, яка має всі методи для отримання інформації, що запитується:

    import * as si from 'systeminformation';

Далі йде функція getGB

    const getGB = (bytes: number): string => {
      return (bytes / (1024 ** 3)).toFixed(2) + ' GB';
    }

для перетворення байтів в гігабайти. Також обмежуюсь записом до сотих.


Далі:

    const getInfo = async (): Promise<string> => {
      const [graphicsInfo, temperature, memory, battery, os, user, cpu] = await Promise.all([
        si.graphics(),
        si.cpuTemperature(),
        si.mem(),
        si.battery(),
        si.osInfo(),
        si.users(),
        si.cpu()
      ]);

      return `Operating system: ${os.platform},
    Architecture: ${os.arch},
    Current user name: ${user[0].user},
    CPU cores models: ${cpu.model},
    CPU Temperature: ${temperature.main},
    Graphic controllers vendor: ${graphicsInfo.controllers[0].vendor},
    Graphic controllers model: ${graphicsInfo.controllers[0].model},
    Total memory: ${getGB(memory.total)},
    Used memory: ${getGB(memory.used)},
    Free memory: ${getGB(memory.free)},
    Battery charging: ${battery.isCharging},
    Battery percent: ${battery.percent},
    Battery remaining time: ${battery.timeRemaining}`;
    };

Я використовую асинхронную функцію і тип повернених даних Promise`<string>`, адже всередині неї є await. Без await методи бібліотеки не хочу нормально працювати і при виклику метода, наприклад

    si.cpu().model
я просто отримував undefined.

У зв'язку з цим мною було прийнято рішення використати Promise.all для одночасного очікування декількох промісів і збереження їхніх отриманих значень у масиві. Це значно скорочує загальний час виконання (при тестуванні показники часу очікування зменшились в 2 рази) і деструктуризацію, для покращення розуміння коду.

Опис зчитування даних з консолі був вже в минулому завданні, тому пропустимо це і перейдемо до 

    const handleInfo = () => {
      getInfo().then(data => {
        console.log(data + '\n');
      });
    };

Було вирішено винести цей процес в окрему функцію, щоб код був більше читабельний і setInterval відповідав лише за виклик функції, без процесу обробку інформації.

Результат виконання програми:

![task4Result](img\task4\img.png)

### 5. Напишіть власну реалізацію класу EventEmitter (Publisher/Subscriber), який поводитиметься так:

    const emitter = new MyEventEmitter();
    emitter.registerHandler('userUpdated', () => console.log('Обліковий запис користувача оновлено'));
    emitter.emitEvent('userUpdated'); // Обліковий запис користувача оновлено

Клас MyEventEmitter має два методи:

- registerHandler(event: string, handler: EventHandler): void: Цей метод дозволяє зареєструвати обробник для певного події. Він створює новий масив обробників для даної події, якщо його ще не існує, і додає обробник до масиву.

- emitEvent(event: string): void: Цей метод викликає всі обробники, пов'язані з вказаною подією. Він перебирає масив обробників для даної події і викликає кожен обробник за допомогою handler().

      type EventHandler = () => void;

      class MyEventEmitter {
        private eventHandlers: Record<string, EventHandler[]> = {};

        public registerHandler(event: string, handler: EventHandler): void {
          this.eventHandlers[event] = this.eventHandlers[event] || [];
          this.eventHandlers[event].push(handler);
        }

        public emitEvent(event: string): void {
          const handlers = this.eventHandlers[event];

          if (handlers) {
            handlers.forEach(handler => handler());
          }
        }
      }

      const emitter = new MyEventEmitter();
      emitter.registerHandler('userUpdated', () => console.log('Обліковий запис користувача оновлено'));
      emitter.emitEvent('userUpdated');

Ми створюємо екземпляр класу MyEventEmitter з іменем emitter. Після цього ми реєструємо обробник для події 'userUpdated', який виводить повідомлення у консоль. Нарешті, ми викликаємо метод emitEvent('userUpdated'), що викликає обробник для даної події і виводить повідомлення у консоль.

Результат виконання програми:

![task4Result](img\task5\img.png)