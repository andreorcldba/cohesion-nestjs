# Use uma imagem base com Node.js
FROM node:23-slim

# Define o diretório de trabalho no contêiner
WORKDIR /usr/src/app

# Copia o restante do código para o contêiner
COPY . .

# Comando para iniciar a aplicação
CMD ["npm", "run", "start:dev"]