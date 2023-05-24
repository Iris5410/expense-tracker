# Expense-tracker
一個簡易記帳的應用程式

## 功能
* 可以註冊帳號，在登入後才能使用記帳功能    
* 能記錄新的一筆帳、編輯、刪除    
* 首頁能看到所有帳目及花費總金額    
* 首頁也可以篩選帳目的類別進行瀏覽    

## 專案安裝
1. 請確認本地端已安裝 Node.js 和 npm
2. 將此專案 clone 到本地
3. 安裝與此專案相關之套件：
  ```bash
  npm install
  ```    
4. 匯入種子資料：
  ```bash
  npm run seed
  ```    
  若成功運行，終端機會顯示：
  ```bash
  categorySeeder done.
  recordSeeder done.
  ```     
  並且會產生一組使用者，帳號密碼如下：
  ```bash
  Email: root@example.com
  Password: qweqwe  
  ```     
5. 啟動伺服器：
  ```bash
  npm run dev
  ```    
6. 終端機上有看見以下字串就代表成功運作了：
  ```bash 
  App is running on localhost:3000
  mongodb connected! 
  ```    

## 開發工具
* Node.js 15.9.0    
* Express 4.16.4    
* Express-Handlebars 3.0.0    
* Bootstrap 5.0.2    
* MongoDB    
* mongoose 5.9.7    
