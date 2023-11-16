FROM python:3.9-alpine3.15

# Instalar dependencias del sistema
RUN apk add --no-cache \
    gcc \
    gfortran \
    musl-dev \
    libffi-dev \
    openssl-dev \
    python3-dev

WORKDIR /app
COPY . /app

# Instalar las dependencias de Python
RUN pip install --no-cache-dir -r requirements.txt

EXPOSE 3000
CMD python ./index.py

LABEL authors="Equipo Kongo"

ENTRYPOINT ["top", "-b"]