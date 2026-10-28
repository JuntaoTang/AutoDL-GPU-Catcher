# AutoDL 抢卡脚本

**简体中文** | [English](README.en.md)

![Version](https://img.shields.io/badge/version-1.0.0-2563eb)

自动抢开机、按条件创建实例，抢到后弹出系统通知。支持 AutoDL 普通容器实例。

## 安装

1. 在 Chrome / Edge 安装 [Tampermonkey](https://www.tampermonkey.net/)。
2. 点击 [安装脚本](https://raw.githubusercontent.com/JuntaoTang/AutoDL-GPU-Catcher/main/autodl-helper.user.js)，在油猴页面确认安装。
3. 登录 [AutoDL 控制台](https://www.autodl.com/console/instance/list)，刷新页面，点击右下角 **AutoDL 抢卡**。

如果第二步只显示代码：复制全部代码 → 油猴管理面板 → 添加新脚本 → 替换代码 → **Ctrl+S**。已有旧版时直接编辑原条目更新。

没有入口时，按油猴提示开启“允许用户脚本”或“开发者模式”，再刷新。

## 使用

- **抢开机**：选择已有实例，点击启动。无卡模式会先关机，再尝试 GPU 开机。
- **抢新实例**：选择地区、GPU、卡数、筛选条件和镜像，命名后点击启动。每个任务创建一台实例。
- **克隆**：在“抢开机”中选择克隆方式，复制系统盘和数据盘；源实例会先关机。

## 通知与运行

默认开启系统桌面通知，可在 **设置 → 测试提醒** 验证。保持浏览器运行、电脑不休眠；刷新页面后任务会恢复。

点击启动后会自动操作并按平台规则计费。抢到后实例仍会计费；取消任务不会关闭已经创建的实例。

## 致谢

基于 [Fo-OLLL/autodl-card-helper](https://github.com/Fo-OLLL/autodl-card-helper) 修改，感谢原作者提供的实现。
