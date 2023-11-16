FROM python:3.11

# Instalar dependencias del sistema
RUN apt-get update && apt-get install -y \
    gcc \
    gfortran \
    libffi-dev \
    libssl-dev \
    libopenblas-dev \
    liblapack-dev \
    python3-dev \
    cmake \
    build-essential

WORKDIR /app
COPY . /app

# Instalar las dependencias de Python
RUN pip install --no-cache-dir -r requirements.txt

EXPOSE 3000
CMD python ./index.py

LABEL authors="Equipo Kongo"

ENTRYPOINT ["top", "-b"]
