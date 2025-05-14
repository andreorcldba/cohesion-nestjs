# Use uma imagem base com Node.js
FROM node:23-slim

# Instala utilitários de sistema necessários (inclui 'ps')
RUN apt-get update && apt-get install -y procps && rm -rf /var/lib/apt/lists/*

# Define o diretório de trabalho no contêiner
WORKDIR /usr/src/app

# Copia o restante do código para o contêiner
COPY . .

# Comando para iniciar a aplicação
CMD ["npm", "run", "start:dev"]
