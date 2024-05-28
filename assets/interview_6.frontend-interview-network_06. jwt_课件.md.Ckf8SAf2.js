import{_ as s,c as i,o as a,a1 as t}from"./chunks/framework.DCKU21so.js";const u=JSON.parse('{"title":"概述","description":"","frontmatter":{},"headers":[],"relativePath":"interview/6.frontend-interview-network/06. jwt/课件.md","filePath":"interview/6.frontend-interview-network/06. jwt/课件.md"}'),n={name:"interview/6.frontend-interview-network/06. jwt/课件.md"},e=t(`<h1 id="概述" tabindex="-1">概述 <a class="header-anchor" href="#概述" aria-label="Permalink to &quot;概述&quot;">​</a></h1><p>回顾登录的流程：</p><img src="http://mdrs.yuanjin.tech/img/image-20200417161950450.png" alt="img" align="left"><p>接下来的问题是：这个出入证（令牌）里面到底存啥？</p><p>一种比较简单的办法就是直接存储用户信息的JSON串，这会造成下面的几个问题：</p><ul><li>非浏览器环境，如何在令牌中记录过期时间</li><li>如何防止令牌被伪造</li></ul><p>JWT就是为了解决这些问题出现的。</p><p>JWT全称<code>Json Web Token</code>，本质就是一个字符串</p><p>它要解决的问题，就是在互联网环境中，提供<strong>统一的、安全的</strong>令牌格式</p><p>因此，jwt只是一个令牌格式而已，你可以把它存储到cookie，也可以存储到localstorage，没有任何限制！</p><p>同样的，对于传输，你可以使用任何传输方式来传输jwt，一般来说，我们会使用消息头来传输它</p><p>比如，当登录成功后，服务器可以给客户端响应一个jwt：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>HTTP/1.1 200 OK</span></span>
<span class="line"><span>...</span></span>
<span class="line"><span>set-cookie:token=jwt令牌</span></span>
<span class="line"><span>authentication:jwt令牌</span></span>
<span class="line"><span>...</span></span>
<span class="line"><span></span></span>
<span class="line"><span>{..., token:jwt令牌}</span></span></code></pre></div><p>可以看到，jwt令牌可以出现在响应的任何一个地方，客户端和服务器自行约定即可。</p><blockquote><p>当然，它也可以出现在响应的多个地方，比如为了充分利用浏览器的cookie，同时为了照顾其他设备，也可以让jwt出现在<code>set-cookie</code>和<code>authorization或body</code>中，尽管这会增加额外的传输量。</p></blockquote><p>当客户端拿到令牌后，它要做的只有一件事：存储它。</p><p>你可以存储到任何位置，比如手机文件、PC文件、localstorage、cookie</p><p>当后续请求发生时，你只需要将它作为请求的一部分发送到服务器即可。</p><p>虽然jwt没有明确要求应该如何附带到请求中，但通常我们会使用如下的格式：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>GET /api/resources HTTP/1.1</span></span>
<span class="line"><span>...</span></span>
<span class="line"><span>authorization: bearer jwt令牌</span></span>
<span class="line"><span>...</span></span></code></pre></div><p>这样一来，服务器就能够收到这个令牌了，通过对令牌的验证，即可知道该令牌是否有效。</p><p>它们的完整交互流程是非常简单清晰的</p><p><img src="http://mdrs.yuanjin.tech/img/image-20200422172837190.png" alt="image-20200422172837190"></p><h1 id="令牌的组成" tabindex="-1">令牌的组成 <a class="header-anchor" href="#令牌的组成" aria-label="Permalink to &quot;令牌的组成&quot;">​</a></h1><p>为了保证令牌的安全性，jwt令牌由三个部分组成，分别是：</p><ol><li>header：令牌头部，记录了整个令牌的类型和签名算法</li><li>payload：令牌负荷，记录了保存的主体信息，比如你要保存的用户信息就可以放到这里</li><li>signature：令牌签名，按照头部固定的签名算法对整个令牌进行签名，该签名的作用是：保证令牌不被伪造和篡改</li></ol><p>它们组合而成的完整格式是：<code>header.payload.signature</code></p><p>比如，一个完整的jwt令牌如下：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJmb28iOiJiYXIiLCJpYXQiOjE1ODc1NDgyMTV9.BCwUy3jnUQ_E6TqCayc7rCHkx-vxxdagUwPOWqwYCFc</span></span></code></pre></div><p>它各个部分的值分别是：</p><ul><li><code>header：eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9</code></li><li><code>payload：eyJmb28iOiJiYXIiLCJpYXQiOjE1ODc1NDgyMTV9</code></li><li><code>signature: BCwUy3jnUQ_E6TqCayc7rCHkx-vxxdagUwPOWqwYCFc</code></li></ul><p>下面分别对每个部分进行说明</p><h2 id="header" tabindex="-1">header <a class="header-anchor" href="#header" aria-label="Permalink to &quot;header&quot;">​</a></h2><p>它是令牌头部，记录了整个令牌的类型和签名算法</p><p>它的格式是一个<code>json</code>对象，如下：</p><div class="language-json vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">json</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">{</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">  &quot;alg&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">:</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;HS256&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">,</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">  &quot;typ&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">:</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;JWT&quot;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">}</span></span></code></pre></div><p>该对象记录了：</p><ul><li>alg：signature部分使用的签名算法，通常可以取两个值 <ul><li>HS256：一种对称加密算法，使用同一个秘钥对signature加密解密</li><li>RS256：一种非对称加密算法，使用私钥签名，公钥验证</li></ul></li><li>typ：整个令牌的类型，固定写<code>JWT</code>即可</li></ul><p>设置好了<code>header</code>之后，就可以生成<code>header</code>部分了</p><p>具体的生成方式及其简单，就是把<code>header</code>部分使用<code>base64 url</code>编码即可</p><blockquote><p><code>base64 url</code>不是一个加密算法，而是一种编码方式，它是在<code>base64</code>算法的基础上对<code>+</code>、<code>=</code>、<code>/</code>三个字符做出特殊处理的算法</p><p>而<code>base64</code>是使用64个可打印字符来表示一个二进制数据，具体的做法参考<a href="https://baike.baidu.com/item/base64/8545775?fr=aladdin" target="_blank" rel="noreferrer">百度百科</a></p></blockquote><p>浏览器提供了<code>btoa</code>函数，可以完成这个操作：</p><div class="language-js vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">window.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">btoa</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">JSON</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">stringify</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">({</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">  &quot;alg&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">:</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;HS256&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">,</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">  &quot;typ&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">:</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;JWT&quot;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">}))</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">// 得到字符串：eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9</span></span></code></pre></div><p>同样的，浏览器也提供了<code>atob</code>函数，可以对其进行解码：</p><div class="language-js vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">window.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">atob</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">)</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">// 得到字符串：{&quot;alg&quot;:&quot;HS256&quot;,&quot;typ&quot;:&quot;JWT&quot;}</span></span></code></pre></div><blockquote><p>nodejs中没有提供这两个函数，可以安装第三方库<code>atob</code>和<code>bota</code>搞定</p><p>或者，手动搞定</p></blockquote><h2 id="payload" tabindex="-1">payload <a class="header-anchor" href="#payload" aria-label="Permalink to &quot;payload&quot;">​</a></h2><p>这部分是jwt的主体信息，它仍然是一个JSON对象，它可以包含以下内容：</p><div class="language-json vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">json</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">{</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">  &quot;ss&quot;</span><span style="--shiki-light:#B31D28;--shiki-dark:#FDAEB7;--shiki-light-font-style:italic;--shiki-dark-font-style:italic;">：</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">&quot;发行者&quot;</span><span style="--shiki-light:#B31D28;--shiki-dark:#FDAEB7;--shiki-light-font-style:italic;--shiki-dark-font-style:italic;">,</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">  &quot;iat&quot;</span><span style="--shiki-light:#B31D28;--shiki-dark:#FDAEB7;--shiki-light-font-style:italic;--shiki-dark-font-style:italic;">：</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">&quot;发布时间&quot;</span><span style="--shiki-light:#B31D28;--shiki-dark:#FDAEB7;--shiki-light-font-style:italic;--shiki-dark-font-style:italic;">,</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">  &quot;exp&quot;</span><span style="--shiki-light:#B31D28;--shiki-dark:#FDAEB7;--shiki-light-font-style:italic;--shiki-dark-font-style:italic;">：</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">&quot;到期时间&quot;</span><span style="--shiki-light:#B31D28;--shiki-dark:#FDAEB7;--shiki-light-font-style:italic;--shiki-dark-font-style:italic;">,</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">  &quot;sub&quot;</span><span style="--shiki-light:#B31D28;--shiki-dark:#FDAEB7;--shiki-light-font-style:italic;--shiki-dark-font-style:italic;">：</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">&quot;主题&quot;</span><span style="--shiki-light:#B31D28;--shiki-dark:#FDAEB7;--shiki-light-font-style:italic;--shiki-dark-font-style:italic;">,</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">  &quot;aud&quot;</span><span style="--shiki-light:#B31D28;--shiki-dark:#FDAEB7;--shiki-light-font-style:italic;--shiki-dark-font-style:italic;">：</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">&quot;听众&quot;</span><span style="--shiki-light:#B31D28;--shiki-dark:#FDAEB7;--shiki-light-font-style:italic;--shiki-dark-font-style:italic;">,</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">  &quot;nbf&quot;</span><span style="--shiki-light:#B31D28;--shiki-dark:#FDAEB7;--shiki-light-font-style:italic;--shiki-dark-font-style:italic;">：</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">&quot;在此之前不可用&quot;</span><span style="--shiki-light:#B31D28;--shiki-dark:#FDAEB7;--shiki-light-font-style:italic;--shiki-dark-font-style:italic;">,</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">  &quot;jti&quot;</span><span style="--shiki-light:#B31D28;--shiki-dark:#FDAEB7;--shiki-light-font-style:italic;--shiki-dark-font-style:italic;">：</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">&quot;JWT ID&quot;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">}</span></span></code></pre></div><p>以上属性可以全写，也可以一个都不写，它只是一个规范，就算写了，也需要你在将来验证这个jwt令牌时手动处理才能发挥作用</p><p>上述属性表达的含义分别是：</p><ul><li>ss：发行该jwt的是谁，可以写公司名字，也可以写服务名称</li><li>iat：该jwt的发放时间，通常写当前时间的时间戳</li><li>exp：该jwt的到期时间，通常写时间戳</li><li>sub：该jwt是用于干嘛的</li><li>aud：该jwt是发放给哪个终端的，可以是终端类型，也可以是用户名称，随意一点</li><li>nbf：一个时间点，在该时间点到达之前，这个令牌是不可用的</li><li>jti：jwt的唯一编号，设置此项的目的，主要是为了防止重放攻击（重放攻击是在某些场景下，用户使用之前的令牌发送到服务器，被服务器正确的识别，从而导致不可预期的行为发生）</li></ul><p>可是到现在，看了半天，没有出现我想要写入的数据啊😂</p><p>当用户登陆成功之后，我可能需要把用户的一些信息写入到jwt令牌中，比如用户id、账号等等（密码就算了😳）</p><p>其实很简单，payload这一部分只是一个json对象而已，你可以向对象中加入任何想要加入的信息</p><p>比如，下面的json对象仍然是一个有效的payload</p><div class="language-json vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">json</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">{</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">  &quot;foo&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">:</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;bar&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">,</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">  &quot;iat&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">:</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">1587548215</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">}</span></span></code></pre></div><p><code>foo: bar</code>是我们自定义的信息，<code>iat: 1587548215</code>是jwt规范中的信息</p><p>最终，payload部分和header一样，需要通过<code>base64 url</code>编码得到：</p><div class="language-js vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">window.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">btoa</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">JSON</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">stringify</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">({</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">  &quot;foo&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">:</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;bar&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">,</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">  &quot;iat&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">:</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">1587548215</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">}))</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">// 得到字符串：eyJmb28iOiJiYXIiLCJpYXQiOjE1ODc1NDgyMTV9</span></span></code></pre></div><h2 id="signature" tabindex="-1">signature <a class="header-anchor" href="#signature" aria-label="Permalink to &quot;signature&quot;">​</a></h2><p>这一部分是jwt的签名，正是它的存在，保证了整个jwt不被篡改</p><p>这部分的生成，是对前面两个部分的编码结果，按照头部指定的方式进行加密</p><p>比如：头部指定的加密方法是<code>HS256</code>，前面两部分的编码结果是<code>eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJmb28iOiJiYXIiLCJpYXQiOjE1ODc1NDgyMTV9</code></p><p>则第三部分就是用对称加密算法<code>HS256</code>对字符串<code>eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJmb28iOiJiYXIiLCJpYXQiOjE1ODc1NDgyMTV9</code>进行加密，当然你得指定一个秘钥，比如<code>shhhhh</code></p><div class="language-js vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">HS256</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">\`eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJmb28iOiJiYXIiLCJpYXQiOjE1ODc1NDgyMTV9\`</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;shhhhh&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">)</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">// 得到：BCwUy3jnUQ_E6TqCayc7rCHkx-vxxdagUwPOWqwYCFc</span></span></code></pre></div><p>最终，将三部分组合在一起，就得到了完整的jwt</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJmb28iOiJiYXIiLCJpYXQiOjE1ODc1NDgyMTV9.BCwUy3jnUQ_E6TqCayc7rCHkx-vxxdagUwPOWqwYCFc</span></span></code></pre></div><p>由于签名使用的秘钥保存在服务器，这样一来，客户端就无法伪造出签名，因为它拿不到秘钥。</p><p>换句话说，之所以说无法伪造jwt，就是因为第三部分的存在。</p><p>而前面两部分并没有加密，只是一个编码结果而已，可以认为几乎是明文传输</p><blockquote><p>这不会造成太大的问题，因为既然用户登陆成功了，它当然有权力查看自己的用户信息</p><p>甚至在某些网站，用户的基本信息可以被任何人查看</p><p>你要保证的，是不要把敏感的信息存放到jwt中，比如密码</p></blockquote><p>jwt的<code>signature</code>可以保证令牌不被伪造，那如何保证令牌不被篡改呢？</p><p>比如，某个用户登陆成功了，获得了jwt，但他人为的篡改了<code>payload</code>，比如把自己的账户余额修改为原来的两倍，然后重新编码出<code>payload</code>发送到服务器，服务器如何得知这些信息被篡改过了呢？</p><p>这就要说到令牌的验证了</p><h1 id="令牌的验证" tabindex="-1">令牌的验证 <a class="header-anchor" href="#令牌的验证" aria-label="Permalink to &quot;令牌的验证&quot;">​</a></h1><p><img src="http://mdrs.yuanjin.tech/img/image-20200422172837190.png" alt="image-20200422172837190"></p><p>令牌在服务器组装完成后，会以任意的方式发送到客户端</p><p>客户端会把令牌保存起来，后续的请求会将令牌发送给服务器</p><p>而服务器需要验证令牌是否正确，如何验证呢？</p><p>首先，服务器要验证这个令牌是否被篡改过，验证方式非常简单，就是对<code>header+payload</code>用同样的秘钥和加密算法进行重新加密</p><p>然后把加密的结果和传入jwt的<code>signature</code>进行对比，如果完全相同，则表示前面两部分没有动过，就是自己颁发的，如果不同，肯定是被篡改过了。</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>传入的header.传入的payload.传入的signature</span></span>
<span class="line"><span>新的signature = header中的加密算法(传入的header.传入的payload, 秘钥)</span></span>
<span class="line"><span>验证：新的signature == 传入的signature</span></span></code></pre></div><p>当令牌验证为没有被篡改后，服务器可以进行其他验证：比如是否过期、听众是否满足要求等等，这些就视情况而定了</p><p>注意：这些验证都需要服务器手动完成，没有哪个服务器会给你进行自动验证，当然，你可以借助第三方库来完成这些操作</p><h1 id="总结" tabindex="-1">总结 <a class="header-anchor" href="#总结" aria-label="Permalink to &quot;总结&quot;">​</a></h1><p>最后，总结一下jwt的特点：</p><ul><li>jwt本质上是一种令牌格式。它和终端设备无关，同样和服务器无关，甚至与如何传输无关，它只是规范了令牌的格式而已</li><li>jwt由三部分组成：header、payload、signature。主体信息在payload</li><li>jwt难以被篡改和伪造。这是因为有第三部分的签名存在。</li></ul><h1 id="面试题" tabindex="-1">面试题 <a class="header-anchor" href="#面试题" aria-label="Permalink to &quot;面试题&quot;">​</a></h1><p>请阐述JWT的令牌格式</p><blockquote><p>参考答案：</p><p>token 分为三段，分别是 header、payload、signature</p><p>其中，header 标识签名算法和令牌类型；payload 标识主体信息，包含令牌过期时间、发布时间、发行者、主体内容等；signature 是使用特定的算法对前面两部分进行加密，得到的加密结果。</p><p>token 有防篡改的特点，如果攻击者改动了前面两个部分，就会导致和第三部分对应不上，使得 token 失效。而攻击者不知道加密秘钥，因此又无法修改第三部分的值。</p><p>所以，在秘钥不被泄露的前提下，一个验证通过的 token 是值得被信任的。</p></blockquote>`,91),p=[e];function l(h,o,k,d,c,r){return a(),i("div",null,p)}const y=s(n,[["render",l]]);export{u as __pageData,y as default};
