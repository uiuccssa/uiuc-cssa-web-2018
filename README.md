# Web 2018
New web with customized Bootstrap + SaSS + jQuery started by Jett

Primary color: #CC3300
Font family: "Noto Sans","Noto Sans CJK SC Light","Microsoft YaHei",sans-serif

### 结构介绍
#### Frameworks 基本框架
UI模板: [Bootstrap documentation](http://getbootstrap.com/docs/3.3/css/)
Customized **config.json**, modified with **style.css**

SCSS Compiler: [SaSS reference](http://sass-lang.com/guide)
Using SaSS in **sass/style.scss**. *[What is a CSS preprocessor?](https://learn.shayhowe.com/advanced-html-css/preprocessors/)* 
大致就是CSS太难写了所以用了插件可以写得简短一些然后自动complie成可以跑的.css文件

Controller(结构): jQuery **public/assets/script.js**
所有页面共同使用index.html，由jQuery在页面内容部分切换至各个页面单独的html内容，并切换导航栏上的高亮之类。
使用地址里和每个链接的fragment identifier(#foo)识别当前读取的文件。

#### Important Files For Development
由"###"表示高亮。其他文件没事不要动
 ```
    uiuc-cssa-web-2018
    ├── README.md
    ├── .gitignore
    ├── config.json
    ├── sass/
    │  └── style.scss                               ###SCSS文件
    └── public/
            ├── image/                              ###所有要使用的图标文件
            │  ├── shared/
            │  └── home/
		    │  └── ...
            ├── assets/
            │  ├── bootstrap.min.css
            │  ├── bootstrap-theme.min.css
            │  ├── bootstrap.min.js
            │  ├── style.css
            │  ├── style.css.map
            │  └── script.js                        ###整个网页的controller
            ├── index.html
            ├── home.html                           ###主页的页面内容
            ├── about.html                          ###About页的内容
            └── ...                                 ###其他页面的内容
```

#### 大致的开发方法

##### 替换图片
直接在image/里找到文件然后替换图片

##### 修改页面主内容
修改当前页面的html

##### 修改导航/页脚内容
修改index.html

##### 如何做中英文的context
网站的navbar上有一个button是做translation的，每次如果有中英版本的context，中文段落的class是chinese，英文的是english。
再在段落的css里边加display：none或者display：block。详情参考about.html。
 
##### 修改UI
 1. [Have SaSS installed](http://sass-lang.com/install)
 2. 修改 style.scss 文件，然后compile覆盖style.css

每次修改scss文件自动compile覆盖 command ``$ sass --watch sass:public/assets/ ``
 
 **重要：**不要动bootstrap的文件，如果有需要尽量在style里覆盖掉

