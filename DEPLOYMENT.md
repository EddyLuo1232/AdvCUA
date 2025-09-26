# AdvCUA Deployment Guide

## GitHub Actions 自动部署设置

### 1. GitHub Repository 设置

1. 确保你的仓库推送到 GitHub
2. 在 GitHub 仓库设置中：
   - 进入 **Settings** > **Pages**
   - Source 选择 **GitHub Actions**

### 2. 自定义域名配置

#### DNS 设置
在你的域名提供商（如阿里云、Cloudflare等）处添加以下DNS记录：

```
Type: CNAME
Name: eddyluo (或 www.eddyluo，根据你的需要)
Value: EddyLuo1232.github.io
```

#### 或者使用A记录（推荐）：
```
Type: A
Name: eddyluo
Value: 185.199.108.153
Value: 185.199.109.153  
Value: 185.199.110.153
Value: 185.199.111.153
```

### 3. 自动部署流程

每当推送到 `main` 或 `master` 分支时，GitHub Actions会：

1. ✅ 检出代码
2. ✅ 设置 Node.js 环境
3. ✅ 安装依赖 (`npm ci`)
4. ✅ 构建项目 (`npm run build`)
5. ✅ 部署到 GitHub Pages

### 4. 访问地址

- **生产地址**: https://eddyluo.com/AdvCUA
- **GitHub Pages 地址**: https://EddyLuo1232.github.io/AdvCUA

### 5. 本地测试

```bash
# 构建生产版本
npm run build

# 测试构建结果
npx serve -s build -l 3000
```

### 6. 故障排除

#### 如果部署失败：
1. 检查 GitHub Actions 日志
2. 确保所有依赖都在 package.json 中
3. 验证构建命令能在本地成功运行

#### 如果自定义域名不工作：
1. 检查 DNS 设置是否正确传播（可能需要24-48小时）
2. 确保 CNAME 文件存在且内容正确
3. 在 GitHub Pages 设置中验证自定义域名配置

### 7. 单页面应用路由

本项目已配置支持 GitHub Pages 的 SPA 路由：
- ✅ 404.html 重定向脚本
- ✅ index.html 中的路由处理
- ✅ .nojekyll 文件禁用 Jekyll 处理

## 部署文件清单

- `.github/workflows/deploy.yml` - GitHub Actions 工作流
- `public/CNAME` - 自定义域名配置
- `public/404.html` - SPA 路由重定向
- `public/.nojekyll` - 禁用 Jekyll
- `package.json` - 更新 homepage 字段
- `public/manifest.json` - 更新 start_url
