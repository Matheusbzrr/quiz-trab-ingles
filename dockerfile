# 1. Usa imagem Node LTS leve
FROM node:22-alpine

# 2. Cria diretório da aplicação dentro do container
WORKDIR /app

# 3. Copia arquivos de dependências
COPY package*.json ./

# 4. Instala apenas dependências de produção
RUN npm install

# 5. Copia o restante do código
COPY . .

# 6. Compila o NestJS
RUN npm run build

# 7. Expõe a porta da aplicação
EXPOSE 4000

# 8. Comando para rodar a aplicação
CMD ["node", "dist/main", "start:prod"]
