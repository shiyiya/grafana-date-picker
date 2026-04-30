const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

// 读取 package.json
const packageJson = JSON.parse(fs.readFileSync('package.json', 'utf8'));

// 检查版本号
if (!packageJson.version) {
  console.error('Version not found in package.json');
  process.exit(1);
}

console.log(`Publishing version ${packageJson.version}...`);

// 构建库
console.log('Building library...');
try {
  execSync('npm run build:lib', { stdio: 'inherit' });
} catch (error) {
  console.error('Build failed');
  process.exit(1);
}

// 检查 dist 目录
if (!fs.existsSync('dist')) {
  console.error('dist directory not found');
  process.exit(1);
}

// 发布到 npm
console.log('Publishing to npm...');
try {
  execSync('npm publish', { stdio: 'inherit' });
  console.log('✅ Published successfully!');
} catch (error) {
  console.error('❌ Publish failed');
  process.exit(1);
}