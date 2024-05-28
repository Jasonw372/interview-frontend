import{_ as i,c as s,o as e,a1 as p}from"./chunks/framework.DCKU21so.js";const m=JSON.parse('{"title":"","description":"","frontmatter":{},"headers":[],"relativePath":"interview/8.frontend-interview-vue/05. diff/课件/笔记.md","filePath":"interview/8.frontend-interview-vue/05. diff/课件/笔记.md"}'),n={name:"interview/8.frontend-interview-vue/05. diff/课件/笔记.md"},t=p(`<blockquote><p>面试题：请阐述vue的diff算法</p><p>参考回答：</p><p>当组件创建和更新时，vue均会执行内部的update函数，该函数使用render函数生成的虚拟dom树，将新旧两树进行对比，找到差异点，最终更新到真实dom</p><p>对比差异的过程叫diff，vue在内部通过一个叫patch的函数完成该过程</p><p>在对比时，vue采用深度优先、同层比较的方式进行比对。</p><p>在判断两个节点是否相同时，vue是通过虚拟节点的key和tag来进行判断的</p><p>具体来说，首先对根节点进行对比，如果相同则将旧节点关联的真实dom的引用挂到新节点上，然后根据需要更新属性到真实dom，然后再对比其子节点数组；如果不相同，则按照新节点的信息递归创建所有真实dom，同时挂到对应虚拟节点上，然后移除掉旧的dom。</p><p>在对比其子节点数组时，vue对每个子节点数组使用了两个指针，分别指向头尾，然后不断向中间靠拢来进行对比，这样做的目的是尽量复用真实dom，尽量少的销毁和创建真实dom。如果发现相同，则进入和根节点一样的对比流程，如果发现不同，则移动真实dom到合适的位置。</p><p>这样一直递归的遍历下去，直到整棵树完成对比。</p></blockquote><ol><li><p><code>diff</code>的时机</p><p>当组件创建时，以及依赖的属性或数据变化时，会运行一个函数，该函数会做两件事：</p><ul><li>运行<code>_render</code>生成一棵新的虚拟dom树（vnode tree）</li><li>运行<code>_update</code>，传入虚拟dom树的根节点，对新旧两棵树进行对比，最终完成对真实dom的更新</li></ul><p>核心代码如下：</p><div class="language-js vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">// vue构造函数</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">function</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> Vue</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(){</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">  // ... 其他代码</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">  var</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> updateComponent</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> =</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> () </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=&gt;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> {</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">    this</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">_update</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">this</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">_render</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">())</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  }</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">  new</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> Watcher</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(updateComponent);</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">  // ... 其他代码</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">}</span></span></code></pre></div><p><code>diff</code>就发生在<code>_update</code>函数的运行过程中</p></li><li><p><code>_update</code>函数在干什么</p><p><code>_update</code>函数接收到一个<code>vnode</code>参数，这就是<strong>新</strong>生成的虚拟dom树</p><p>同时，<code>_update</code>函数通过当前组件的<code>_vnode</code>属性，拿到<strong>旧</strong>的虚拟dom树</p><p><code>_update</code>函数首先会给组件的<code>_vnode</code>属性重新赋值，让它指向新树</p><img src="http://mdrs.yuanjin.tech/img/20210301193804.png" alt="image-20210301193804498" style="zoom:50%;"><p>然后会判断旧树是否存在：</p><ul><li><p>不存在：说明这是第一次加载组件，于是通过内部的<code>patch</code>函数，直接遍历新树，为每个节点生成真实DOM，挂载到每个节点的<code>elm</code>属性上</p><img src="http://mdrs.yuanjin.tech/img/20210301194237.png" alt="image-20210301194237825" style="zoom:43%;"></li><li><p>存在：说明之前已经渲染过该组件，于是通过内部的<code>patch</code>函数，对新旧两棵树进行对比，以达到下面两个目标：</p><ul><li>完成对所有真实dom的最小化处理</li><li>让新树的节点对应合适的真实dom</li></ul><img src="http://mdrs.yuanjin.tech/img/20210301195003.png" alt="image-20210301195003696" style="zoom:50%;"></li></ul></li><li><p><code>patch</code>函数的对比流程</p><p><strong>术语解释</strong>：</p><ol><li>「<strong>相同</strong>」：是指两个虚拟节点的标签类型、<code>key</code>值均相同，但<code>input</code>元素还要看<code>type</code>属性</li><li>「<strong>新建元素</strong>」：是指根据一个虚拟节点提供的信息，创建一个真实dom元素，同时挂载到虚拟节点的<code>elm</code>属性上</li><li>「<strong>销毁元素</strong>」：是指：<code>vnode.elm.remove()</code></li><li>「<strong>更新</strong>」：是指对两个虚拟节点进行对比更新，它<strong>仅发生</strong>在两个虚拟节点「相同」的情况下。具体过程稍后描述。</li><li>「<strong>对比子节点</strong>」：是指对两个虚拟节点的子节点进行对比，具体过程稍后描述</li></ol><p><strong>详细流程：</strong></p><ol><li><p><strong>根节点比较</strong></p><img src="http://mdrs.yuanjin.tech/img/20210301203350.png" alt="image-20210301203350246" style="zoom:50%;"><p><code>patch</code>函数首先对根节点进行比较</p><p>如果两个节点：</p><ul><li><p>「相同」，进入**「更新」流程**</p><ol><li><p>将旧节点的真实dom赋值到新节点：<code>newVnode.elm = oldVnode.elm</code></p></li><li><p>对比新节点和旧节点的属性，有变化的更新到真实dom中</p></li><li><p>当前两个节点处理完毕，开始**「对比子节点」**</p></li></ol></li><li><p>不「相同」</p><ol><li>新节点<strong>递归</strong>「新建元素」</li><li>旧节点「销毁元素」</li></ol></li></ul></li><li><p><strong>「对比子节点」</strong></p><p>在「对比子节点」时，vue一切的出发点，都是为了：</p><ul><li>尽量啥也别做</li><li>不行的话，尽量仅改动元素属性</li><li>还不行的话，尽量移动元素，而不是删除和创建元素</li><li>还不行的话，删除和创建元素</li></ul></li></ol></li></ol>`,2),l=[t];function a(o,d,h,r,c,k){return e(),s("div",null,l)}const u=i(n,[["render",a]]);export{m as __pageData,u as default};
