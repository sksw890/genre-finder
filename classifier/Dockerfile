FROM python:3.10.6-slim-buster

#Install git
ARG DEBIAN_FRONTEND=noninteractive

RUN set -xe \
	&& echo "dash dash/sh boolean false" | debconf-set-selections \
	&& dpkg-reconfigure dash

RUN set -xe \
	&& apt-get update

RUN set -xe \
	&& apt-get install -y -q \
	git \
	ca-certificates

RUN set -xe \
	&& apt-get clean \
	&& rm -rf /var/lib/apt/lists/*

RUN mkdir -p /app

WORKDIR /app

# Pull from git repo.
RUN git init .

RUN git remote add origin https://github.com/ruohoruotsi/LSTM-Music-Genre-Classification.git

RUN git pull origin master

RUN pip install -r /app/requirements.txt

COPY requirements_task_queue.txt /app

RUN pip install -r /app/requirements_task_queue.txt

COPY tasks.py /app

CMD ["celery", "-A", "tasks", "worker", "--loglevel=INFO"]
