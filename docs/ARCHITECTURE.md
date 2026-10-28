# 代码说明

主程序是 `autodl-helper.user.js`，直接安装到油猴。文件内依次放置数据处理、主机筛选、API、任务引擎和浏览器界面；浏览器入口前的代码可在 Node 中测试。

## 任务流程

读取实例 → 筛选硬件 → 查询折后报价并匹配价格区间 → 保存创建意图 → 提交请求 → 查询实例状态 → 成功通知。

`Engine` 处理任务推进。创建结果由 `recordCreation()` 保存；取消后由 `reconcileCancelled()` 只读核对；异常由 `handleError()` 记录并退避重试。

- 任务状态为 `active`、`success`、`cancelled`。
- `intent` 表示创建结果待确认，`instanceUuid` 表示已知目标实例。
- 存储键 `autodl-helper-v1` 和数据格式 `version: 1` 保持不变，升级沿用已有任务。
- 磁盘、内存以字节处理；界面 GB 按 `1024 ** 3` 换算。
- 报价取 `/api/v1/order/price/preview` 的最终 instance 折扣记录；GPU 小时总费除以卡数用于区间匹配，磁盘日费单列，金额单位为千分之一元。

## 发布

同步脚本头、运行时 `VERSION`、`package.json` 和文档版本，运行 `npm run build:install` 生成安装页，再执行语法检查、业务测试和浏览器测试。

安装页只提供代码复制，不执行内嵌脚本。浏览器测试使用模拟接口。
