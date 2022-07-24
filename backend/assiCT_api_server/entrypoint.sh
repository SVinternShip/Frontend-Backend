python manage.py migrate --no-input
python manage.py collectstatic --no-input

daphne -b 0.0.0.0 -p 8000 config.asgi:application --application-close-timeout 60 --ping-timeout 240 --websocket_timeout 240