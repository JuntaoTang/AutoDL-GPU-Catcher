'use strict';
const fs = require('node:fs');
const path = require('node:path');
const root = path.resolve(__dirname, '..');
const { VERSION, NAME } = require('../autodl-helper.user.js');
const escape = s => s.replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;');
/** 生成离线复制页，不加载账号，也不执行嵌入的用户脚本。 */
function renderInstallPage(source) {
  return `<!doctype html>
<html lang="zh-CN"><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>${NAME} v${VERSION} · 本地安装</title>
<style>body{font:16px/1.7 system-ui,'Microsoft YaHei',sans-serif;max-width:900px;margin:36px auto;padding:0 24px;color:#203047;background:#f5f8fc}main{padding:26px;background:white;border:1px solid #dce4ee;border-radius:14px}h1{font-size:25px}button{font:inherit;background:#225bd6;color:white;border:0;border-radius:8px;padding:10px 18px;cursor:pointer}textarea{width:100%;box-sizing:border-box;height:310px;font:12px/1.5 Consolas,monospace;padding:12px;border:1px solid #cbd6e3;border-radius:8px}a{color:#225bd6}.hint{color:#5b6c80}#status{min-height:28px}</style>
<main><h1>${NAME} <small>v${VERSION}</small></h1>
<p>普通容器实例的 GPU 监控与自动开机脚本。此页面仅帮助复制安装代码，不登录账号，也不会创建实例。</p>
<ol><li>点击下方按钮复制完整脚本。</li><li>打开油猴管理面板 → 编辑原脚本，或添加新脚本。</li><li>选中编辑器全部原代码，粘贴，再按 Ctrl+S 保存。</li><li>刷新 AutoDL 页面，核对面板标题版本为 v${VERSION}。</li></ol>
<button id="copy" type="button">复制完整脚本</button><p id="status" role="status"></p>
<textarea id="source" readonly aria-label="完整用户脚本">${escape(source)}</textarea>
<p class="hint">复制失败时点击代码框，再按 Ctrl+A、Ctrl+C。已有“AutoDL 抢卡助手”时请编辑原条目更新，保留任务与设置。</p>
<p>默认仅开启系统桌面通知；安装后可在“设置”中测试提醒。<strong>启动任务会按配置自动操作实例，并产生平台正常计费。</strong></p>
<p><a href="QUICKSTART.zh-CN.md">完整安装、筛选配置与 LIBERO 环境说明</a> · <a href="https://www.autodl.com/console/instance/list" target="_blank" rel="noopener">打开 AutoDL 控制台</a> · <a href="https://www.tampermonkey.net/" target="_blank" rel="noopener">Tampermonkey 官方下载</a></p>
</main><script>
document.getElementById('copy').addEventListener('click', async () => {
 const source = document.getElementById('source'), status = document.getElementById('status');
 try { await navigator.clipboard.writeText(source.value); status.textContent = '已复制完整脚本。请到油猴编辑器粘贴并保存。'; }
 catch { source.focus(); source.select(); status.textContent = '代码已选中，请按 Ctrl+C 复制。'; }
});
</script></html>`;
}

if (require.main === module) {
  const source = fs.readFileSync(path.join(root, 'autodl-helper.user.js'), 'utf8');
  fs.writeFileSync(path.join(root, 'INSTALL.html'), renderInstallPage(source), 'utf8');
  console.log(`Built INSTALL.html · v${VERSION}`);
}

module.exports = { renderInstallPage };
