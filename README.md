# Web Larek / «Веб-ларёк»

**Учебное SPA-приложение интернет-магазина на TypeScript**, выполненное в рамках обучения фронтенд-разработке в Яндекс Практикуме. В проекте реализованы каталог товаров, предпросмотр карточек, корзина и двухэтапное оформление заказа.

> **English:** A TypeScript single-page storefront with a product catalog, shopping cart, checkout flow, form validation, API integration, and event-driven MVP-style architecture.

## Что показывает проект

- **Архитектура:** разделение модели данных, компонентов представления и связующего слоя; обмен событиями через `EventEmitter`.
- **Данные и API:** загрузка каталога и отправка заказа через `LarekApi`.
- **Интерфейс:** карточки, модальные окна, корзина, подсчёт стоимости, управление состоянием заказа.
- **Формы:** выбор способа оплаты, адрес доставки, контакты и валидация полей.
- **Инструменты:** `TypeScript`, `SCSS`, `Webpack`, `ESLint`, `Prettier`.

## Быстрый запуск

```bash
npm install
npm run start
```

Для production-сборки: `npm run build`. Проверка стиля кода: `npm run lint`.

## Публикация на GitHub Pages

Адрес демо после успешного деплоя: https://aeternym.github.io/web-larek-frontend/

Workflow `.github/workflows/pages.yml` собирает проект из `main` через `npm ci` и `npm run build`, затем публикует содержимое `dist`. Сборка использует `PUBLIC_PATH=/web-larek-frontend/` и публичный учебный API `API_ORIGIN=https://larek-api.nomoreparties.co`. Это адрес сервера, а не секрет. Доступность каталога зависит от учебного API.

Однократная настройка репозитория:

1. Открыть **Settings → Pages → Build and deployment → Source** и выбрать **GitHub Actions**.
2. Открыть **Actions → Build and deploy to GitHub Pages → Run workflow**, выбрать `main` и запустить workflow.
3. Дождаться успешных заданий `build` и `deploy`, затем открыть адрес демо.

Отдельная ветка `gh-pages` для этого workflow не нужна. Следующие изменения в `main` публикуются автоматически. Старый `npm run deploy` использует другой способ публикации через ветку и для этого workflow не требуется.

Для локального запуска задайте `API_ORIGIN=https://larek-api.nomoreparties.co` в `.env`; для локальной production-сборки — в `.env.production` или переменной окружения. Без адреса API каталог не загрузится. Статические файлы из `src/public` копируются в `dist` при production-сборке.

