# cesium-examples

一套可离线运行的 Cesium 示例合集，涵盖影像、地形、矢量、3D Tiles、空间分析等常见用法，开箱即可学习和对照参考。

## 快速开始

1. 启动本地静态服务（任意一种即可）：
   - PowerShell（有 Python）:
     ```bash
     python -m http.server 9000 -d .
     ```
   - Node（有 npm）：
     ```bash
     npx serve -s . -l 9000 --single
     ```
   - VS Code 插件：Live Server 直接“Open with Live Server”。(推荐)

2. 浏览器打开：
   - 访问 `http://localhost:9000/index.html`
   - 页面会自动跳转到 `examples/cesiumEx/examples.html`

> 直接用 file:// 打开会触发浏览器安全限制，部分资源无法加载，建议使用本地服务。

## 示例入口与组织

- 入口页面：`index.html`（自动跳转到示例索引）。
- 示例索引：`examples/cesiumEx/examples.html`
- 示例页面：位于 `examples/cesiumEx/`，文件名即左侧菜单条目（如 `2.2.1、离线地形.html`）。
- 索引配置：`examples/cesiumEx/config.js`（控制左侧目录与缩略图、文件映射）。

## Cesium 访问令牌

- 配置文件：`examples/cesiumEx/env.js`
- 默认写法：
  ```js
  window.defaultAccessToken = 'YOUR_TOKEN_HERE'
  ```
- 如需在线使用 Cesium ion 服务，请在 [Cesium ion 控制台](https://cesium.com/ion/) 申请并替换为你自己的 Token。

## 常见示例分类（节选）

- 影像图层：XYZ/TMS/WMS/WMTS/天地图（`2.1.x`）
- 地形：默认地形/地形夸张（`2.2.x`）
- 矢量与实体：点/线/面/GeoJSON/CZML（`2.3.x`）
- 模型与动画：加载 GLTF、批量模型、插值运动（`2.4.x`）
- 3D Tiles：加载、属性拾取、自定义材质、压平（`3.1.x`）
- 空间分析：可视域、简易淹没、缓冲区（`4.1.x`）

具体可在示例索引页左侧目录中浏览全部条目。

## 新增一个示例

1. 在 `examples/cesiumEx/` 下新建一个 `XXX.html`，内容参考同目录其他示例。
2. 在 `examples/cesiumEx/img/` 放置同名缩略图（可选）。
3. 在 `examples/cesiumEx/config.js` 中对应分类下的 `content` 数组里添加：
   ```js
   {
     name: "自定义示例标题",
     name_en: "Custom Title",
     thumbnail: "自定义示例标题.jpg", // 可选
     fileName: "自定义示例标题"
   }
   ```

## 资源与依赖

- Cesium 已在 `libs/cesium/` 内提供，无需额外安装。
- 示例依赖的第三方库均在 `examples/js/` 与项目 `libs/` 目录中，可离线使用。

## 常见问题

- 看不到地图或黑屏：
  - 使用本地静态服务访问，不要直接双击用 file:// 打开。
  - 检查控制台是否有 404/跨域报错，确认资源路径无误。
  - 必要时替换为自己的 Cesium ion Token（见上文）。
- 影像或地形加载失败：
  - 服务地址是否可达，网络是否被防火墙/代理拦截。
  - 某些在线服务需要密钥或白名单，请根据服务商要求配置。

## 许可与说明

本仓库示例仅用于学习与交流。若用于生产或商业，请自行评估数据与服务的授权、隐私与合规要求。

## 致谢

- CesiumJS 及相关开源生态。
- 本仓库整理与示例素材来源于日常项目实践与公开资料。
- 参考并致谢开源项目：[jiawanlong/Cesium-Examples](https://github.com/jiawanlong/Cesium-Examples)，本项目在其思路与示例基础上整理实现。
