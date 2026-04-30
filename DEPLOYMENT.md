# GitHub Pages 部署

本项目已配置 GitHub Actions，可以自动部署到 GitHub Pages。

## 部署流程

1. **自动触发**：当代码推送到 `main` 分支时，自动触发部署流程
2. **构建**：使用 Node.js 20 环境构建项目
3. **部署**：将构建产物部署到 GitHub Pages

## 手动触发

你也可以在 GitHub 仓库的 Actions 页面手动触发部署：

1. 进入仓库的 Actions 页面
2. 选择 "Deploy to GitHub Pages" workflow
3. 点击 "Run workflow" 按钮

## 配置说明

### GitHub Pages 设置

确保在仓库设置中启用了 GitHub Pages：

1. 进入仓库的 Settings 页面
2. 在左侧菜单中找到 "Pages"
3. Source 选择 "GitHub Actions"

### Vite 配置

`vite.config.ts` 中已配置：
- `base: '/grafana-date-picker/'` - 确保资源路径正确
- `outDir: 'dist'` - 构建输出目录

### Workflow 配置

`.github/workflows/deploy.yml` 包含：
- 权限配置：允许部署到 Pages
- 缓存配置：加速构建过程
- 构建步骤：安装依赖并构建项目
- 部署步骤：上传构建产物到 Pages

## 访问地址

部署成功后，可以通过以下地址访问：

```
https://[你的用户名].github.io/grafana-date-picker/
```

## 故障排除

如果部署失败，请检查：

1. 仓库名称是否与 `vite.config.ts` 中的 `base` 配置一致
2. GitHub Pages 是否已正确启用
3. Workflow 是否有权限访问 Pages

## 本地预览

在部署前，你可以本地预览：

```bash
npm run build
npm run preview
```

然后访问 `http://localhost:4173` 查看效果。