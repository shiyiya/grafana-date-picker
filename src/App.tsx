import { useState } from 'react';
import GrafanaDatePicker from './components/GrafanaDatePicker';
import dayjs from 'dayjs';

function App() {
  const [dateRange, setDateRange] = useState<{ from: dayjs.Dayjs; to: dayjs.Dayjs } | null>(null);

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">
          Grafana 风格日期选择器演示
        </h1>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                基础用法
              </label>
              <GrafanaDatePicker
                value={dateRange || undefined}
                onChange={setDateRange}
              />
            </div>

            {dateRange && (
              <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                <h3 className="text-sm font-medium text-gray-700 mb-2">选中的日期范围：</h3>
                <div className="font-mono text-sm">
                  <div>开始: {dateRange.from.format('YYYY-MM-DD HH:mm:ss')}</div>
                  <div>结束: {dateRange.to.format('YYYY-MM-DD HH:mm:ss')}</div>
                  <div>时长: {dateRange.to.diff(dateRange.from, 'hour')} 小时</div>
                </div>
              </div>
            )}

            <div className="mt-8">
              <h3 className="text-lg font-medium text-gray-900 mb-4">功能特点</h3>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>• 快速选择预设时间范围（最近5分钟到最近90天）</li>
                <li>• 自定义日期时间选择器</li>
                <li>• 支持表达式输入（如: now-1h to now）</li>
                <li>• 时区选择功能</li>
                <li>• Grafana 风格的交互设计</li>
                <li>• 日历视图快速选择日期范围</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;