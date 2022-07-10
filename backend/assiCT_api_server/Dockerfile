FROM python:3.7.4

ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1

# install dependencies
RUN pip install --upgrade pip
COPY requirements.txt .
RUN pip install -r requirements.txt

WORKDIR /usr/src/app
# copy project
COPY . .

EXPOSE 8000:8000

COPY entrypoint.sh /
ENTRYPOINT ["sh", "/entrypoint.sh"]
