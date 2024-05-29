# 使用官方的 Node.js 14 作為基礎映像
FROM node:14

# 設置工作目錄
WORKDIR /usr/src/app

# 複製 package.json 和 package-lock.json
COPY package*.json ./

# 安裝依賴項
RUN npm install

# 複製應用程序源代碼
COPY . .

# 構建 Nuxt.js 應用程序
RUN npm run build

# 暴露應用程序運行端口
EXPOSE 3000

# 啟動應用程序
CMD ["npm", "start"]
