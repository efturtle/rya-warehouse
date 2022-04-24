instalacion del proyecto:
tener php (8.0) y composer instalado
clonar este repo
navegar dentro de la carpeta del proyecto
correr los siguientes commandos
    composer install
    cp .env.example .env
    php artisan key:generate
    php artisan migrate
    touch database/database.sqlite
