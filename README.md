# Online-store-vue
Интернет-магазин с базовым функционалом.

Состоит из трёх составных частей: клиент для юзеров, клиент CRM и APi.

## Client
### Стек
- Vue 3 
- Vuex, Vue router
### Функционал
- Авторизация
- Просмотр каталога товаров
- Добавление товаров в корзину
- Осуществление покупок
- Просмотр истории покупок

## CRM
### Стек
- Angular
- Angular Router, Angular Reactive Forms
### Функционал
- Авторизация
- Работа с пользователями и товарами
  - Просмотр списков
  - Редактирование/удаление

## API
### Стек
- Nest.js
- Prisma ORM
- MySQL
### Функционал
- Предоставление клиенту необходимых данных и интерфейсов для работы с ними через REST API
- Реализованы Guards (токен хранится в куки)
