# GrafanaDatePicker

一个功能强大的 React 日期范围选择器组件，灵感来源于 Grafana 的日期选择器。

## 特性

- 🚀 **快速选择预设时间范围**：支持最近 5 分钟到最近 90 天的快速选择
- 📅 **日历视图**：直观的日期选择界面，支持悬停预览选择范围
- ⏰ **精确时间控制**：支持日期和时间的精确选择
- 📝 **表达式输入**：支持类似 `now-1h to now` 的表达式输入
- 🌍 **时区支持**：内置常用时区选择
- 🎨 **Grafana 风格**：专业的界面设计和交互体验
- 📱 **响应式**：适配不同屏幕尺寸
- 🔧 **TypeScript 支持**：完整的类型定义

## 安装

```bash
npm install
```

## 使用示例

```tsx
import { GrafanaDatePicker } from './components/GrafanaDatePicker';
import dayjs from 'dayjs';

function App() {
  const [dateRange, setDateRange] = useState<{ from: dayjs.Dayjs; to: dayjs.Dayjs } | null>(null);

  return (
    <div>
      <GrafanaDatePicker
        value={dateRange || undefined}
        onChange={setDateRange}
        placeholder="选择日期范围"
        timezone="Asia/Shanghai"
        showTimezone={true}
      />
    </div>
  );
}
```

## API

### Props

| 属性 | 类型 | 默认值 | 描述 |
|------|------|--------|------|
| value | `{ from: Dayjs; to: Dayjs } \| undefined` | - | 当前选中的日期范围 |
| onChange | `(range: { from: Dayjs; to: Dayjs }) => void` | - | 日期范围改变时的回调函数 |
| placeholder | `string` | "选择日期范围" | 输入框占位符 |
| timezone | `string` | dayjs.tz.guess() | 时区设置 |
| showTimezone | `boolean` | true | 是否显示时区选择器 |
| className | `string` | "" | 自定义 CSS 类名 |

### 快速选择选项

组件内置了丰富的快速选择选项：

**常用时间范围：**
- 最近 5 分钟、15 分钟、30 分钟、1 小时、3 小时、6 小时、12 小时、24 小时

**按天分类：**
- 今天、昨天、本周、上周、本月、上月、今年、上年

**按周期分类：**
- 最近 3 天、7 天、30 天、90 天

### 表达式输入

支持以下表达式格式：

- 相对时间：`now-1h`, `now-1d`, `now-1w`
- 绝对时间：`2024-01-01`, `2024-01-01 15:30:00`
- 范围表达式：`now-1h to now`, `2024-01-01 to 2024-01-02`

## 开发

```bash
# 安装依赖
npm install

# 启动开发服务器
npm run dev

# 构建生产版本
npm run build

# 预览构建结果
npm run preview
```

## 技术栈

- React 18
- TypeScript
- Day.js
- Tailwind CSS
- Lucide React Icons

## 作者

**作者：Claude**  
*由 Anthropic 开发的大型语言模型*

## 许可证

MIT License