# AutoDL GPU Catcher

[简体中文](README.md) | **English**

![Version](https://img.shields.io/badge/version-1.0.0-2563eb)

A userscript that starts existing GPU instances or creates new ones when resources become available, then sends a desktop notification. Supports AutoDL standard container instances.

## Installation

1. Install [Tampermonkey](https://www.tampermonkey.net/) in Chrome or Edge.
2. Click [Install userscript](https://raw.githubusercontent.com/JuntaoTang/AutoDL-GPU-Catcher/main/autodl-helper.user.js) and confirm installation in Tampermonkey.
3. Sign in to the [AutoDL console](https://www.autodl.com/console/instance/list), refresh the page, and click **AutoDL 抢卡** in the bottom-right corner.

If step 2 only shows source code, copy all of it, open the Tampermonkey dashboard, create a new script, replace the default code, and press **Ctrl+S**. To update an existing installation, edit its original entry.

If the button does not appear, enable **Allow user scripts** or **Developer mode** as prompted by Tampermonkey, then refresh the page.

## Usage

- **Start an existing instance (抢开机):** Select your instances and start the task. Instances running without a GPU are shut down before attempting GPU startup.
- **Create a new instance (抢新实例):** Choose regions, GPU models, GPU count, filters, and an image. Name and start the task. Each task creates one instance.
- **Clone an instance (克隆):** Select the clone option under 抢开机 to copy the system and data disks. The source instance is shut down first.

## Notifications and runtime

Desktop notifications are enabled by default. Use **设置 → 测试提醒** to test them. Keep the browser running and the computer awake. Tasks resume after refreshing the page.

Starting a task authorizes automatic instance operations and normal platform charges. Instances continue to incur charges after a task succeeds. Cancelling a task does not shut down an instance that has already been created.

## Acknowledgements

Based on [Fo-OLLL/autodl-card-helper](https://github.com/Fo-OLLL/autodl-card-helper). Thanks to the original author for the implementation.
