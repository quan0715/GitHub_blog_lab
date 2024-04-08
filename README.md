### 這是Quan的 Dcard 實習作業繳交練習

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

### 專案成品

* 另外開了專門發 Issue 的 Repo 來跟真的 Issue 做出區別
[blog post repo](https://github.com/quan0715/GithubBlogPortal)

* 部署在線上環境
  [公開連結](https://github-blog-lab.vercel.app)

* 授權用 Github App
  [連結](https://github.com/apps/blogportal)

## 介面與功能介紹
此次專案在環境設定功能已經自動綁定，[Issue Repo](https://github.com/quan0715/GithubBlogPortal)，並且開放任何登入後的使用者可以留言與 *發文* ，當然該用者也只能自行刪除或編輯自己發的文章，目的是希望這個版可以更偏向大家共同的小空間而非個人部落格。
> 操作影片1


https://github.com/quan0715/GitHub_blog_lab/assets/60366187/a134a8d4-93b3-449c-a277-a8190918ef8f

* 主界面
  * NavBar: Logo / Theme 切換 /OAuth 登入
  * 登入後
    1. OAuth Button 會切成 User Avatar 並且可以在此登出
    2. 左下角會出現 Add Button 來讓人新增貼文
    3. 誠實的說 Infinity Scrolling 還沒做完，如果我做完了我再把這句刪除

> 新增文章操作


https://github.com/quan0715/GitHub_blog_lab/assets/60366187/7ad0cba1-df53-498b-96ae-14e7c856b9d4

* 新增文章
  * 點擊按鈕後會彈出帶有新增貼文表單 的 Dialog
  * 表單預覽，可以切換純文字與預覽的畫面
  * 表單驗證
    1. 按鈕會持續 disable 直到通過表單驗證（title 必填/body > 30）
  * 送出後跳出成功訊息後直接導向到新建立的貼文頁面
  * 未來展望：希望能修改標籤、新增副標題以及cover_url (目前都需要去手動添加 metaData格式範例如下)
    <img width="1022" alt="image" src="https://github.com/quan0715/GitHub_blog_lab/assets/60366187/87b5982e-2b9a-44f8-954d-ccd9717c14eb">

> 新增留言操作


https://github.com/quan0715/GitHub_blog_lab/assets/60366187/cd2dc6be-b206-4b5f-a9a1-52cfcc16990d


* 新增留言
  * 文章底下會有留言區，會由創建先後順序排序
  * 登入後才能留言，因此下面也會有登入提示
  * 送出留言後畫面會跟著刷新
  * 未來展望：使用者可以自己編輯與更新留言
 
> 刪除/編輯貼文操作
> 第一段影片為編輯貼文 一開始，由於我不是作者所以無法修改或編輯
> 第二段則為刪除貼文


https://github.com/quan0715/GitHub_blog_lab/assets/60366187/c8cf4d8d-b98c-4035-804d-345c4830bb04



https://github.com/quan0715/GitHub_blog_lab/assets/60366187/104bbbab-1b8a-4d16-b67e-d3d2e68606b6


* 刪除/編輯貼文
  * 只有作者可以自己刪除或編輯貼文，並會在左下角出現 Tool bar （如果已經登入且是該篇的作者）
  * 表單預覽，可以切換純文字與預覽的畫面
  * 表單驗證同新增貼文
  * 刪除前會跳出提示框，刪除後導向回主選單
  * 之後一樣希望有更多編輯的選項可以完善成為真正的討論版
    

### 環境設定與架構
* 框架
  * 全端：Next.js(typescript + app Router)
  * CSS: tailwind CSS
  * UI Kit: [shadcn/ui](https://ui.shadcn.com)
    
* OAuth: 建立 Github App （非 Github OAuth）來當作授權，並設定 .env 來處理環境變數
  * 非登入操作使用 App Auth/ 登入操作使用 user auth(token base)

* 表單驗證： `useForm`
* Markdown Display: 'react-markdown' & 'tailwindcss/typography'

* 專案架構 
<img width="287" alt="image" src="https://github.com/quan0715/GitHub_blog_lab/assets/60366187/c5bd9487-3bbf-4a37-887f-b178240646e4">

  * action: server action 操作/Github API Calling
  * models: 定義 data model (issue & comment)
  * components: 建立 UI / blocks / client component (表單、互動按鈕)
  * app
    * page -> 主頁面
    * [issueNumber] -> 動態路由渲染文章介面
    * api/oauth/callback -> oauth redirect url
    
