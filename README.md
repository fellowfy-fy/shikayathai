НЕ ЗАБУДЬ ЗАВИСИМОСТИ УСТАНОВИТЬ

Создание виртуального окружения
```sh
python -m venv venv
```
Сделать файл с зависимостями
```sh
pip freeze > requirements.txt
```
Установка зависимостей с файла
```sh
pip install -r requirements.txt
```
фронтенд находится в vite_frontend

я хз запустится ли у тебя, поэтому вот команды для установки фронта

npm create vite@latest my-react-app --template react

перейди в папку с фронтом

npm install axios react-router-dom jwt-decode

npm install

npm run dev

Перенеси в новый фронт весь src и файл .env

У тебя запустится фронтенд

Для запуска бекэнда пиши python manage.py runserver в папке backend

Чтобы фронт с беком работали их надо вместе запустить в разных терминалах.

Если будут ошибки, обращайся к чатгпт он шарит.

Будут ошибки, в основном из-за несостыковок данных бека и фронта. Но работает регистрация и логин. Можешь поиграться с этим.

Твоя пока задача полностью сделать дизайн для домашней страницы

И ещё гитхаб должен тебе давать заливать. Ты как коллаборатор числишься. Проверь с какого акка ты сидишь на компе. Если тот же акк, то я попробую через ключи сделать

текст херня давай по новой