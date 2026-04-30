# 发布 NPM 包指南

## 准备工作

1. **确保已注册 NPM 账号**
   ```bash
   npm login
   ```

2. **更新版本号**
   - 修改 `package.json` 中的版本号
   - 遵循语义化版本控制 (semver)
   - `x.x.x` - 主版本.次版本.修订版本

3. **更新仓库信息**
   - 修改 `package.json` 中的 repository、bugs、homepage 字段
   - 替换 `yourusername` 为你的 GitHub 用户名

## 发布步骤

### 方法一：使用发布脚本（推荐）

```bash
npm run publish:lib
```

### 方法二：手动发布

1. 构建库
   ```bash
   npm run build:lib
   ```

2. 检查构建产物
   ```bash
   ls -la dist/
   ```

3. 发布到 NPM
   ```bash
   npm publish
   ```

## 发布前检查清单

- [ ] 版本号已更新
- [ ] README.md 已更新
- [ ] CHANGELOG.md 已更新（如果有）
- [ ] 测试通过
- [ ] 构建成功
- [ ] package.json 信息正确

## 发布后

1. **在 NPM 上查看包**
   - 访问 https://www.npmjs.com/package/grafana-date-picker

2. **安装测试**
   ```bash
   npm install grafana-date-picker
   ```

3. **更新 GitHub Release**
   - 创建新的 Release 标签
   - 关联相关的 Issues 和 PRs

## 注意事项

1. **如果是第一次发布**
   - 确保包名未被占用
   - 使用 `npm publish --access public`（如果是 scoped package）

2. **版本冲突**
   - 如果版本号已存在，发布会失败
   - 需要先更新版本号

3. **两步验证**
   - 如果启用了两步验证，需要输入 OTP

4. **撤回发布**
   ```bash
   npm unpublish grafana-date-picker@版本号
   ```
   - 注意：只能撤回 24 小时内发布的版本