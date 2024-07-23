import{_ as e,c as a,o as s,a2 as t}from"./chunks/framework.Bek_Mmwg.js";const k=JSON.parse('{"title":"","description":"","frontmatter":{},"headers":[],"relativePath":"网络请求/本地域名映射.md","filePath":"网络请求/本地域名映射.md"}'),p={name:"网络请求/本地域名映射.md"},i=t('<h2 id="本地域名映射" tabindex="-1">本地域名映射 <a class="header-anchor" href="#本地域名映射" aria-label="Permalink to &quot;本地域名映射&quot;">​</a></h2><p>举例：将 <code>pre-pay.9longe.net</code> 映射到本地ip <code>127.0.0.1</code> 。</p><p>实现</p><ol><li>修改 /private/ect/hosts 文件（直接访达前往）</li></ol><p>添加以下记录</p><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">127.0.0.1</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> pre-pay.9longe.net</span></span></code></pre></div><p>2.测试是否修改成功</p><p>在终端输入</p><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">ping</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> pre-pay.9longe.net</span></span></code></pre></div><p>若看到请求IP为 <code>127.0.0.1</code> 即为成功。</p><p>注意事项： 启动服务时用默认端口80，这样访问域名就无需加端口后缀</p><p>不可用https，否则请求不到本地（用http或不加协议都可正常请求）</p><p>谷歌浏览器访问，请求到线上而不是本地（解决，重启浏览器，或换其他浏览器）</p>',13),n=[i];function o(l,c,h,d,r,_){return s(),a("div",null,n)}const u=e(p,[["render",o]]);export{k as __pageData,u as default};
