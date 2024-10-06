#!/bin/bash

# Verificar si concurrently está instalado
if ! command -v concurrently &> /dev/null
then
    echo "concurrently no está instalado. Instalándolo ahora..."
    npm install -g concurrently
fi

# Ejecutar ambos proyectos en paralelo
echo "Iniciando library-app y library-api..."
concurrently "cd library-app && npm run dev" "cd library-api && npm run serve"