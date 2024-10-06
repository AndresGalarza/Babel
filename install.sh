#!/bin/bash

# Navegar al directorio de la aplicación y ejecutar npm install
echo "Instalando dependencias en library-app..."
cd library-app
npm install

# Verificar si npm install tuvo éxito
if [ $? -ne 0 ]; then
  echo "Error al instalar dependencias en library-app."
  exit 1
fi

# Navegar al directorio de la API y ejecutar npm install
echo "Instalando dependencias en library-api..."
cd ../library-api
npm install

# Verificar si npm install tuvo éxito
if [ $? -ne 0 ]; then
  echo "Error al instalar dependencias en library-api."
  exit 1
fi
cd ..

echo "Dependencias instaladas correctamente en library-app y library-api."