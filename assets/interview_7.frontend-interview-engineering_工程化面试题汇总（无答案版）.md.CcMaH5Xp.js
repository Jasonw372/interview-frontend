import{_ as i,c as s,o as p,a1 as l}from"./chunks/framework.DCKU21so.js";const g=JSON.parse('{"title":"","description":"","frontmatter":{},"headers":[],"relativePath":"interview/7.frontend-interview-engineering/工程化面试题汇总（无答案版）.md","filePath":"interview/7.frontend-interview-engineering/工程化面试题汇总（无答案版）.md"}'),a={name:"interview/7.frontend-interview-engineering/工程化面试题汇总（无答案版）.md"},e=l(`<ol><li><p>下面的模块导出了什么结果？</p><div class="language-js vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">exports</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">.a </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> &#39;a&#39;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">;</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">module</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">.</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">exports</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">.b </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> &#39;b&#39;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">;</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">this</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">.c </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> &#39;c&#39;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">;</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">module</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">.</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">exports</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> =</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> {</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  d: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&#39;d&#39;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">,</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">};</span></span></code></pre></div></li><li><p>说一下你对前端工程化，模块化，组件化的理解？</p></li><li><p>webpack 和 gulp 的区别是什么？</p></li><li><p>webpack 中的 loader 属性和 plugins 属性的区别是什么？</p></li><li><p>webpack 的核心概念都有哪些？</p></li><li><p>commonjs 和 es6 模块的区别是什么？</p></li><li><p>ES6 中如何实现模块化的异步加载？</p></li><li><p>说一下 webpack 中的几种 hash 的实现原理是什么？</p></li><li><p>webpack 如果使用了 hash 命名，那是每次都会重新生成 hash 吗？</p></li><li><p>webpack 中是如何处理图片的？ （抖音直播）</p></li><li><p>webpack 打包出来的 html 为什么 style 放在头部 script 放在底部？</p></li><li><p>webpack 配置如何实现开发环境不使用 cdn、生产环境使用 cdn？</p></li><li><p>介绍一下 webpack4 中的 tree-shaking 的工作流程？</p></li><li><p>说一下 webpack loader 的作用是什么？</p></li><li><p>在开发过程中如果需要对已有模块进行扩展，如何进行开发保证调用方不受影响？</p></li><li><p>export 和 export default 的区别是什么？</p></li><li><p>webpack 打包原理是什么？</p></li><li><p>webpack 热更新原理是什么？</p></li><li><p>如何优化 webpack 的打包速度？</p></li><li><p>webpack 如何实现动态导入？</p></li><li><p>说一下 webpack 有哪几种文件指纹</p></li><li><p>常用的 webpack Loader 都有哪些？</p></li><li><p>说一下 webpack 常用插件都有哪些？</p></li><li><p>使用 babel-loader 会有哪些问题，可以怎样优化？</p></li><li><p>babel 是如何对 class 进行编译的？</p></li><li><p>解释一下 babel-polyfill 的作用是什么？</p></li><li><p>解释一下 less 的&amp;的操作符是做什么用的？</p></li><li><p>在前端工程化中，可以进行哪些方面的优化？</p></li><li><p>如果有一个工程打包特别大-如何进行优化？</p></li><li><p>webpack 怎么进行首屏加载的优化？</p></li><li><p>介绍一下 webpack scope hoisting？</p></li><li><p>webpack proxy 工作原理，为什么能解决跨域？</p></li><li><p>组件发布的是不是所有依赖这个组件库的项目都需要升级？</p></li><li><p>开发过程中，如何进行公共组件的设计？（字节跳动）</p></li><li><p>说一下项目里有做过哪些 webpack 上的优化（字节跳动）</p></li><li><p>具体说一下 splitchunksplugin 的使用场景及使用方法。（字节跳动）</p></li><li><p>描述一下 webpack 的构建流程？（CVTE）</p></li><li><p>解释一下 webpack 插件的实现原理？（CVTE）</p></li><li><p>有用过哪些插件做项目的分析吗？（CVTE）</p></li><li><p>什么是 babel，有什么作用？</p></li><li><p>解释一下 npm 模块安装机制是什么？</p></li></ol>`,1),n=[e];function t(k,h,r,c,d,E){return p(),s("div",null,n)}const _=i(a,[["render",t]]);export{g as __pageData,_ as default};
