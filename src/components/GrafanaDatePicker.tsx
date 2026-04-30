import React, { useState, useEffect, useRef } from 'react';
import { Calendar, ChevronDown, ChevronLeft, ChevronRight } from 'lucide-react';
import dayjs, { Dayjs } from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import relativeTime from 'dayjs/plugin/relativeTime';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';
import isoWeek from 'dayjs/plugin/isoWeek';
import isBetween from 'dayjs/plugin/isBetween';

dayjs.extend(customParseFormat);
dayjs.extend(relativeTime);
dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.extend(isoWeek);
dayjs.extend(isBetween);

interface QuickOption {
  label: string;
  from: () => Dayjs;
  to: () => Dayjs;
  display: string;
}

interface DatePickerProps {
  value?: { from: Dayjs; to: Dayjs };
  onChange?: (range: { from: Dayjs; to: Dayjs }) => void;
  placeholder?: string;
  timezone?: string;
  showTimezone?: boolean;
  className?: string;
}

const DatePicker: React.FC<DatePickerProps> = ({
  value,
  onChange,
  placeholder = '选择日期范围',
  timezone = dayjs.tz.guess(),
  showTimezone = true,
  className = ''
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedTab, setSelectedTab] = useState<'absolute' | 'relative'>('relative');
  const [tempRange, setTempRange] = useState<{ from: Dayjs; to?: Dayjs }>(
    value || { from: dayjs().subtract(5, 'day').startOf('day'), to: dayjs().endOf('day') }
  );
  const [calendarMonth, setCalendarMonth] = useState(dayjs());
  const [inputValue, setInputValue] = useState('');
  const [timezoneOpen, setTimezoneOpen] = useState(false);
  const [hoveredDate, setHoveredDate] = useState<Dayjs | null>(null);

  const pickerRef = useRef<HTMLDivElement>(null);
  const timezoneRef = useRef<HTMLDivElement>(null);

  const quickOptions: QuickOption[] = [
    {
      label: '最近5分钟',
      from: () => dayjs().subtract(5, 'minute'),
      to: () => dayjs(),
      display: 'Now-5m to Now'
    },
    {
      label: '最近15分钟',
      from: () => dayjs().subtract(15, 'minute'),
      to: () => dayjs(),
      display: 'Now-15m to Now'
    },
    {
      label: '最近30分钟',
      from: () => dayjs().subtract(30, 'minute'),
      to: () => dayjs(),
      display: 'Now-30m to Now'
    },
    {
      label: '最近1小时',
      from: () => dayjs().subtract(1, 'hour'),
      to: () => dayjs(),
      display: 'Now-1h to Now'
    },
    {
      label: '最近3小时',
      from: () => dayjs().subtract(3, 'hour'),
      to: () => dayjs(),
      display: 'Now-3h to Now'
    },
    {
      label: '最近6小时',
      from: () => dayjs().subtract(6, 'hour'),
      to: () => dayjs(),
      display: 'Now-6h to Now'
    },
    {
      label: '最近12小时',
      from: () => dayjs().subtract(12, 'hour'),
      to: () => dayjs(),
      display: 'Now-12h to Now'
    },
    {
      label: '最近24小时',
      from: () => dayjs().subtract(24, 'hour'),
      to: () => dayjs(),
      display: 'Now-24h to Now'
    },
    {
      label: '今天',
      from: () => dayjs().startOf('day'),
      to: () => dayjs().endOf('day'),
      display: 'Today so far'
    },
    {
      label: '昨天',
      from: () => dayjs().subtract(1, 'day').startOf('day'),
      to: () => dayjs().subtract(1, 'day').endOf('day'),
      display: 'Yesterday'
    },
    {
      label: '本周',
      from: () => dayjs().startOf('isoWeek'),
      to: () => dayjs().endOf('isoWeek'),
      display: 'This week'
    },
    {
      label: '上周',
      from: () => dayjs().subtract(1, 'week').startOf('isoWeek'),
      to: () => dayjs().subtract(1, 'week').endOf('isoWeek'),
      display: 'Last week'
    },
    {
      label: '本月',
      from: () => dayjs().startOf('month'),
      to: () => dayjs().endOf('month'),
      display: 'This month'
    },
    {
      label: '上月',
      from: () => dayjs().subtract(1, 'month').startOf('month'),
      to: () => dayjs().subtract(1, 'month').endOf('month'),
      display: 'Last month'
    },
    {
      label: '今年',
      from: () => dayjs().startOf('year'),
      to: () => dayjs().endOf('year'),
      display: 'This year'
    },
    {
      label: '上年',
      from: () => dayjs().subtract(1, 'year').startOf('year'),
      to: () => dayjs().subtract(1, 'year').endOf('year'),
      display: 'Last year'
    },
    {
      label: '最近3天',
      from: () => dayjs().subtract(2, 'day').startOf('day'),
      to: () => dayjs().endOf('day'),
      display: 'Last 3 days'
    },
    {
      label: '最近7天',
      from: () => dayjs().subtract(6, 'day').startOf('day'),
      to: () => dayjs().endOf('day'),
      display: 'Last 7 days'
    },
    {
      label: '最近30天',
      from: () => dayjs().subtract(29, 'day').startOf('day'),
      to: () => dayjs().endOf('day'),
      display: 'Last 30 days'
    },
    {
      label: '最近90天',
      from: () => dayjs().subtract(89, 'day').startOf('day'),
      to: () => dayjs().endOf('day'),
      display: 'Last 90 days'
    }
  ];

  const timezones = [
    { value: 'UTC', label: 'UTC' },
    { value: 'America/New_York', label: 'New York' },
    { value: 'America/Chicago', label: 'Chicago' },
    { value: 'America/Denver', label: 'Denver' },
    { value: 'America/Los_Angeles', label: 'Los Angeles' },
    { value: 'America/Sao_Paulo', label: 'São Paulo' },
    { value: 'Europe/London', label: 'London' },
    { value: 'Europe/Berlin', label: 'Berlin' },
    { value: 'Europe/Paris', label: 'Paris' },
    { value: 'Europe/Moscow', label: 'Moscow' },
    { value: 'Asia/Dubai', label: 'Dubai' },
    { value: 'Asia/Shanghai', label: 'Shanghai' },
    { value: 'Asia/Hong_Kong', label: 'Hong Kong' },
    { value: 'Asia/Tokyo', label: 'Tokyo' },
    { value: 'Asia/Seoul', label: 'Seoul' },
    { value: 'Australia/Sydney', label: 'Sydney' }
  ];

  useEffect(() => {
    if (value) {
      setTempRange(value);
    }
  }, [value]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (pickerRef.current && !pickerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
      if (timezoneRef.current && !timezoneRef.current.contains(event.target as Node)) {
        setTimezoneOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleQuickSelect = (option: QuickOption) => {
    const newRange = { from: option.from(), to: option.to() };
    setTempRange(newRange);
    setInputValue(option.display);
    onChange?.(newRange);
    setIsOpen(false);
  };

  const handleCalendarSelect = (date: Dayjs) => {
    const newRange = { ...tempRange };

    if (!tempRange.from || (tempRange.from && tempRange.to)) {
      newRange.from = date.startOf('day');
      delete newRange.to;
      setInputValue('');
    } else {
      if (date.isBefore(tempRange.from)) {
        newRange.from = date.startOf('day');
        newRange.to = tempRange.from.endOf('day');
      } else {
        newRange.to = date.endOf('day');
      }

      // 生成时间表达式
      const fromStr = newRange.from.format('YYYY-MM-DD HH:mm');
      const toStr = newRange.to.format('YYYY-MM-DD HH:mm');
      setInputValue(`${fromStr} to ${toStr}`);
    }

    setTempRange(newRange);

    if (newRange.from && newRange.to) {
      onChange?.(newRange as { from: Dayjs; to: Dayjs });
      setIsOpen(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInputValue(value);

    const match = value.match(/(.+?)\s+to\s+(.+)/i);
    if (match) {
      const [, fromStr, toStr] = match;
      let from: Dayjs | null = null;
      let to: Dayjs | null = null;

      if (fromStr.toLowerCase().startsWith('now-')) {
        const amount = parseInt(fromStr.slice(4));
        const unit = fromStr.slice(-1);
        from = dayjs().subtract(amount, unit as any);
      } else if (fromStr.toLowerCase() === 'now') {
        from = dayjs();
      } else {
        from = dayjs(fromStr);
      }

      if (toStr.toLowerCase() === 'now') {
        to = dayjs();
      } else {
        to = dayjs(toStr);
      }

      if (from && to && from.isValid() && to.isValid()) {
        setTempRange({ from, to });
        onChange?.({ from, to });
      }
    }
  };

  const formatDisplayValue = () => {
    if (!tempRange.from || !tempRange.to) return placeholder;

    const from = tempRange.from.tz(timezone);
    const to = tempRange.to.tz(timezone);

    const format = (date: Dayjs) => {
      return date.format('YYYY-MM-DD HH:mm');
    };

    return `${format(from)} — ${format(to)}`;
  };

  const renderCalendar = () => {
    const monthStart = calendarMonth.startOf('month');
    const monthEnd = calendarMonth.endOf('month');
    const startDate = monthStart.startOf('week');
    const endDate = monthEnd.endOf('week');

    const days = [];
    let day = startDate;

    while (day.isBefore(endDate) || day.isSame(endDate)) {
      days.push(day);
      day = day.add(1, 'day');
    }

    const weeks = [];
    for (let i = 0; i < days.length; i += 7) {
      weeks.push(days.slice(i, i + 7));
    }

    return (
      <div className="p-4">
        <div className="flex items-center justify-between mb-4">
          <button
            onClick={() => setCalendarMonth(calendarMonth.subtract(1, 'month'))}
            className="p-1 hover:bg-gray-100 rounded"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <div className="font-medium">
            {calendarMonth.format('MMMM YYYY')}
          </div>
          <button
            onClick={() => setCalendarMonth(calendarMonth.add(1, 'month'))}
            className="p-1 hover:bg-gray-100 rounded"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-7 gap-1 text-xs text-gray-500 mb-2">
          {['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'].map(d => (
            <div key={d} className="text-center font-medium">
              {d}
            </div>
          ))}
        </div>

        <div className="grid grid-cols-7 gap-1">
          {weeks.map((week, weekIndex) => (
            <React.Fragment key={weekIndex}>
              {week.map(day => {
                const isToday = day.isSame(dayjs(), 'day');
                const isSelected =
                  (tempRange.from && day.isSame(tempRange.from, 'day')) ||
                  (tempRange.to && day.isSame(tempRange.to, 'day')) ||
                  (tempRange.from && tempRange.to && day.isBetween(tempRange.from, tempRange.to, 'day'));
                const isCurrentMonth = day.isSame(calendarMonth, 'month');

                // 判断是否在悬停范围内
                  let isHoveredInRange = false;
                  if (tempRange.from && !tempRange.to && hoveredDate) {
                    // 判断当前日期是否在选中日期和悬停日期之间
                    const startDate = tempRange.from.isBefore(hoveredDate) ? tempRange.from : hoveredDate;
                    const endDate = tempRange.from.isBefore(hoveredDate) ? hoveredDate : tempRange.from;
                    isHoveredInRange = day.isBetween(startDate, endDate, 'day', '[]') ||
                                       day.isSame(startDate, 'day') ||
                                       day.isSame(endDate, 'day');
                  }

                  return (
                  <button
                    key={day.format()}
                    onClick={() => handleCalendarSelect(day)}
                    onMouseEnter={() => setHoveredDate(day)}
                    onMouseLeave={() => setHoveredDate(null)}
                    className={`h-8 rounded text-sm transition-colors ${
                      isSelected
                        ? 'bg-blue-500 text-white'
                        : isHoveredInRange
                        ? 'bg-blue-100'
                        : !isSelected && tempRange.from && tempRange.to && day.isBetween(tempRange.from, tempRange.to, 'day')
                        ? 'bg-blue-100'
                        : isToday && !isSelected
                        ? 'bg-gray-900 text-white'
                        : !isSelected && isCurrentMonth
                        ? 'text-gray-900'
                        : 'text-gray-400'
                    } hover:bg-gray-100`}
                  >
                    {day.format('D')}
                  </button>
                );
              })}
            </React.Fragment>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className={`relative ${className}`} ref={pickerRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`flex items-center gap-2 px-3 py-2 border rounded-lg bg-white hover:bg-gray-50 transition-colors min-w-[280px] text-left ${
          isOpen ? 'ring-2 ring-blue-500' : ''
        }`}
      >
        <Calendar className="w-4 h-4 text-gray-500" />
        <span className="flex-1">{formatDisplayValue()}</span>
        <ChevronDown className="w-4 h-4 text-gray-500" />
      </button>

      {isOpen && (
        <div className="absolute top-full mt-1 w-[660px] bg-white border rounded-lg shadow-lg z-50">
          <div className="flex border-b">
            <button
              onClick={() => setSelectedTab('relative')}
              className={`flex-1 px-4 py-2 text-sm font-medium transition-colors ${
                selectedTab === 'relative'
                  ? 'text-blue-600 border-b-2 border-blue-600'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Quick range
            </button>
            <button
              onClick={() => setSelectedTab('absolute')}
              className={`flex-1 px-4 py-2 text-sm font-medium transition-colors ${
                selectedTab === 'absolute'
                  ? 'text-blue-600 border-b-2 border-blue-600'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Custom range
            </button>
          </div>

          <div className="flex">
            <div className="w-80 max-h-[400px] overflow-y-auto">
              {selectedTab === 'relative' && (
                <div className="p-2">
                  <div className="text-xs font-medium text-gray-500 uppercase tracking-wider px-2 py-1">
                    Common
                  </div>
                  {quickOptions.slice(0, 8).map(option => (
                    <button
                      key={option.label}
                      onClick={() => handleQuickSelect(option)}
                      className="w-full px-2 py-1.5 text-left text-sm hover:bg-gray-100 rounded flex items-center justify-between group"
                    >
                      <span>{option.label}</span>
                      <span className="text-xs text-gray-500 group-hover:text-gray-700">
                        {option.display}
                      </span>
                    </button>
                  ))}

                  <div className="text-xs font-medium text-gray-500 uppercase tracking-wider px-2 py-1 mt-4">
                    By day
                  </div>
                  {quickOptions.slice(8, 15).map(option => (
                    <button
                      key={option.label}
                      onClick={() => handleQuickSelect(option)}
                      className="w-full px-2 py-1.5 text-left text-sm hover:bg-gray-100 rounded flex items-center justify-between group"
                    >
                      <span>{option.label}</span>
                      <span className="text-xs text-gray-500 group-hover:text-gray-700">
                        {option.display}
                      </span>
                    </button>
                  ))}

                  <div className="text-xs font-medium text-gray-500 uppercase tracking-wider px-2 py-1 mt-4">
                    By period
                  </div>
                  {quickOptions.slice(15).map(option => (
                    <button
                      key={option.label}
                      onClick={() => handleQuickSelect(option)}
                      className="w-full px-2 py-1.5 text-left text-sm hover:bg-gray-100 rounded flex items-center justify-between group"
                    >
                      <span>{option.label}</span>
                      <span className="text-xs text-gray-500 group-hover:text-gray-700">
                        {option.display}
                      </span>
                    </button>
                  ))}
                </div>
              )}

              {selectedTab === 'absolute' && (
                <div className="flex-1 border-r">
                  {renderCalendar()}
                </div>
              )}
            </div>

            <div className="flex-1 flex">
              <div className="w-80 p-4">
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      From
                    </label>
                    <input
                      type="datetime-local"
                      value={tempRange.from ? tempRange.from.format('YYYY-MM-DDTHH:mm') : ''}
                      onChange={(e) => {
                        const date = dayjs(e.target.value);
                        if (date.isValid()) {
                          setTempRange({ ...tempRange, from: date });
                          // 更新表达式
                          if (tempRange.to) {
                            const fromStr = date.format('YYYY-MM-DD HH:mm');
                            const toStr = tempRange.to.format('YYYY-MM-DD HH:mm');
                            setInputValue(`${fromStr} to ${toStr}`);
                          }
                        }
                      }}
                      className="w-full px-2 py-1 border rounded text-sm"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      To
                    </label>
                    <input
                      type="datetime-local"
                      value={tempRange.to ? tempRange.to.format('YYYY-MM-DDTHH:mm') : ''}
                      onChange={(e) => {
                        const date = dayjs(e.target.value);
                        if (date.isValid()) {
                          setTempRange({ ...tempRange, to: date });
                          // 更新表达式
                          if (tempRange.from) {
                            const fromStr = tempRange.from.format('YYYY-MM-DD HH:mm');
                            const toStr = date.format('YYYY-MM-DD HH:mm');
                            setInputValue(`${fromStr} to ${toStr}`);
                          }
                        }
                      }}
                      className="w-full px-2 py-1 border rounded text-sm"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Or enter expression
                    </label>
                    <input
                      type="text"
                      value={inputValue}
                      onChange={handleInputChange}
                      placeholder="e.g. now-1h to now"
                      className="w-full px-2 py-1 border rounded text-sm"
                    />
                    <div className="mt-2 text-xs text-gray-500">
                      Examples: now-1h, now-1d, 2024-01-01, 2024-01-01 15:30:00
                    </div>
                  </div>

                  {showTimezone && (
                    <div className="relative" ref={timezoneRef}>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Timezone
                      </label>
                      <button
                        onClick={() => setTimezoneOpen(!timezoneOpen)}
                        className="w-full px-2 py-1 border rounded text-sm text-left flex items-center justify-between"
                      >
                        <span>{timezones.find(tz => tz.value === timezone)?.label || timezone}</span>
                        <ChevronDown className="w-3 h-3" />
                      </button>

                      {timezoneOpen && (
                        <div className="absolute top-full left-0 right-0 mt-1 bg-white border rounded shadow-lg max-h-40 overflow-y-auto z-10">
                          {timezones.map(tz => (
                            <button
                              key={tz.value}
                              onClick={() => {
                                setTimezoneOpen(false);
                              }}
                              className={`w-full px-2 py-1 text-left text-sm hover:bg-gray-100 ${
                                tz.value === timezone ? 'bg-blue-50 text-blue-600' : ''
                              }`}
                            >
                              {tz.label}
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                  )}

                  <div className="flex gap-2 pt-4">
                    <button
                      onClick={() => {
                        if (tempRange.from && tempRange.to) {
                          onChange?.(tempRange as { from: Dayjs; to: Dayjs });
                          setIsOpen(false);
                        }
                      }}
                      disabled={!tempRange.from || !tempRange.to}
                      className="flex-1 px-3 py-1.5 bg-blue-600 text-white rounded text-sm font-medium hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      Apply
                    </button>
                    <button
                      onClick={() => setIsOpen(false)}
                      className="px-3 py-1.5 border rounded text-sm font-medium hover:bg-gray-50"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DatePicker;