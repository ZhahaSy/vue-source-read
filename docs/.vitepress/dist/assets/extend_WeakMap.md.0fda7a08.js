import{_ as s,c as a,o as n,a as e}from"./app.44048077.js";const A=JSON.parse('{"title":"WeakMap","description":"","frontmatter":{},"headers":[{"level":3,"title":"what","slug":"what","link":"#what","children":[]},{"level":3,"title":"\u6CE8\u610F","slug":"\u6CE8\u610F","link":"#\u6CE8\u610F","children":[]},{"level":2,"title":"Why WeakMap?","slug":"why-weakmap","link":"#why-weakmap","children":[]},{"level":2,"title":"Where","slug":"where","link":"#where","children":[]},{"level":2,"title":"\u5EF6\u4F38\u4E00\u4E0B","slug":"\u5EF6\u4F38\u4E00\u4E0B","link":"#\u5EF6\u4F38\u4E00\u4E0B","children":[]}],"relativePath":"extend/WeakMap.md"}'),l={name:"extend/WeakMap.md"},p=e(`<h1 id="weakmap" tabindex="-1"><a href="https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/WeakMap" target="_blank" rel="noreferrer">WeakMap</a> <a class="header-anchor" href="#weakmap" aria-hidden="true">#</a></h1><h3 id="what" tabindex="-1">what <a class="header-anchor" href="#what" aria-hidden="true">#</a></h3><blockquote><p>WeakMap \u5BF9\u8C61\u662F\u4E00\u7EC4\u952E/\u503C\u5BF9\u7684\u96C6\u5408\uFF0C\u5176\u4E2D\u7684\u952E\u662F<b>\u5F31\u5F15\u7528</b>\u7684\u3002\u5176\u952E\u5FC5\u987B\u662F\u5BF9\u8C61\uFF0C\u800C\u503C\u53EF\u4EE5\u662F\u4EFB\u610F\u7684\u3002</p></blockquote><h3 id="\u6CE8\u610F" tabindex="-1">\u6CE8\u610F <a class="header-anchor" href="#\u6CE8\u610F" aria-hidden="true">#</a></h3><blockquote><p>WeakMap \u7684 key <strong>\u53EA\u80FD\u662F Object \u7C7B\u578B</strong>\u3002 \u539F\u59CB\u6570\u636E\u7C7B\u578B \u662F\u4E0D\u80FD\u4F5C\u4E3A key \u7684\uFF08\u6BD4\u5982 Symbol\uFF09\u3002</p></blockquote><h2 id="why-weakmap" tabindex="-1">Why WeakMap? <a class="header-anchor" href="#why-weakmap" aria-hidden="true">#</a></h2><p>\u9009\u62E9 WeakMap \u6700\u5173\u952E\u7684\u539F\u56E0\u5C31\u662F \u56E0\u4E3A\u5B83\u7684\u952E\u662F \u5F31\u5F15\u7528\u7684\u3002\u7B49\u5230 \u4ED6\u7684\u8868\u8FBE\u5F0F\u88AB\u6267\u884C\u5B8C\u540E\uFF0C\u4F1A\u88AB\u5783\u573E\u56DE\u6536\u6389\u3002</p><p>\u6839\u636E\u8FD9\u4E2A\u7279\u6027\u53EF\u77E5\uFF0C\u4E00\u65E6key \u88AB\u5783\u573E\u56DE\u6536\u5668\u56DE\u6536\uFF0C\u90A3\u4E48\u5BF9\u5E94\u7684\u952E\u548C\u503C\u5C31\u8BBF\u95EE\u4E0D\u5230\u4E86\u3002</p><h2 id="where" tabindex="-1">Where <a class="header-anchor" href="#where" aria-hidden="true">#</a></h2><p>WeakMap\u7ECF\u5E38\u7528\u4E8E\u5B58\u50A8\u90A3\u4E9B\u53EA\u6709\u5F53key\u6240\u5F15\u7528\u7684\u5BF9\u8C61\u5B58\u5728\u65F6\uFF08\u6CA1\u6709\u88AB\u56DE\u6536\uFF09\u624D\u6709\u4EF7\u503C\u7684\u4FE1\u606F\u3002\u4F8B\u5982\u6211\u4EEC\u4E4B\u524D\u7684\u4F8B\u5B50\uFF0C\u5982\u679Ctarget\u5BF9\u8C61\u6CA1\u6709\u4EFB\u4F55\u5F15\u7528\u4E86\uFF0C\u8BF4\u660E\u7528\u6237\u4FA7\u662F\u4E0D\u9700\u8981\u7684\uFF0C\u5C31\u4F1A\u8FDB\u884C\u5783\u573E\u56DE\u6536\u3002 \u4F46\u662F\u4F7F\u7528Map\u5C31\u7B97\u6CA1\u6709\u5F15\u7528\uFF0C\u4E5F\u4E0D\u4F1A\u56DE\u6536\uFF0C\u6700\u7EC8\u53EF\u80FD\u4F1A\u5BFC\u81F4\u5185\u5B58\u6EA2\u51FA</p><div class="language-JavaScript"><button class="copy"></button><span class="lang">JavaScript</span><pre><code><span class="line"><span style="color:#676E95;">// \u4E3E\u4E2A\u{1F330}</span></span>
<span class="line"><span style="color:#C792EA;">const</span><span style="color:#A6ACCD;"> map </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">new</span><span style="color:#A6ACCD;"> </span><span style="color:#82AAFF;">Map</span><span style="color:#A6ACCD;">()</span><span style="color:#89DDFF;">;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#C792EA;">const</span><span style="color:#A6ACCD;"> weakMap </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">new</span><span style="color:#A6ACCD;"> </span><span style="color:#82AAFF;">WeakMap</span><span style="color:#A6ACCD;">()</span><span style="color:#89DDFF;">;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#A6ACCD;">(</span><span style="color:#C792EA;">function</span><span style="color:#89DDFF;">()</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#F07178;">    </span><span style="color:#C792EA;">const</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;">foo</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">=</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">{</span><span style="color:#F07178;"> foo</span><span style="color:#89DDFF;">:</span><span style="color:#F07178;"> </span><span style="color:#F78C6C;">1</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">};</span></span>
<span class="line"><span style="color:#F07178;">    </span><span style="color:#C792EA;">const</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;">bar</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">=</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">{</span><span style="color:#F07178;">bar</span><span style="color:#89DDFF;">:</span><span style="color:#F07178;"> </span><span style="color:#F78C6C;">1</span><span style="color:#89DDFF;">};</span></span>
<span class="line"><span style="color:#F07178;">    </span><span style="color:#A6ACCD;">map</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">set</span><span style="color:#F07178;">(</span><span style="color:#A6ACCD;">foo</span><span style="color:#89DDFF;">,</span><span style="color:#F07178;"> </span><span style="color:#F78C6C;">1</span><span style="color:#F07178;">)</span></span>
<span class="line"><span style="color:#F07178;">    </span><span style="color:#A6ACCD;">weakMap</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">set</span><span style="color:#F07178;">(</span><span style="color:#A6ACCD;">bar</span><span style="color:#89DDFF;">,</span><span style="color:#F07178;"> </span><span style="color:#F78C6C;">1</span><span style="color:#F07178;">)</span></span>
<span class="line"><span style="color:#89DDFF;">}</span><span style="color:#A6ACCD;">)()</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#A6ACCD;">console</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">log</span><span style="color:#A6ACCD;">(map</span><span style="color:#89DDFF;">.</span><span style="color:#A6ACCD;">size)</span><span style="color:#89DDFF;">;</span><span style="color:#A6ACCD;"> </span><span style="color:#676E95;">// 1</span></span>
<span class="line"><span style="color:#A6ACCD;">console</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">log</span><span style="color:#A6ACCD;">(weakMap</span><span style="color:#89DDFF;">.</span><span style="color:#A6ACCD;">size)</span><span style="color:#89DDFF;">;</span><span style="color:#A6ACCD;"> </span><span style="color:#676E95;">// undefined</span></span>
<span class="line"></span></code></pre></div><h2 id="\u5EF6\u4F38\u4E00\u4E0B" tabindex="-1">\u5EF6\u4F38\u4E00\u4E0B <a class="header-anchor" href="#\u5EF6\u4F38\u4E00\u4E0B" aria-hidden="true">#</a></h2><h4 id="js-\u5783\u573E\u56DE\u6536\u673A\u5236" tabindex="-1">js <a href="https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Memory_Management#garbage_collection" target="_blank" rel="noreferrer">\u5783\u573E\u56DE\u6536\u673A\u5236</a> <a class="header-anchor" href="#js-\u5783\u573E\u56DE\u6536\u673A\u5236" aria-hidden="true">#</a></h4>`,13),o=[p];function r(t,c,y,F,D,i){return n(),a("div",null,o)}const C=s(l,[["render",r]]);export{A as __pageData,C as default};