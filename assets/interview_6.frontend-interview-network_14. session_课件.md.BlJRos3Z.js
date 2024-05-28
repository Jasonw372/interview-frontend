import{_ as e,c as o,o as i,a1 as s}from"./chunks/framework.B3GPANAy.js";const h=JSON.parse('{"title":"cookie 的缺陷","description":"","frontmatter":{},"headers":[],"relativePath":"interview/6.frontend-interview-network/14. session/课件.md","filePath":"interview/6.frontend-interview-network/14. session/课件.md"}'),t={name:"interview/6.frontend-interview-network/14. session/课件.md"},n=s('<h1 id="cookie-的缺陷" tabindex="-1">cookie 的缺陷 <a class="header-anchor" href="#cookie-的缺陷" aria-label="Permalink to &quot;cookie 的缺陷&quot;">​</a></h1><p>cookie 是保存在客户端的，虽然为服务器减少了很多压力，但某些情况下，会出现麻烦。</p><p>比如，验证码</p><p><img src="https://raw.githubusercontent.com/Jasonw372/images/master/interview/20210914160537.png" alt="image-20210914160537829"></p><p>如果这样做，客户端可以随便填写一个别人的手机号，然后从 cookie 中获取到验证码，从而绕开整个验证。</p><p>因此，有些敏感数据是万万不能发送给客户端的</p><p>那要如何实现这一流程呢？</p><p><img src="https://raw.githubusercontent.com/Jasonw372/images/master/interview/20210914161657.png" alt="image-20210914161657162"></p><p>可见，session 也是键值对，它保存在服务器端，通过 sessionid 和客户端关联</p><h1 id="面试题" tabindex="-1">面试题 <a class="header-anchor" href="#面试题" aria-label="Permalink to &quot;面试题&quot;">​</a></h1><ol><li>cookie 和 session 的区别是什么？</li></ol><blockquote><p>参考答案：</p><ol><li>cookie 的数据保存在浏览器端；session 的数据保存在服务器</li><li>cookie 的存储空间有限；session 的存储空间不限</li><li>cookie 只能保存字符串；session 可以保存任何类型的数据</li><li>cookie 中的数据容易被获取；session 中的数据难以获取</li></ol></blockquote><ol start="2"><li>如何消除 session</li></ol><blockquote><p>参考答案：</p><ol><li><p>过期时间</p><p>当客户端长时间没有传递 sessionid 过来时，服务器可以在过期时间之后自动清除 session</p></li><li><p>客户端主动通知</p><p>可以使用 JS 监听客户端页面关闭或其他退出操作，然后通知服务器清除 session</p></li></ol></blockquote>',14),a=[n];function r(l,c,p,_,d,k){return i(),o("div",null,a)}const u=e(t,[["render",r]]);export{h as __pageData,u as default};