**Учебный контекст:** проект закрепляет типизацию данных, декомпозицию SPA на компоненты, работу с API, управление событиями и проектирование UI. [Программа Яндекс Практикума — «Фронтенд-разработчик»](https://practicum.yandex.ru/frontend-developer/).

*Приложение разработано для обучения и использует учебный сервер.*

---

## Подробная техническая документация исходного проекта

# Проектная работа "Веб-ларек"

Стек: HTML, SCSS, TS, Webpack

Структура проекта:
- src/ — исходные файлы проекта
- src/components/ — папка с JS компонентами
- src/components/base/ — папка с базовым кодом

Важные файлы:
- src/pages/index.html — HTML-файл главной страницы
- src/types/index.ts — файл с типами
- src/index.ts — точка входа приложения
- src/styles/styles.scss — корневой файл стилей
- src/utils/constants.ts — файл с константами
- src/utils/utils.ts — файл с утилитами

## Установка и запуск
Для установки и запуска проекта необходимо выполнить команды

```
npm install
npm run start
```

или

```
yarn
yarn start
```
## Сборка

```
npm run build
```

или

```
yarn build
```


## Документация

### Классы

Базовые классы:

Api - базовый класс по работе с Api проекта. Содержит в себе базовую логику отправки запросов.

Методы: 

get - выполняет GET запрос. Он принимает два параметра: эндпоинт и функцию обратного вызова (промис с объектом, которым ответил сервер). 
post - Метод для POST-запросов, принимает три параметра: эндпоинт, данные для отправки и функцию обратного вызова.



EventEmitter - базовый класс, обеспечивает работу событий
Установливает и снимает слушателей событий, вызвает слушателей при возникновении события

Методы: 

on - подписка на событие
off - снять подписку на событие
onAll - Слушать все события
offAll - Сбросить все обработчики
emit - инициализация события
trigger - возвращает функцию, при вызове которой инициализируется требуемое в параметре событие

Components - абстрактный класс, обеспечивает создание UI компонентов

Model -  базовый класс для компонентов модели данных, позволяющий связать переданный данные со свойствами объекта


### Классы представления
Классы представления отвечают за данных отображение внутри контейнеров


Page - предназначен для отображения наполнения главной страницы

Поля класса:
_counter: HTMLElement - элемент разметки с количеством товаров в корзине
_gallery: HTMLElement - элемент разметки с карточками
_basket: HTMLButtonElement - элемент разметки с кнопкой для открытыя корзины

Методы:
set counter(value: number): void - метод для установки количества элементов в корзине
set cardsInPage(items: HTMLElement[]): void - метод для установки карточек
set loked(value: boolean): void - метод блокировки скрола


Modal - предназначен для рендера модального окна с выбранным контентом

Поля класса:
_closeButton: HTMLButtonElement - кнопка для закрытия модального окна
_content: HTMLElement - контент модального окна

Методы:
set content - для установки контента в модальном окне
open(): void - для открытия модального окна
close(): void - для закрытия модального окна
render(data: IModal): HTMLElement - для рендера контента


Card - нужен для представления карточки товара

Поля класса:
_category: HTMLElement - категория карточки
_title: HTMLElement - заголовок карточки
_image?: HTMLImageElement - картинка карточки
_description?: HTMLElement - описание карточки
_button?: HTMLButtonElement - кнопка в карточке
_price?: HTMLElement - цена карточки

Методы:
set category(value: string) - установка категории карточки
set title(value: string) - установка заголовка карточки
set image(value: string) - установка картинки карточки
set description(value: string) - установкиа описания карточки
set button(value: string) - установкаи кнопки карточки с определенным текстом
set price(value: number) - установка цены карточки


Basket - нужен для отображения корзины с выбранными товарами

Поля класса:
_list: HTMLElement - разметка для списка
_total: HTMLElement - разметка для общей стоимости заказа
buttom: HTMLElement - кнопка оформления заказа

Методы:
set items(items: HTMLElement[]): void - установка содержимого корзины
set total(total: number): void - установка общей стоимости
set valid(value: boolean): void - определение валидности для оформления заказа


BasketItem - нужен для представления корзины с выбранными товарами

Поля класса:
_index: HTMLElement - номер в списке корзины
_title: HTMLElement - заголовок карточки
_price: HTMLElement- цены карточки
_deleteBtn: HTMLButtonElement - кнопка удаления из списка корзины

Методы:
set index(value: number) - установка номера в списке корзины
set title(value: string) - установка заголовка
set price(value: number) - установка цены


FirstStepOrder - для отображения первой части чекаута оформления заказа

Поля класса:
payMethodCont: HTMLDivElement - методы оплаты
payMethodButtons: HTMLButtonElement[] - массив с элементами кнопок методов оплаты

Методы:
payMethodChoise(method: string): void - выбор метода оплаты
set payment(value: string) - установка оплаты
set address(value: IPaymentType) - установки адреса


SecondStepOrder - для отображения второй части чекаута оформления заказа

Методы:
set phone(value: string) - установки телефона
set email(value: string) - установки почты


SuccsesOrder - отображает информацию об оформленном заказе

Поля класса:
_close: HTMLElement  - для закрытия окна
_total: HTMLElement  - полная стоимость заказа

Методы:
set total(value: number) - установка общей суммы заказа

### Слой данных


FormOrder - класс отвечающий за процесс оформления заказа. Содержит свойства, которые отображаются на полях соответствующих форм и реализует логику валидации свойств. Изменения любого свойства вызывает проверку всех полей класса.

Data - класс позволяющий отслеживать состояние приложения.

Поля класса:
_catalog - спосок лотов на странице.
_order - состояние заказа.
_preview - карточка для просмотра в модальном окне.

### Слой коммуникации


AppApi - предоставляет методы реализующие взаимодействие с бэкендом сервиса

LarekApi - получение списка карточек, получение карточки и отправка запроса на заказ

### Интерфейсы


Интерфейс хранения данных карточки, которуе приложение получает из сервера, на основе которых заполняются карточки в HTML
```
interface IProductCard {
	id: string;
	description: string;
	image: string;
	title: string;
	category: string;
	price: number;
    inBasket: boolean;
    addToBasket(): void;
    removeFromBasket(): void;
}
```


Интерфейс хранения данных заказа
```
interface IFormOrder{
	payment: string;
    validatePayMethod(): void;
    address: string;
    validateAddres(): void;
    email: string;
    validateEmail(): void;
    phone: string;
    validatePhone(): void;
    formErrors: IFormErrors;
    items: ICard[];
    validateOrder(): void;
    clearOrder(): void;
    postOrder(): void;
}
```


Интерфейс для модели данных
```
interface IData {
  _catalog: ICard[];
  _order: IFormOrder;
  _preview: ICard;
  set catalog(cards: ICard[]);
  get catalog(): ICard[];
  set order(order: IFormOrder);
  get order(): IFormOrder;
  get basket(): ICard[];
  set preview(order: ICard);
  get preview(): ICard;
  cardInBasket(card: ICard): boolean;
  getBasketTotalPrice(): number;
  getTotalBasketLength(): number;
  getIdCardsFromBasket(): string[];
  clearBasket(): void;
  createOrder(): IFormOrder;
}
```


Интерфейс ответа зпроса оформления заказа
```
interface IOrderResult {
    id: string;
	total: number
}
```


### Архитектура приложения

Код приложения разделен на слои согласно парадигме MVP:
1) слой представления-отвечает за отображение данных на странице
2) слой данных-отвечает за изменение и хранение  данных
3) презентер-отвечает за связь представления с данными

---

## Мой опыт и обучение

Я начинал карьеру **тестировщиком ПО**, затем работал **фронтенд-разработчиком**, а после обучения бизнес-анализу перешёл в аналитику. Опыт тестирования помогает мне учитывать качество, негативные сценарии и проверяемость требований; опыт разработки — понимать интерфейсы, API и технические ограничения.

Дипломы по тестированию ПО и бизнес-анализу, а также другие учебные проекты собраны в [портфолио и сертификатах Aeternym](https://github.com/Aeternym/certificates).
