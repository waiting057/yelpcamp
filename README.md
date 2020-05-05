# yelpcamp


## 此網站主要功能:
* 登入系統(登入/登出/註冊)
* 發文系統
** 編輯文章
** 刪除文章
* 留言系統
** 編輯留言
** 刪除留言
## 使用程式及套件:
* 此網頁是使用node-express去進行撰寫
* html 使用ejs進行撰寫，並將各頁面程式進行分開管理
* css 使用bootstrap前端框架進行撰寫排版
* javascript 將資料透過API與後台做串接
** body-parser 解析request內容
** 因form架構無法使用DELETE及PUT method，因此使用methodOverride，將POST轉成DELETE及PUT
* mongoose 資料庫
* 使用passport套件撰寫登入系統(許多著名網站皆有使用此套件進行撰寫登入系統，ex: facebook、twitter、github)
* 使用flash做出使用者在操作時的提示字元
## Restful API架構

| Name   | Path             | HTTP Verb |   Purpose                                            | Mongoose Method
| ------ | ------------ | ------------ | ------------ | ------------ |
|Index   | /blog            | GET       | List all blog                                        | Blog.find()
|New     | /blog/new        | GET       | Create new blog form                                 | N/A
|Create  | /blog            | POST      | Create a new blog, then redirect somewhere           | Blog.create()
|Show    | /blog/:id        | GET       | Show info about one specific blog                    | Blog.findById()
|Edit    | /blog/:id/edit   | GET       | Show edit form for one blog                          | Blog.findById()
|Update  | /blog/:id        | PUT       | Update a particular blog, then redirect somewhere    | Blog.findByIdAndUpdate()
|Destroy | /blog/:id        | DELETE    | Delete a particular blog, then redirect somewhere    | Blog.findByIdAndRemove()


# Landing Page
![](https://media.giphy.com/media/jqHtbIg5Ed7bGqnI84/giphy.gif)
* 使用css中的animation、透明化與時間差製作背景圖片的轉場效果
# 主畫面
![](https://i.imgur.com/p2ExbgI.jpg)
# 登入系統畫面
* 網頁右上方的nav bar內容會對應使用者的登入狀態來進行切換
![](https://i.imgur.com/nv8DbiK.png)
![](https://i.imgur.com/1Wvqjvz.png)
* 註冊問題，提示字元
![](https://i.imgur.com/3eVJS1i.png)
![](https://i.imgur.com/a1qluYA.png)
* 使用者都入後，右上方登入註冊扭改為登出及目前登入者名稱
![](https://i.imgur.com/HfXiVmd.png)
* 登出時，會有提示登出成功提示字元
# 發布文章
* 網頁會先檢查使用者的登入狀態來決定是否有權利進行發文
![](https://i.imgur.com/IGSEibB.png)
* 已登入時的發文畫面
![](https://i.imgur.com/nBMhw6a.png)
*發布的新文章會顯示在主畫面
# 文章檢視
![](https://i.imgur.com/F73xZtu.png)
* 根據是否為發文者，來啟動該文章的編輯及刪除權力
![](https://i.imgur.com/Th1oKUs.png)
![](https://i.imgur.com/ih10Gd8.png)
# 留言系統
* 網頁會先檢查使用者的登入狀態來決定是否有權利進行留言
![](https://i.imgur.com/IGSEibB.png)
* 使用者登入後，進行留言畫面
![](https://i.imgur.com/9zviybW.png)
![](https://i.imgur.com/B0vJBQs.png)
* 會根據是否為該則留言的發言者給予編輯及刪除的權力
![](https://i.imgur.com/SGIZopJ.png)
