参考：https://github.com/gaohan1994/react-vw-layout 
> vue使用方式：[《如何在Vue项目中使用vw实现移动端适配》](https://www.w3cplus.com/mobile/vw-layout-in-vue.html)
> 关于具体如何使用请参考
  [再聊移动端页面的适配](https://www.w3cplus.com/css/vw-for-layout.html)
> [使用Flexible实现手淘H5页面的终端适配](https://www.w3cplus.com/mobile/lib-flexible-for-html5-layout.html)

# 目的：搭建一个简单的框架让开发更加高效🎆

1. webpack.config.dev.js       # 开发环境配置
2. webpack.config.prod.js      # 生产环境配置
3. webpackDevServer.config.js  # 开发服务器配置

## 1.创建项目
```
create-react-app react-vw-layout
cd react-vw-layout
npm start
```
打开http://localhost:3000/ 可以看到react欢迎页面，第一步成功。
## 2.打开配置选项
由于react默认隐藏webpack配置需要手动显示。
```
npm run eject
//Are you sure you want to eject? This action is permanent. (y/N) 
y
```
运行完eject之后项目结构如下
(![项目结构.png](http://book.52react.cn/20190516231140.png))
第二步收工，第三部开始配置各种插件。

## 3.增加配置
安装postCss插件
```
npm i --save postcss-aspect-ratio-mini postcss-px-to-viewport postcss-write-svg postcss-cssnext postcss-viewport-units cssnano
```
在``config/webpack.config.dev.js``文件中进行如下修改

1.引入postCss插件
```
const postcssAspectRatioMini = require('postcss-aspect-ratio-mini');
const postcssPxToViewport = require('postcss-px-to-viewport');
const postcssWriteSvg = require('postcss-write-svg');
const postcssCssnext = require('postcss-cssnext');
const postcssViewportUnits = require('postcss-viewport-units');
const cssnano = require('cssnano');
```
2.加入postCss配置
#### 加入配置代码位置如下
```
{
    test: /\.css$/,
    use: [
      require.resolve('style-loader'),
      {
        loader: require.resolve('css-loader'),
        options: {
          importLoaders: 1,
        },
      },
      {
        loader: require.resolve('postcss-loader'),
        options: {
          ident: 'postcss',
          plugins: () => [
            require('postcss-flexbugs-fixes'),
            autoprefixer({
              browsers: [
                '>1%',
                'last 4 versions',
                'Firefox ESR',
                'not ie < 9', // React doesn't support IE8 anyway
              ],
              flexbox: 'no-2009',
            }),
            //看这里看这里看这里
          ],
        },
      },
    ],
},	
```
### 需要加入的代码如下
```
postcssAspectRatioMini({}),
postcssPxToViewport({ 
  viewportWidth: 750, // (Number) The width of the viewport. 
  viewportHeight: 1334, // (Number) The height of the viewport. 
  unitPrecision: 3, // (Number) The decimal numbers to allow the REM units to grow to. 
  viewportUnit: 'vw', // (String) Expected units. 
  selectorBlackList: ['.ignore', '.hairlines'], // (Array) The selectors to ignore and leave as px. 
  minPixelValue: 1, // (Number) Set the minimum pixel value to replace. 
  mediaQuery: false // (Boolean) Allow px to be converted in media queries. 
}),
postcssWriteSvg({
  utf8: false
}),
postcssCssnext({}),
postcssViewportUnits({}),
cssnano({
  preset: "advanced", 
  autoprefixer: false, 
  "postcss-zindex": false 
})

```
第三步收工。
## 4.测试
修改``App.js``
```
import React, { Component } from 'react';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        hello vw-layout
      </div>
    );
  }
}
export default App;
```
修改App.css
```
.App {
  width: 750px;
  height: 200px;
  background: #f27a7a;
  color: #ffffff;
  line-height: 200px;
  text-align: center;
}
```
重新``npm start``页面显示如下
![](http://book.52react.cn/20190516231335.png)

可以说是非常OK，剩下最后一个问题，配置生产环境webpack配置文件。
## 5.配置生产环境webpack.config.js
操作与配置测试环境文件相同先引入插件，在相同的位置配置postCss插件
配置完成后执行``npm run build``
打开``static/css/main.********.css``
![打包后的css.png](https://user-gold-cdn.xitu.io/2018/4/17/162d1a8c9781311f?w=1120&h=96&f=jpeg&s=13213)
可以看到已经成功编译，打完收工

## 6.加入viewport-units-buggyfill配置
打开``public/index.html``
首先在``<head></head>``中引入阿里cdn
```js
<script src="//g.alicdn.com/fdilab/lib3rd/viewport-units-buggyfill/0.6.2/??viewport-units-buggyfill.hacks.min.js,viewport-units-buggyfill.min.js"></script>
```

在``body``中，加入如下``js``代码：

```js
 <script>
  window.onload = function () {
    window.viewportUnitsBuggyfill.init({
      hacks: window.viewportUnitsBuggyfillHacks
    });
  }
</script>
```
如果遇到``img``无法显示，则添加全局css
```css
img { 
    content: normal !important; 
}
```

#### OK配置成功。这样就适配了低版本安卓机型

## 7.加入css-modules配置

一般的小项目不使用``css-modules``已经可以hold住了，但是页面多起来还是建议使用``css-modules``，下面介绍一下用法：

执行```npm i --save react-css-modules```

在``App.js``文件中引入插件
``import CSSModules from 'react-css-modules';``

修改css文件的引入方式
从``import './App.css';``修改为``import styles from './App.css';``

修改引用Css方式
``className``=>``styleName``

修改导出方式
``export default App``=>``export default CSSModules(App, styles);``

保存，从新执行``npm start``查看页面发现失败

![](http://book.52react.cn/20190516231335.png)

原因是未打开``css import``配置，此时``import styles from './App.css';``该语句并未成功引入``css``文件。

打开``webpack.config.dev.js``加入``modules: true``
找到如下位置
```js
{
    test: /\.css$/,
    use: [
      require.resolve('style-loader'),
      {
        loader: require.resolve('css-loader'),
        options: {
          //看这里看这里看这里看这里
          modules: true,
          
          importLoaders: 1,
        },
      },
      {
        loader: require.resolve('postcss-loader'),
        options: {
           //.....省略
        }
      }
    ],
  },
```
保存，再次执行``npm start``查看页面
![](http://book.52react.cn/20190516231335.png)
成功！但是这个``class名``太过乱码不适于调试，再次打开``webpack.config.dev.js``
找到如下位置加入语句``localIdentName:'[name]_[local]_[hash:base64:5]'``
```js
{
    test: /\.css$/,
    use: [
      require.resolve('style-loader'),
      {
        loader: require.resolve('css-loader'),
        options: {
          modules: true,
          importLoaders: 1,
          //看这里看这里看这里
          localIdentName: '[name]_[local]_[hash:base64:5]'
        },
      },
      {
        loader: require.resolve('postcss-loader'),
        options: {
           //.....省略
        }
      }
    ],
  },
```
再次执行``npm start``查看页面
![clipboard.png](https://user-gold-cdn.xitu.io/2018/4/17/162d1abeac52b0b2?w=800&h=160&f=jpeg&s=30196)
#### 最后
最后相同步骤加入到``webpack.config.prod.js``中
执行``npm run build`` 查看打包文件
![clipboard.png](https://user-gold-cdn.xitu.io/2018/4/17/162d1ac29340aeac?w=800&h=233&f=jpeg&s=34166)


## 增加一些常用功能
* [x] 配置less
* [x] 配置全局样式
* [x] axios全局封装
* [ ] redux
* [ ] saga
* [ ] 图标库
* [ ] 其他想想
