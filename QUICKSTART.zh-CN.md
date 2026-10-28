# 安装、双卡配置与 LIBERO 环境指南

版本：1.0.0。项目仓库：[AutoDL-GPU-Catcher](https://github.com/JuntaoTang/AutoDL-GPU-Catcher)。已有旧版时，在油猴中更新原脚本即可保留任务与设置。

## 安装

1. 用 Edge 打开本文件同目录的 `INSTALL.html`，点击“复制完整脚本”；若复制失败，点击代码框后 Ctrl+A、Ctrl+C。
2. 如果没有 Tampermonkey，请从 [Tampermonkey 官方下载入口](https://www.tampermonkey.net/) 选择 Microsoft Edge 安装。
3. 点击浏览器工具栏的油猴图标 → 管理面板。已有“AutoDL 抢卡脚本”或旧名“AutoDL 抢卡助手”时，点开原条目的编辑器；没有则点“添加新脚本/＋”。
4. 在代码编辑区 Ctrl+A，粘贴完整源码，再 Ctrl+S。更新原脚本能保留油猴存储的任务，不要同时启用两份。
5. 打开或刷新 [AutoDL 实例列表](https://www.autodl.com/console/instance/list)。网址末尾的 `_random_` 参数不影响脚本匹配。
6. 页面右下角应出现“AutoDL 抢卡”，打开后标题应为 `AutoDL 抢卡脚本 v1.0.0`。如果浏览器或油猴提示需要开启用户脚本权限，按其提示手动开启并刷新。

当前使用手动更新，避免远程其他版本覆盖本地源码。无需提供开发者 Token，也无需把登录 Token 发给任何人。

## 分别创建两个独立任务

在“抢新实例”配置，每个任务创建一台实例。先添加 5090 任务，再返回“抢新实例”改为 4090 任务。创建按钮会立即启动监控，符合条件即可创建付费实例。

| 配置项 | 5090 任务 | 4090 任务 |
| --- | --- | --- |
| GPU | 仅选择精确的 RTX 5090 | 仅选择精确的 RTX 4090 |
| 每个实例 GPU 数量 | 2 | 2 |
| 实例 CPU 至少 | 0，不额外限制 | 25 核 |
| 每卡 CPU 至少 | 0 | 0，见下方口径说明 |
| 折后单卡最低价 | 0，不限制 | 1.98 元/小时 |
| 折后单卡最高价 | 0，不限制；也可按预算填写 | 1.98 元/小时 |
| 主机可扩容容量至少 | 250GB | 250GB |
| 实际额外扩容 | 250GB | 250GB |
| 镜像 | CUDA 12.8 的 PyTorch 2.7.x，优选 Ubuntu 22.04 | 现有 PyTorch 2.6.0 + CUDA 12.4 对应的基础镜像 |
| 地区 | 选择可以接受的地区；按需选多个并排序 | 同左 |
| 最低内存 | 0 或依你的策略需求填写 | 同左 |
| 驱动 | 选择支持 CUDA 12.8 的主机，建议 R570 或更新 | 保持符合 CUDA 12.4 镜像需求 |
| 任务名称 | LIBERO-5090x2-250G | LIBERO-4090x2-1.98-250G |

两台都成功时共占用四张 GPU。4090 两端都填 1.98，表示折后双卡算力合计 3.96 元/小时；如接受 1.80–1.98，将最低价改为 1.80。额外 250GB 数据盘按平台日费另计。脚本在下单前读取当前账号的预览报价，使用与订单相同的卡数、扩容量和优惠券参数；当前不自动选择优惠券。任务卡同时显示折后单卡价、GPU 小时总费和磁盘日费。

旧版等值价格任务继续按同值上下限处理，但改用折后报价核对；例如旧 1.98 条件对应新的 1.98–1.98。

CPU 先按你确认前的默认理解“实例总计至少 25 核”配置。市场“每 GPU 分配 CPU 25 核”是另一种口径：若你要的是这一档，请把“每卡 CPU 至少”设成 25，此时双卡会得到至少 50 核。脚本同时提供两个字段以便明确控制。

RTX 5090D、5090D v2、4090D 等是不同型号，不要自动当成原型号勾选。原有任务的配置已保存在任务里；改表单不会修改旧任务，取消旧任务并核对状态后再新建，避免多抢。

设置里保持 10 秒检查即可。任务卡片会显示卡数、CPU、价格条件、实际扩容和镜像，启动后逐项核对。浏览器需持续运行、电脑不要休眠。抢到后监控完成，但实例仍会计费。

通知按用户选择默认仅开启系统桌面通知，提示音和 Server酱关闭。已有油猴存储的设置不会被更新覆盖：若已安装，请在“设置”勾选“浏览器桌面通知”，取消“提示音”和“启用 Server酱”，保存并点击“测试提醒”核实弹窗权限。

## LIBERO 环境建议

5090 属于 Blackwell。PyTorch 官方从 2.7 起提供 Blackwell 支持及 CUDA 12.8 构建。为尽量接近你已有的 2.6 环境，建议先用 **PyTorch 2.7.1 + cu128 / torchvision 0.22.1 / Python 3.10 / Ubuntu 22.04** 作为迁移目标；不是要求盲目升级到最新版。AutoDL 若只有 PyTorch 2.7.0 + CUDA 12.8 基础镜像，也可先创建，再在独立 Conda 环境调整到目标版本。未登录查看你的镜像目录，不能保证该组合直接有现成镜像。

4090 可保留现有 PyTorch 2.6.0 + CUDA 12.4 策略环境，便于先建立动作输出基线。同样名字的基础镜像并不包含你的策略代码和完整依赖，需要还原当前项目的依赖锁定文件。

5090 上建议使用独立环境，不要覆盖原策略环境：

```bash
conda create -n libero-cu128 python=3.10 -y
conda activate libero-cu128
python -m pip install torch==2.7.1 torchvision==0.22.1 --index-url https://download.pytorch.org/whl/cu128
```

这只安装推理/训练框架，不代表 LIBERO 完整安装成功。然后基于你的策略仓库安装依赖，保留现有 MuJoCo、robosuite、Gym、预处理和动作归一化版本。原始 LIBERO 的 requirements 很旧，不应直接覆盖现代策略环境；也不要无条件升级 robosuite/MuJoCo。若项目用到 FlashAttention、xformers 或自编译 CUDA 扩展，需确认有支持新 Torch/Blackwell 的构建或重新编译。

无头渲染可先在服务器终端设置 `export MUJOCO_GL=egl`，再检查 EGL 可用性。只有 CPU 导入通过或 `torch.cuda.is_available()` 为真还不够；需要实际 CUDA 运算、LIBERO 渲染及策略前向验证。

迁移验收：固定 checkpoint、相同观测/图像、随机种子、精度和推理设置，比较动作张量的形状、有限值、范围、绝对/相对差异、夹爪维度和归一化；再跑相同 LIBERO 场景的短 rollout。允许误差阈值取决于策略，不能凭 Torch 能启动就宣称动作等价。`torch.load` 如涉及旧完整对象 checkpoint 的加载变化，按策略项目要求处理，只加载你信任的 checkpoint。

官方参考：

- [PyTorch 2.7 Blackwell 与 CUDA 12.8 支持](https://pytorch.org/blog/pytorch-2-7/)
- [PyTorch 2.7.1 官方配套安装命令](https://pytorch.org/get-started/previous-versions/)
- [LIBERO 官方依赖](https://github.com/Lifelong-Robot-Learning/LIBERO/blob/master/requirements.txt)
- [Hugging Face LIBERO 的无头 EGL 说明](https://huggingface.co/docs/lerobot/libero)
