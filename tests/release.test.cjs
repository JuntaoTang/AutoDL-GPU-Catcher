'use strict';
const { test } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const { VERSION, NAME, DEFAULT_SETTINGS, fresh } = require('../autodl-helper.user.js');
const { renderInstallPage } = require('../scripts/build-install-page.cjs');
const root = path.resolve(__dirname, '..');
const read = name => fs.readFileSync(path.join(root, name), 'utf8');

test('发布版本在脚本头、运行时、包信息和文档中一致', () => {
  const source = read('autodl-helper.user.js');
  assert.equal(source.match(/^\/\/ @version\s+(\S+)$/m)[1], VERSION);
  assert.equal(JSON.parse(read('package.json')).version, VERSION);
  assert.ok(read('README.md').includes(`version-${VERSION}-`));
  assert.ok(read('QUICKSTART.zh-CN.md').includes(`v${VERSION}`));
  assert.ok(read('CHANGELOG.md').includes(`## ${VERSION}`));
});

test('发布名称一致，沿用旧版命名空间、存储和默认通知', () => {
  const source = read('autodl-helper.user.js');
  assert.equal(source.match(/^\/\/ @name\s+(.+)$/m)[1].trim(), NAME);
  assert.equal(source.match(/^\/\/ @namespace\s+(\S+)$/m)[1], 'autodl-card-helper');
  assert.ok(source.includes("const KEY = 'autodl-helper-v1'"));
  assert.equal(fresh().version, 1);
  assert.deepEqual(DEFAULT_SETTINGS, { intervalSeconds: 10, sound: false, desktop: true, serverChan: false, sendKey: '' });
  const first = fresh(), second = fresh();
  first.settings.desktop = false; first.tasks.push({ id: 'local' });
  assert.equal(second.settings.desktop, true); assert.equal(second.tasks.length, 0);
});

test('安装页嵌入当前完整源码，生成文件与生成器结果一致', () => {
  const source = read('autodl-helper.user.js');
  const expected = renderInstallPage(source);
  assert.equal(read('INSTALL.html'), expected, '源码修改后请运行 npm run build:install');
  assert.ok(expected.includes(`v${VERSION}`));
  assert.ok(expected.includes(source.replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;')));
});
