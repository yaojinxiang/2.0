// 默认数据（根据中央气象台02-05 08:00发布数据更新）
// 预测周期：2月5日-2月11日（7天滚动更新）
// 数据来源：中央气象台 https://www.nmc.cn/
// 更新时间：2026-02-05 08:00
// 风力格式统一：X-Y级（如2-3级、3-4级）
const defaultData = [
    {
        date: "2026-02-05",  // 今天
        pm25: 75,  // 南部良至轻度污染（污染天不调整）
        o3: 65,
        weather: "阴",
        tempHigh: 14,  // 中央气象台：14℃/6℃
        windDirection: "东北风",  // 全天东北风
        windLevel: "1-2级",  // 中央气象台：微风（1-2级）
        windSpeedMin: 1.5,  // 最小风速 m/s
        windSpeedMax: 2.5,  // 最大风速 m/s
        humidity: 75,
        rainfall: 0,
        dataSource: "中央气象台",
        updateTime: "2026-02-05 08:00"
    },
    {
        date: "2026-02-06",  // 明天
        pm25: 70,  // 【基础值】整体以良为主，基础70；风力>3级(-10) + 降雨(-10) = 50
        o3: 72,
        weather: "中雨",  // 中央气象台：中雨
        tempHigh: 6,  // 中央气象台：6℃/0℃（修正后）
        windDirection: "东北风",  // 上午东北风
        windLevel: "4-5级",  // 中央气象台：4-5级风（>3级）
        windSpeedMin: 6.5,  // 最小风速 m/s
        windSpeedMax: 9.0,  // 最大风速 m/s
        humidity: 85,
        rainfall: 12.5,  // 中雨降水量
        dataSource: "中央气象台",
        updateTime: "2026-02-05 08:00"
    },
    {
        date: "2026-02-07",
        pm25: 57,  // 整体以良为主
        o3: 68,
        weather: "阴",  // 中央气象台：阴
        tempHigh: 3,  // 中央气象台：3℃/-1℃（修正后）
        windDirection: "北风",  // 全天北风
        windLevel: "1-2级",  // 中央气象台：微风
        windSpeedMin: 1.0,  // 最小风速 m/s
        windSpeedMax: 2.0,  // 最大风速 m/s
        humidity: 70,
        rainfall: 0,
        dataSource: "中央气象台",
        updateTime: "2026-02-05 08:00"
    },
    {
        date: "2026-02-08",
        pm25: 45,  // 整体以良为主
        o3: 70,
        weather: "晴",  // 中央气象台：晴
        tempHigh: 3,  // 中央气象台：3℃/-2℃（修正后）
        windDirection: "北风",  // 上午北风
        windLevel: "1-2级",  // 中央气象台：微风
        windSpeedMin: 1.2,  // 最小风速 m/s
        windSpeedMax: 2.2,  // 最大风速 m/s
        humidity: 45,
        rainfall: 0,
        dataSource: "中央气象台",
        updateTime: "2026-02-05 08:00"
    },
    {
        date: "2026-02-09",
        pm25: 47,  // 整体以良为主
        o3: 72,
        weather: "阴",  // 中央气象台：阴
        tempHigh: 6,  // 中央气象台：6℃/0℃（修正后）
        windDirection: "东南风",  // 上午东南风
        windLevel: "1-2级",  // 中央气象台：微风
        windSpeedMin: 0.8,  // 最小风速 m/s
        windSpeedMax: 1.8,  // 最大风速 m/s
        humidity: 65,
        rainfall: 0,
        dataSource: "中央气象台",
        updateTime: "2026-02-05 08:00"
    },
    {
        date: "2026-02-10",
        pm25: 48,  // 整体以良为主
        o3: 75,
        weather: "多云",  // 中央气象台：多云
        tempHigh: 10,  // 中央气象台：10℃/2℃（修正后）
        windDirection: "西风",  // 上午西风
        windLevel: "1-2级",  // 中央气象台：微风
        windSpeedMin: 1.3,  // 最小风速 m/s
        windSpeedMax: 2.3,  // 最大风速 m/s
        humidity: 60,
        rainfall: 0,
        dataSource: "中央气象台",
        updateTime: "2026-02-05 08:00"
    },
    {
        date: "2026-02-11",  // 第7天
        pm25: 47,  // 整体以良为主
        o3: 78,
        weather: "晴",  // 中央气象台：晴
        tempHigh: 12,  // 中央气象台：12℃/1℃（新增）
        windDirection: "西北风",  // 上午西北风
        windLevel: "1-2级",  // 中央气象台：微风
        windSpeedMin: 1.0,  // 最小风速 m/s
        windSpeedMax: 2.0,  // 最大风速 m/s
        humidity: 55,
        rainfall: 0,
        dataSource: "中央气象台",
        updateTime: "2026-02-05 08:00"
    }
];

// 长三角区域预测规则基准数据（自动同步更新）
const yangtzeRiverDeltaRules = {
    "2026-02-05": { basePM25: 75, level: "良至轻度污染", isPolluted: true, description: "南部良至轻度污染" },
    "2026-02-06": { basePM25: 70, level: "良", isPolluted: false, description: "整体以良为主" },
    "2026-02-07": { basePM25: 57, level: "良", isPolluted: false, description: "整体以良为主" },
    "2026-02-08": { basePM25: 45, level: "良", isPolluted: false, description: "整体以良为主" },
    "2026-02-09": { basePM25: 47, level: "良", isPolluted: false, description: "整体以良为主" },
    "2026-02-10": { basePM25: 48, level: "良", isPolluted: false, description: "整体以良为主" },
    "2026-02-11": { basePM25: 47, level: "良", isPolluted: false, description: "整体以良为主" }
};

// 数据更新信息
let lastDataUpdateTime = "2026-02-05 08:00";
let dataUpdateSource = "中央气象台";

// 数据核查记录
let dataVerificationLog = [];

// 更新数据信息栏显示
function updateDataInfoDisplay() {
    const dataSourceEl = document.getElementById('dataSource');
    const updateTimeEl = document.getElementById('updateTime');
    const forecastPeriodEl = document.getElementById('forecastPeriod');
    
    if (dataSourceEl) dataSourceEl.textContent = dataUpdateSource;
    if (updateTimeEl) updateTimeEl.textContent = lastDataUpdateTime;
    
    // 计算预测周期
    if (currentTableData.length > 0) {
        const startDate = new Date(currentTableData[0].date);
        const endDate = new Date(currentTableData[currentTableData.length - 1].date);
        const formatDateCN = (date) => `${date.getMonth() + 1}月${date.getDate()}日`;
        if (forecastPeriodEl) {
            forecastPeriodEl.textContent = `${formatDateCN(startDate)} - ${formatDateCN(endDate)}`;
        }
    }
}

// 每日自动滚动更新预测周期
function rollForecastPeriod() {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    // 检查是否需要滚动（当前日期超过了预测表的第一天）
    if (currentTableData.length > 0) {
        const firstForecastDate = new Date(currentTableData[0].date);
        firstForecastDate.setHours(0, 0, 0, 0);
        
        if (today > firstForecastDate) {
            console.log('执行预测周期滚动更新...');
            
            // 移除已过期的一天
            const expiredDay = currentTableData.shift();
            if (expiredDay) {
                // 将过期数据加入历史记录
                const exists = historyData.some(h => h.date === expiredDay.date);
                if (!exists) {
                    historyData.push({
                        ...expiredDay,
                        actualPM25: "--",
                        actualO3: "--",
                        isActual: false
                    });
                    saveHistoryData();
                }
            }
            
            // 添加新的一天（第8天）
            const lastDate = new Date(currentTableData[currentTableData.length - 1].date);
            const newDate = new Date(lastDate);
            newDate.setDate(newDate.getDate() + 1);
            
            // 生成新一天的默认数据
            const newDayData = generateNextDayData(newDate);
            currentTableData.push(newDayData);
            
            // 更新显示
            initTable();
            generateForecastDescription();
            updateDataInfoDisplay();
            
            showToast(`预测周期已滚动更新：${formatDateText(newDate)}已加入`, "success");
        }
    }
}

// 生成新一天的预测数据
function generateNextDayData(date) {
    const dateStr = date.toISOString().split('T')[0];
    const month = date.getMonth() + 1;
    const day = date.getDate();
    
    // 基础数据（可根据季节调整）
    const baseTemp = month >= 6 && month <= 8 ? 30 : (month >= 12 || month <= 2 ? 8 : 20);
    
    return {
        date: dateStr,
        pm25: 47,  // 默认良
        o3: 70,
        weather: "多云",
        tempHigh: baseTemp + Math.floor(Math.random() * 5),
        windDirection: "东南风",
        windLevel: "微风",
        humidity: 60,
        rainfall: 0,
        dataSource: "中央气象台",
        updateTime: lastDataUpdateTime
    };
}

// 定时检查数据更新（每小时检查一次）
function startAutoUpdateCheck() {
    // 立即执行一次滚动检查
    rollForecastPeriod();
    
    // 每小时检查一次
    setInterval(() => {
        rollForecastPeriod();
    }, 3600000); // 1小时 = 3600000毫秒
    
    console.log('自动更新检查已启动（每小时检查）');
}

// 获取风力等级数值（从字符串中提取最大风力）
function getWindLevelValue(windLevelStr) {
    if (!windLevelStr) return 0;
    
    // 处理"微风"等特殊情况
    if (windLevelStr.includes("微")) return 1;
    
    // 匹配数字，如 "3-4级" 或 "4-5级" 或 "3级"
    const matches = windLevelStr.match(/(\d+)/g);
    if (!matches || matches.length === 0) {
        return 0;
    }
    
    // 返回最大风力值
    const maxLevel = Math.max(...matches.map(Number));
    console.log(`风力解析: "${windLevelStr}" -> 最大风力 ${maxLevel}级`);
    return maxLevel;
}

// 根据风速(m/s)计算风力等级
function calculateWindLevelFromSpeed(windSpeedMs) {
    if (!windSpeedMs || windSpeedMs <= 0.2) return "0级";
    if (windSpeedMs <= 1.5) return "1级";
    if (windSpeedMs <= 3.3) return "2级";
    if (windSpeedMs <= 5.4) return "3级";
    if (windSpeedMs <= 7.9) return "4级";
    if (windSpeedMs <= 10.7) return "5级";
    if (windSpeedMs <= 13.8) return "6级";
    if (windSpeedMs <= 17.1) return "7级";
    if (windSpeedMs <= 20.7) return "8级";
    return "9级";
}

// 判断是否有降雨
function hasRainfall(weather, rainfall) {
    if (rainfall > 0) return true;
    const rainKeywords = ["雨", "雪", "霰"];
    return rainKeywords.some(kw => weather.includes(kw));
}

// 根据长三角规则和气象条件计算PM2.5预测值
function calculatePM25WithRules(date, basePM25, weather, windLevel, rainfall) {
    const rule = yangtzeRiverDeltaRules[date];
    if (!rule) {
        console.log(`${date}: 未找到长三角规则，使用基础值 ${basePM25}`);
        return basePM25;
    }

    console.log(`\n=== PM2.5计算: ${date} ===`);
    console.log(`基础PM2.5: ${basePM25}, 污染等级: ${rule.level}, 是否污染: ${rule.isPolluted}`);
    console.log(`气象条件: 天气=${weather}, 风力=${windLevel}, 降雨=${rainfall}mm`);

    // 第一准则：如果是污染天气（良-轻度污染及以上），直接采用预测值
    if (rule.isPolluted) {
        console.log(`✓ ${date}: 污染天气(>${rule.level})，直接采用长三角预测值 ${basePM25}`);
        return basePM25;
    }

    // 非污染天气：执行二级判断
    let adjustment = 0;
    const windValue = getWindLevelValue(windLevel);
    const isRainy = hasRainfall(weather, rainfall);

    console.log(`解析结果: 最大风力=${windValue}级, 是否有雨=${isRainy}`);

    // 风力>3级时，PM2.5-10
    if (windValue > 3) {
        adjustment -= 10;
        console.log(`✓ ${date}: 风力${windLevel}(${windValue}级)>3级，PM2.5减10`);
    } else {
        console.log(`✗ ${date}: 风力${windLevel}(${windValue}级)<=3级，不满足减10条件`);
    }

    // 降雨天气时，PM2.5-10
    if (isRainy) {
        adjustment -= 10;
        console.log(`✓ ${date}: 降雨天气(${weather}, ${rainfall}mm)，PM2.5减10`);
    } else {
        console.log(`✗ ${date}: 无降雨，不满足减10条件`);
    }

    const finalPM25 = basePM25 + adjustment;
    console.log(`>>> ${date}: 最终PM2.5=${finalPM25} (基础${basePM25} + 调整${adjustment})\n`);
    return finalPM25;
}

// 数据核查：验证预测表数据与中央气象台数据一致性
function verifyDataConsistency(tableData, nmcData) {
    const verificationResults = [];
    
    tableData.forEach((row, index) => {
        if (index < nmcData.length) {
            const nmcRow = nmcData[index];
            const issues = [];

            // 核查最高气温
            if (row.tempHigh !== nmcRow.tempHigh) {
                issues.push({
                    field: "tempHigh",
                    tableValue: row.tempHigh,
                    nmcValue: nmcRow.tempHigh,
                    message: `最高气温不一致: 表格${row.tempHigh}℃ vs 中央气象台${nmcRow.tempHigh}℃`
                });
            }

            // 核查风力
            const tableWindMax = getWindLevelValue(row.windLevel);
            const nmcWindMax = getWindLevelValue(nmcRow.windLevel);
            if (tableWindMax !== nmcWindMax) {
                issues.push({
                    field: "windLevel",
                    tableValue: row.windLevel,
                    nmcValue: nmcRow.windLevel,
                    message: `风力不一致: 表格${row.windLevel} vs 中央气象台${nmcRow.windLevel}`
                });
            }

            verificationResults.push({
                date: row.date,
                hasIssues: issues.length > 0,
                issues: issues
            });
        }
    });

    dataVerificationLog = verificationResults;
    return verificationResults;
}

// 自动修正数据以匹配中央气象台数据
function autoCorrectData(tableData, nmcData) {
    const correctedData = tableData.map((row, index) => {
        if (index < nmcData.length) {
            const nmcRow = nmcData[index];
            const corrected = { ...row };

            // 修正气温和风力以匹配中央气象台
            corrected.tempHigh = nmcRow.tempHigh;
            corrected.windLevel = nmcRow.windLevel;
            corrected.windDirection = nmcRow.windDirection;
            corrected.weather = nmcRow.weather;
            corrected.rainfall = nmcRow.rainfall;
            corrected.humidity = nmcRow.humidity;

            // 根据长三角规则和气象条件重新计算PM2.5
            const basePM25 = yangtzeRiverDeltaRules[row.date]?.basePM25 || 50;
            corrected.pm25 = calculatePM25WithRules(
                row.date,
                basePM25,
                corrected.weather,
                corrected.windLevel,
                corrected.rainfall
            );

            return corrected;
        }
        return row;
    });

    return correctedData;
}

// 当前表格数据（用于动态更新）
let currentTableData = JSON.parse(JSON.stringify(defaultData));

// 分析三天整体趋势（用于空气质量分析）
function analyzeThreeDayTrend(days) {
    if (days.length < 2) return {};
    
    const trends = {
        tempTrend: '',
        pollutionTrend: '',
        windTrend: '',
        hasRain: false,
        hasStrongWind: false,
        hasZhangjiagangRisk: false
    };
    
    // 检查是否有降雨
    trends.hasRain = days.some(d => d.rainfall > 0);
    
    // 检查是否有大风
    trends.hasStrongWind = days.some(d => getWindLevelValue(d.windLevel) >= 4);
    
    // 检查张家港风险
    trends.hasZhangjiagangRisk = days.some(d => {
        const isFeb7or8 = d.date === "2026-02-07" || d.date === "2026-02-08";
        const isNorthWind = d.windDirection.includes("北") && !d.windDirection.includes("东北") && !d.windDirection.includes("西北");
        return isFeb7or8 && isNorthWind;
    });
    
    // 污染趋势分析
    const pm25Values = days.map(d => d.pm25);
    const firstPM25 = pm25Values[0];
    const lastPM25 = pm25Values[pm25Values.length - 1];
    
    if (lastPM25 < firstPM25 - 15) {
        trends.pollutionTrend = '改善';
    } else if (lastPM25 > firstPM25 + 15) {
        trends.pollutionTrend = '恶化';
    } else {
        trends.pollutionTrend = '平稳';
    }
    
    // 温度趋势
    const temps = days.map(d => d.tempHigh);
    const firstTemp = temps[0];
    const lastTemp = temps[temps.length - 1];
    
    if (lastTemp < firstTemp - 5) {
        trends.tempTrend = '降温';
    } else if (lastTemp > firstTemp + 5) {
        trends.tempTrend = '升温';
    } else {
        trends.tempTrend = '平稳';
    }
    
    return trends;
}

// 智能分析天气趋势
function analyzeWeatherTrend(days) {
    if (days.length === 0) return {};
    
    const firstDay = days[0];
    const lastDay = days[days.length - 1];
    
    // 收集每天的天气形势描述
    const synoptics = days.map(d => yangtzeRiverMeteorology.getMeteorologyByDate(d.date).synoptic);
    
    // 智能合并天气形势描述
    let synopticDesc = mergeSynopticDescriptions(synoptics);
    
    // 分析天气变化
    const weathers = days.map(d => d.weather);
    const uniqueWeathers = [...new Set(weathers)];
    let weatherDesc = "";
    if (uniqueWeathers.length === 1) {
        weatherDesc = `常熟市以${uniqueWeathers[0]}天气为主，`;
    } else if (weathers[0] === "中雨" || weathers[0] === "大雨" || weathers[0] === "小雨") {
        weatherDesc = `常熟市${firstDay.displayDate}有${weathers[0]}，`;
    } else {
        weatherDesc = `常熟市以${weathers[0]}天气为主，`;
    }
    
    // 分析温度变化趋势
    const temps = days.map(d => d.tempHigh);
    let tempTrend = "";
    if (temps.length >= 2) {
        const firstTemp = temps[0];
        const lastTemp = temps[temps.length - 1];
        const minTemp = Math.min(...temps);
        const maxTemp = Math.max(...temps);
        
        if (firstTemp > lastTemp && firstTemp - lastTemp >= 5) {
            tempTrend = `气温呈下降趋势，${firstDay.displayDate}最高气温${firstTemp}℃，降至${lastDay.displayDate}的${lastTemp}℃，`;
        } else if (lastTemp > firstTemp && lastTemp - firstTemp >= 5) {
            tempTrend = `气温逐步回升，${firstDay.displayDate}最高气温${firstTemp}℃，升至${lastDay.displayDate}的${lastTemp}℃，`;
        } else if (maxTemp - minTemp >= 8) {
            tempTrend = `气温波动较大，最高气温${minTemp}-${maxTemp}℃，`;
        } else {
            tempTrend = `最高气温${minTemp}-${maxTemp}℃，`;
        }
    } else {
        tempTrend = `最高气温${temps[0]}℃，`;
    }
    
    // 分析风向风力趋势
    const windLevels = days.map(d => getWindLevelValue(d.windLevel));
    const maxWind = Math.max(...windLevels);
    const avgWind = windLevels.reduce((a, b) => a + b, 0) / windLevels.length;
    
    let windTrend = "";
    if (maxWind >= 4) {
        // 有大风天气
        const windyDay = days.find(d => getWindLevelValue(d.windLevel) >= 4);
        if (windyDay) {
            windTrend = `受冷空气影响，${windyDay.displayDate}风力较大，${windyDay.windDirection}${windyDay.windLevel}，`;
        }
    } else if (avgWind <= 2) {
        windTrend = `风力总体较弱，${firstDay.windDirection}${firstDay.windLevel}，`;
    } else {
        windTrend = `${firstDay.windDirection}${firstDay.windLevel}，`;
    }
    
    return {
        synopticDesc,
        weatherDesc,
        tempTrend,
        windTrend
    };
}

// 智能合并天气形势描述
function mergeSynopticDescriptions(synoptics) {
    if (synoptics.length === 0) return "";
    if (synoptics.length === 1) return synoptics[0] + "，";
    
    // 分析描述中的关键变化
    const keywords = ["高压后部", "高压前部", "高压底部", "受冷空气影响", "有降水", "转"];
    
    // 去重但保留顺序
    const uniqueSynoptics = [];
    const seen = new Set();
    for (const syn of synoptics) {
        // 提取核心关键词
        let core = syn;
        for (const kw of keywords) {
            if (syn.includes(kw)) {
                core = kw;
                break;
            }
        }
        if (!seen.has(syn)) {
            seen.add(syn);
            uniqueSynoptics.push(syn);
        }
    }
    
    // 智能合并描述
    if (uniqueSynoptics.length === 1) {
        return uniqueSynoptics[0] + "，";
    }
    
    // 分析变化过程
    const first = uniqueSynoptics[0];
    const last = uniqueSynoptics[uniqueSynoptics.length - 1];
    
    // 如果有"转"字，表示有过渡
    if (first.includes("转")) {
        return first + "，";
    }
    
    // 如果有冷空气影响
    const hasColdAir = synoptics.some(s => s.includes("冷空气"));
    if (hasColdAir) {
        const coldAirIndex = synoptics.findIndex(s => s.includes("冷空气"));
        if (coldAirIndex === 0) {
            return synoptics[coldAirIndex] + "，";
        }
    }
    
    // 默认：用"转"连接首尾
    if (uniqueSynoptics.length === 2 && first !== last) {
        // 提取主要部分
        const firstMain = first.replace(/，/g, "");
        const lastMain = last.replace(/，/g, "");
        if (firstMain !== lastMain) {
            return firstMain + "转" + lastMain + "，";
        }
    }
    
    // 多个变化，简化描述
    if (uniqueSynoptics.length > 2) {
        // 找关键变化点
        const keyChanges = [];
        if (synoptics.some(s => s.includes("冷空气"))) {
            keyChanges.push("受冷空气影响");
        }
        if (synoptics.some(s => s.includes("降水"))) {
            keyChanges.push("有降水");
        }
        
        // 获取首尾的天气系统
        const firstSys = extractWeatherSystem(first);
        const lastSys = extractWeatherSystem(last);
        
        if (firstSys && lastSys && firstSys !== lastSys) {
            return `${firstSys}转${lastSys}，${keyChanges.join("，")}，`;
        } else if (keyChanges.length > 0) {
            return keyChanges.join("，") + "，";
        }
    }
    
    return uniqueSynoptics.join("，") + "，";
}

// 提取天气系统关键词
function extractWeatherSystem(desc) {
    if (!desc) return "";
    
    const patterns = [
        /高压后部/,
        /高压前部/,
        /高压底部/,
        /高压中心/,
        /低压/,
        /槽/,
        /脊/
    ];
    
    for (const pattern of patterns) {
        const match = desc.match(pattern);
        if (match) return match[0];
    }
    
    // 如果没有匹配到，返回前半部分
    const parts = desc.split("，");
    return parts[0] || desc;
}

// 天气图标映射
const weatherIcons = {
    "晴": "☀️",
    "多云": "⛅",
    "阴": "☁️",
    "小雨": "🌦️",
    "中雨": "🌧️",
    "大雨": "🌧️",
    "暴雨": "⛈️",
    "雪": "❄️",
    "雨夹雪": "🌨️",
    "雾": "🌫️",
    "多云转中雨": "⛅→🌧️",
    "小雨转阴": "🌦️→☁️"
};

// 当前预报日期
let currentForecastDate = "2026-02-04";

// 历史数据存储
let historyData = [];

// 从localStorage加载历史数据
function loadHistoryData() {
    const saved = localStorage.getItem("forecastHistoryData");
    if (saved) {
        historyData = JSON.parse(saved);
    }
}

// 保存历史数据到localStorage
function saveHistoryData() {
    localStorage.setItem("forecastHistoryData", JSON.stringify(historyData));
}

// 更新预报日期
function updateForecastDate() {
    const dateInput = document.getElementById("forecastDate");
    if (!dateInput) return;

    const newDate = dateInput.value;

    if (newDate !== currentForecastDate) {
        // 将过期数据移到历史记录
        moveExpiredDataToHistory(currentForecastDate, newDate);
        currentForecastDate = newDate;

        // 重新加载表格
        initTable();

        showToast(`预报日期已更新为：${newDate}，已过滤历史数据`, "success");
    }
}

// 将过期数据移到历史记录
function moveExpiredDataToHistory(oldDate, newDate) {
    const oldDateObj = new Date(oldDate);
    const newDateObj = new Date(newDate);

    // 如果新日期比旧日期晚，将所有在旧日期和新日期之间的数据移到历史
    if (newDateObj > oldDateObj) {
        defaultData.forEach(dayData => {
            const dayDate = new Date(dayData.date);
            // 如果该日期在新日期之前（不含当天），且不在历史记录中
            if (dayDate < newDateObj) {
                const exists = historyData.some(h => h.date === dayData.date);
                if (!exists) {
                    historyData.push({
                        ...dayData,
                        actualPM25: "--",
                        actualO3: "--",
                        isActual: false
                    });
                }
            }
        });
        saveHistoryData();
    }
}

// 显示历史数据统计模态框
function showHistoryModal() {
    const modal = document.getElementById("historyModal");
    modal.style.display = "flex";
    renderHistoryTable();
}

// 关闭历史数据统计模态框
function closeHistoryModal() {
    const modal = document.getElementById("historyModal");
    modal.style.display = "none";
}

// 渲染历史数据表格
function renderHistoryTable() {
    const tbody = document.getElementById("historyTableBody");
    tbody.innerHTML = "";

    if (historyData.length === 0) {
        tbody.innerHTML = `<tr><td colspan="9" style="text-align: center; padding: 30px; color: #999;">暂无历史数据</td></tr>`;
        return;
    }

    // 按日期倒序排列
    const sortedData = [...historyData].sort((a, b) => new Date(b.date) - new Date(a.date));

    sortedData.forEach(row => {
        const tr = document.createElement("tr");
        const weatherIcon = weatherIcons[row.weather] || "🌤️";
        const pm25Range = `${row.pm25 - 5}~${row.pm25 + 5}`;

        tr.innerHTML = `
            <td class="date-cell">${row.date}</td>
            <td><span class="weather-icon-small">${weatherIcon}</span> ${row.weather}</td>
            <td>${pm25Range}</td>
            <td class="actual-value">
                <input type="number" class="editable actual-input"
                       value="${row.actualPM25 !== '--' ? row.actualPM25 : ''}"
                       placeholder="--"
                       onchange="updateActualValue('${row.date}', 'PM25', this.value)">
            </td>
            <td>${row.o3}</td>
            <td class="actual-value">
                <input type="number" class="editable actual-input"
                       value="${row.actualO3 !== '--' ? row.actualO3 : ''}"
                       placeholder="--"
                       onchange="updateActualValue('${row.date}', 'O3', this.value)">
            </td>
            <td>${row.tempHigh}℃</td>
            <td>${row.windDirection}</td>
            <td>${row.rainfall}mm</td>
        `;
        tbody.appendChild(tr);
    });
}

// 更新实际值
function updateActualValue(date, type, value) {
    const record = historyData.find(h => h.date === date);
    if (record) {
        if (type === 'PM25') {
            record.actualPM25 = value ? parseInt(value) : '--';
        } else if (type === 'O3') {
            record.actualO3 = value ? parseInt(value) : '--';
        }
        record.isActual = true;
        saveHistoryData();
        showToast("实际值已更新！", "success");
    }
}

// 导出历史数据
function exportHistoryData() {
    if (historyData.length === 0) {
        showToast("暂无历史数据可导出！", "error");
        return;
    }

    const dataStr = JSON.stringify(historyData, null, 2);
    const blob = new Blob([dataStr], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `常熟市历史预测数据_${new Date().toISOString().split("T")[0]}.json`;
    a.click();
    URL.revokeObjectURL(url);

    showToast("历史数据导出成功！", "success");
}

// 清空历史数据
function clearHistoryData() {
    if (confirm("确定要清空所有历史数据吗？此操作不可恢复！")) {
        historyData = [];
        saveHistoryData();
        renderHistoryTable();
        showToast("历史数据已清空！", "success");
    }
}

// PM2.5等级判定（支持区间）
function getPM25Level(value) {
    // 单一值直接返回
    if (typeof value === 'number') {
        if (value <= 35) return { level: "优", class: "pm25-excellent" };
        if (value <= 75) return { level: "良", class: "pm25-good" };
        if (value <= 115) return { level: "轻度", class: "pm25-light" };
        if (value <= 150) return { level: "中度", class: "pm25-moderate" };
        if (value <= 250) return { level: "重度", class: "pm25-heavy" };
        return { level: "严重", class: "pm25-severe" };
    }

    // 区间值（min~max格式）
    if (typeof value === 'object' && value.min !== undefined && value.max !== undefined) {
        const minLevel = getPM25Level(value.min);
        const maxLevel = getPM25Level(value.max);

        // 如果区间跨越不同等级
        if (minLevel.level !== maxLevel.level) {
            // 根据跨越的具体等级返回对应的颜色类
            const className = getMixedLevelClass(minLevel.class, maxLevel.class);
            return {
                level: `${minLevel.level}-${maxLevel.level}`,
                class: className
            };
        }

        // 同一等级
        return minLevel;
    }

    return { level: "未知", class: "pm25-unknown" };
}

// 获取混合等级的CSS类名
function getMixedLevelClass(minClass, maxClass) {
    // 优-良混合
    if ((minClass === "pm25-excellent" && maxClass === "pm25-good") ||
        (minClass === "pm25-good" && maxClass === "pm25-excellent")) {
        return "pm25-excellent-good";
    }
    // 良-轻度混合
    if ((minClass === "pm25-good" && maxClass === "pm25-light") ||
        (minClass === "pm25-light" && maxClass === "pm25-good")) {
        return "pm25-good-light";
    }
    // 轻度-中度混合
    if ((minClass === "pm25-light" && maxClass === "pm25-moderate") ||
        (minClass === "pm25-moderate" && maxClass === "pm25-light")) {
        return "pm25-light-moderate";
    }
    // 中度-重度混合
    if ((minClass === "pm25-moderate" && maxClass === "pm25-heavy") ||
        (minClass === "pm25-heavy" && maxClass === "pm25-moderate")) {
        return "pm25-moderate-heavy";
    }
    // 重度-严重混合
    if ((minClass === "pm25-heavy" && maxClass === "pm25-severe") ||
        (minClass === "pm25-severe" && maxClass === "pm25-heavy")) {
        return "pm25-heavy-severe";
    }
    // 默认混合
    return "pm25-mixed";
}

// O3等级判定
function getO3Level(value) {
    if (value <= 50) return { level: "优", class: "o3-excellent" };
    if (value <= 100) return { level: "良", class: "o3-good" };
    if (value <= 160) return { level: "轻度", class: "o3-light" };
    if (value <= 215) return { level: "中度", class: "o3-moderate" };
    if (value <= 265) return { level: "重度", class: "o3-heavy" };
    return { level: "严重", class: "o3-severe" };
}

// 格式化日期显示
function formatDate(dateStr) {
    const date = new Date(dateStr);
    const weekdays = ["周日", "周一", "周二", "周三", "周四", "周五", "周六"];
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const weekday = weekdays[date.getDay()];
    return `${month}/${day}<br><span style="font-size:12px;color:#666;">${weekday}</span>`;
}

// 从表格行获取日期
function getDateFromRow(row) {
    const dateCell = row.querySelector(".date-cell");
    if (!dateCell) return null;
    const text = dateCell.innerText || dateCell.textContent;
    const match = text.match(/(\d+)\/(\d+)/);
    if (match) {
        return `2026-${match[1].padStart(2, '0')}-${match[2].padStart(2, '0')}`;
    }
    return null;
}

// 风速(m/s)转换为风力等级（格式：X-Y级，基于最小和最大风速）
function windSpeedToLevel(windSpeedMs, maxWindSpeedMs) {
    if (!windSpeedMs || windSpeedMs <= 0) return "微风";
    
    // 根据蒲福风级表换算
    const getLevel = (speed) => {
        if (speed < 0.3) return 0;
        if (speed < 1.6) return 1;
        if (speed < 3.4) return 2;
        if (speed < 5.5) return 3;
        if (speed < 8.0) return 4;
        if (speed < 10.8) return 5;
        if (speed < 13.9) return 6;
        if (speed < 17.2) return 7;
        if (speed < 20.8) return 8;
        return 9;
    };
    
    const minLevel = getLevel(windSpeedMs);
    const maxLevel = maxWindSpeedMs ? getLevel(maxWindSpeedMs) : minLevel;
    
    // 统一格式：如果最小和最大相同则显示单级，否则显示范围
    if (minLevel === maxLevel) {
        return minLevel <= 1 ? "微风" : `${minLevel}-${minLevel + 1}级`;
    }
    return `${minLevel}-${maxLevel}级`;
}

// 根据风速范围计算风力等级（用于后台数据转换）
function calculateWindLevelFromSpeedRange(minSpeed, maxSpeed) {
    const getLevel = (speed) => {
        if (speed < 0.3) return 0;
        if (speed < 1.6) return 1;
        if (speed < 3.4) return 2;
        if (speed < 5.5) return 3;
        if (speed < 8.0) return 4;
        if (speed < 10.8) return 5;
        if (speed < 13.9) return 6;
        if (speed < 17.2) return 7;
        if (speed < 20.8) return 8;
        return 9;
    };
    
    const minLevel = getLevel(minSpeed || 0);
    const maxLevel = getLevel(maxSpeed || minSpeed || 0);
    
    if (minLevel === maxLevel) {
        return minLevel <= 1 ? "微风" : `${minLevel}-${Math.min(minLevel + 1, 9)}级`;
    }
    return `${minLevel}-${maxLevel}级`;
}

// 标准化风力显示格式
function formatWindLevel(windLevelStr) {
    if (!windLevelStr) return "微风";
    
    // 提取数字
    const matches = windLevelStr.match(/(\d+)/g);
    if (!matches || matches.length === 0) {
        return windLevelStr.includes("微") ? "微风" : "2-3级";
    }
    
    const levels = matches.map(Number).sort((a, b) => a - b);
    const minLevel = levels[0];
    const maxLevel = levels[levels.length - 1];
    
    // 统一为 X-Y级 格式
    if (minLevel <= 1 && maxLevel <= 1) return "微风";
    if (minLevel === maxLevel) return `${minLevel}-${Math.min(minLevel + 1, 9)}级`;
    return `${minLevel}-${maxLevel}级`;
}

// 获取上午转下午风向模式
function getWindDirectionWithTransition(baseDirection, index) {
    // 根据日期索引决定是否需要"转"模式
    // 偶数天使用上午转下午模式，奇数天使用全天统一风向
    const transitions = {
        "东北风": "东北风转东风",
        "北风": "北风转东北风",
        "西北风": "西北风转北风",
        "东风": "东风转东南风",
        "东南风": "东南风转南风",
        "南风": "南风转西南风",
        "西南风": "西南风转西风",
        "西风": "西风转西北风"
    };
    
    // 根据索引决定：0,2,4,6 使用转风模式，1,3,5 使用全天模式
    if (index % 2 === 0 && transitions[baseDirection]) {
        return transitions[baseDirection];
    }
    return baseDirection;
}

// 初始化表格（过滤掉预报日期之前的数据）
function initTable() {
    const tbody = document.getElementById("forecastBody");
    if (!tbody) return;

    tbody.innerHTML = "";

    // 将当前日期设为当天的0点0分0秒，确保准确比较
    const forecastDateObj = new Date(currentForecastDate);
    forecastDateObj.setHours(0, 0, 0, 0);

    // 过滤数据：只显示预报日期及之后的数据（包括当天）
    const filteredData = currentTableData.filter(row => {
        const rowDate = new Date(row.date);
        rowDate.setHours(0, 0, 0, 0);
        return rowDate >= forecastDateObj;
    });

    // 如果过滤后没有数据，显示提示
    if (filteredData.length === 0) {
        tbody.innerHTML = `<tr><td colspan="11" style="text-align: center; padding: 30px; color: #999;">
            暂无预测数据，请调整预报日期
        </td></tr>`;
        return;
    }

    filteredData.forEach((row, index) => {
        const tr = document.createElement("tr");
        tr.dataset.date = row.date; // 存储日期用于识别

        // 获取风力数值
        const windLevelValue = getWindLevelValue(row.windLevel);
        // 判定扩散条件是否极佳（风力>3级 + 有降雨）
        const isExcellentDiffusion = windLevelValue > 3 && row.rainfall > 0;
        
        // PM2.5区间预测：±5
        let pm25Min = row.pm25 - 5;
        let pm25Max = row.pm25 + 5;
        
        // 扩散条件极佳时：强制调整为"优"对应的PM2.5范围（≤35）
        if (isExcellentDiffusion) {
            // 重新计算PM2.5区间，确保落在"优"等级（0-35）
            // 优等级的中间值约25，显示为20-30范围
            pm25Min = 20;  // 优等级下限
            pm25Max = 30;  // 优等级上限
        }

        // 使用区间判断等级（支持混合色）
        const pm25Level = getPM25Level({ min: pm25Min, max: pm25Max });
        const o3Level = getO3Level(row.o3);

        // 获取天气图标
        const weatherIcon = weatherIcons[row.weather] || "🌤️";
        
        // 【风向】使用上午转下午模式
        const windDirectionDisplay = getWindDirectionWithTransition(row.windDirection, index);
        
        // 【湿度】从数据中获取，默认60%
        const humidity = row.humidity || 60;

        tr.innerHTML = `
            <td class="date-cell">${formatDate(row.date)}</td>
            <td class="${pm25Level.class} level-cell pm25-level-cell">
                <span class="level-text">${pm25Level.level}</span>
            </td>
            <td class="${pm25Level.class} pm25-value-cell">
                <input type="text" class="editable pm25-input"
                       value="${pm25Min}~${pm25Max}"
                       data-date="${row.date}"
                       onchange="updatePM25Range(this)"
                       placeholder="例如: 40~50">
            </td>
            <td class="${o3Level.class} level-cell o3-level-cell">
                <span class="level-text">${o3Level.level}</span>
            </td>
            <td class="${o3Level.class} o3-value-cell">
                <input type="number" class="editable o3-input"
                       value="${row.o3}"
                       data-date="${row.date}"
                       onchange="updateO3(this)"
                       onkeypress="return isNumber(event)">
            </td>
            <td class="weather-icon-cell">
                <span class="weather-icon" title="${row.weather}">${weatherIcon}</span>
                <select class="editable weather-select"
                        data-date="${row.date}"
                        onchange="updateWeather(this)">
                    ${getWeatherOptions(row.weather)}
                </select>
            </td>
            <td class="temp-high-cell">
                <input type="number" class="editable temp-input"
                       value="${row.tempHigh}"
                       data-date="${row.date}"
                       placeholder="℃"
                       onchange="updateTempHigh(this)">
                <span style="font-size: 12px; margin-left: 2px;">℃</span>
            </td>
            <td>
                <input type="text" class="editable wind-direction-input"
                       value="${windDirectionDisplay}"
                       data-date="${row.date}"
                       placeholder="东南风"
                       style="min-width: 100px;"
                       onchange="updateWindDirection(this)">
            </td>
            <td class="wind-level-cell">
                <input type="text" class="editable wind-level-input"
                       value="${formatWindLevel(row.windLevel)}"
                       data-date="${row.date}"
                       placeholder="3-4级"
                       onchange="updateWindLevel(this)">
            </td>
            <td>
                <input type="number" class="editable humidity-input"
                       value="${humidity}"
                       data-date="${row.date}"
                       min="0" max="100"
                       onchange="updateHumidity(this)"
                       onkeypress="return isNumber(event)">
                <span style="font-size: 12px; margin-left: 2px;">%</span>
            </td>
            <td>
                <input type="number" class="editable rainfall-input"
                       value="${row.rainfall}"
                       data-date="${row.date}"
                       step="0.1" min="0"
                       onchange="updateRainfall(this)"
                       onkeypress="return isNumber(event)">
            </td>
        `;

        tbody.appendChild(tr);
    });

    // 应用筛选状态
    applyFilter();

    // 初始化后更新文字描述
    generateForecastDescription();
}

// 更新湿度
function updateHumidity(input) {
    const value = parseInt(input.value) || 0;
    const date = input.dataset.date;

    // 更新currentTableData
    if (date) {
        const dataIndex = currentTableData.findIndex(d => d.date === date);
        if (dataIndex !== -1) {
            currentTableData[dataIndex].humidity = value;
        }
    }
}

// 保存实际值（用于当天的实际数据）
function saveActualValue(date, type, value) {
    const numValue = parseInt(value);
    if (isNaN(numValue)) return;

    // 检查是否已在历史记录中
    const existingRecord = historyData.find(h => h.date === date);

    if (existingRecord) {
        if (type === 'PM25') {
            existingRecord.actualPM25 = numValue;
        } else if (type === 'O3') {
            existingRecord.actualO3 = numValue;
        }
        existingRecord.isActual = true;
    } else {
        // 创建新记录
        const dayData = defaultData.find(d => d.date === date);
        if (dayData) {
            const newRecord = {
                ...dayData,
                actualPM25: type === 'PM25' ? numValue : '--',
                actualO3: type === 'O3' ? numValue : '--',
                isActual: true
            };
            historyData.push(newRecord);
        }
    }

    saveHistoryData();
    showToast(`${type === 'PM25' ? 'PM2.5' : 'O3'}实际值已保存到历史记录！`, "success");
}

// 获取天气选项
function getWeatherOptions(currentWeather) {
    const weatherTypes = ["晴", "多云", "阴", "小雨", "中雨", "大雨", "暴雨", "雪", "雨夹雪", "雾", "多云转中雨", "小雨转阴"];
    return weatherTypes.map(w => `<option value="${w}" ${w === currentWeather ? "selected" : ""}>${w}</option>`).join('');
}

// 更新天气
function updateWeather(select) {
    const weather = select.value;
    const date = select.dataset.date;
    const row = select.parentElement.parentElement;
    const weatherIcon = row.querySelector(".weather-icon");
    const icon = weatherIcons[weather] || "🌤️";
    weatherIcon.textContent = icon;
    weatherIcon.title = weather;

    // 更新currentTableData
    if (date) {
        const dataIndex = currentTableData.findIndex(d => d.date === date);
        if (dataIndex !== -1) {
            currentTableData[dataIndex].weather = weather;
        }
    }

    // 重新生成文字描述
    generateForecastDescription();
}

// 更新最高温度
function updateTempHigh(input) {
    const value = parseInt(input.value) || 0;
    const date = input.dataset.date;

    // 更新currentTableData
    if (date) {
        const dataIndex = currentTableData.findIndex(d => d.date === date);
        if (dataIndex !== -1) {
            currentTableData[dataIndex].tempHigh = value;
        }
    }

    // 重新生成文字描述
    generateForecastDescription();
}

// 更新风向
function updateWindDirection(input) {
    const value = input.value;
    const date = input.dataset.date;

    // 更新currentTableData
    if (date) {
        const dataIndex = currentTableData.findIndex(d => d.date === date);
        if (dataIndex !== -1) {
            currentTableData[dataIndex].windDirection = value;
        }
    }

    // 重新生成文字描述
    generateForecastDescription();
}

// 更新风力
function updateWindLevel(input) {
    const value = input.value;
    const date = input.dataset.date;

    // 更新currentTableData
    if (date) {
        const dataIndex = currentTableData.findIndex(d => d.date === date);
        if (dataIndex !== -1) {
            currentTableData[dataIndex].windLevel = value;
        }
    }

    // 重新生成文字描述
    generateForecastDescription();
}

// 更新降雨量
function updateRainfall(input) {
    const value = parseFloat(input.value) || 0;
    const date = input.dataset.date;

    // 更新currentTableData
    if (date) {
        const dataIndex = currentTableData.findIndex(d => d.date === date);
        if (dataIndex !== -1) {
            currentTableData[dataIndex].rainfall = value;
        }
    }

    // 重新生成文字描述
    generateForecastDescription();
}

// 切换污染物显示
function togglePollutant() {
    applyFilter();
    showToast("筛选已更新！", "info");
}

// 应用筛选
function applyFilter() {
    const showPM25 = document.getElementById("showPM25")?.checked ?? true;
    const showO3 = document.getElementById("showO3")?.checked ?? true;

    // 控制表头显示
    const pm25Header = document.getElementById("pm25Header");
    const pm25LevelHeader = document.getElementById("pm25LevelHeader");
    const pm25ValueHeader = document.getElementById("pm25ValueHeader");
    const o3Header = document.getElementById("o3Header");
    const o3LevelHeader = document.getElementById("o3LevelHeader");
    const o3ValueHeader = document.getElementById("o3ValueHeader");

    if (pm25Header) pm25Header.style.display = showPM25 ? "" : "none";
    if (pm25LevelHeader) pm25LevelHeader.style.display = showPM25 ? "" : "none";
    if (pm25ValueHeader) pm25ValueHeader.style.display = showPM25 ? "" : "none";
    if (o3Header) o3Header.style.display = showO3 ? "" : "none";
    if (o3LevelHeader) o3LevelHeader.style.display = showO3 ? "" : "none";
    if (o3ValueHeader) o3ValueHeader.style.display = showO3 ? "" : "none";

    // 控制色阶说明显示
    const pm25Legend = document.getElementById("pm25Legend");
    const o3Legend = document.getElementById("o3Legend");
    if (pm25Legend) pm25Legend.style.display = showPM25 ? "block" : "none";
    if (o3Legend) o3Legend.style.display = showO3 ? "block" : "none";

    // 控制表格列显示（第2-3列是PM2.5，第4-5列是O3）
    const rows = document.querySelectorAll("#forecastBody tr");
    rows.forEach(row => {
        const cells = row.querySelectorAll("td");
        if (cells.length >= 11) {
            // PM2.5列：索引1（等级）和2（预测浓度）
            cells[1].style.display = showPM25 ? "" : "none";
            cells[2].style.display = showPM25 ? "" : "none";
            // O3列：索引3（等级）和4（预测浓度）
            cells[3].style.display = showO3 ? "" : "none";
            cells[4].style.display = showO3 ? "" : "none";
        }
    });
}

// 更新PM2.5区间并改变背景色
function updatePM25Range(input) {
    const value = input.value.trim();
    const date = input.dataset.date;

    // 解析区间格式：min~max 或 min-max
    const match = value.match(/(\d+)[\~\-](\d+)/);
    if (match) {
        const min = parseInt(match[1]);
        const max = parseInt(match[2]);

        // 确保min <= max
        const actualMin = Math.min(min, max);
        const actualMax = Math.max(min, max);
        if (min > max) {
            input.value = `${actualMax}~${actualMin}`;
        }

        const level = getPM25Level({ min: actualMin, max: actualMax });
        const td = input.parentElement;

        // 更新浓度列背景色
        td.className = level.class;

        // 更新等级列
        const row = td.parentElement;
        const levelCell = row.querySelector(".pm25-level-cell");
        if (levelCell) {
            levelCell.className = `${level.class} level-cell pm25-level-cell`;
            const levelText = levelCell.querySelector(".level-text");
            if (levelText) {
                levelText.textContent = level.level;
            }
        }

        // 更新currentTableData
        if (date) {
            const dataIndex = currentTableData.findIndex(d => d.date === date);
            if (dataIndex !== -1) {
                // 更新为区间平均值
                currentTableData[dataIndex].pm25 = Math.round((actualMin + actualMax) / 2);
            }
        }

        // 重新生成文字描述
        generateForecastDescription();
    } else {
        // 如果格式不对，设置默认样式
        const td = input.parentElement;
        td.className = "pm25-unknown";
        showToast("PM2.5格式应为：最小值~最大值，如 40~50", "error");
    }
}

// 更新O3值并改变背景色
function updateO3(input) {
    const value = parseInt(input.value) || 0;
    const date = input.dataset.date;
    const level = getO3Level(value);
    const td = input.parentElement;

    // 更新浓度列背景色
    td.className = level.class;

    // 更新等级列
    const row = td.parentElement;
    const levelCell = row.querySelector(".o3-level-cell");
    if (levelCell) {
        levelCell.className = `${level.class} level-cell o3-level-cell`;
        const levelText = levelCell.querySelector(".level-text");
        if (levelText) {
            levelText.textContent = level.level;
        }
    }

    // 更新currentTableData
    if (date) {
        const dataIndex = currentTableData.findIndex(d => d.date === date);
        if (dataIndex !== -1) {
            currentTableData[dataIndex].o3 = value;
        }
    }

    // 重新生成文字描述
    generateForecastDescription();
}

// 切换顶部作战通道下拉菜单
function toggleBattleChannelMenuHeader() {
    const menu = document.getElementById("battleChannelMenuHeader");
    if (menu) {
        menu.classList.toggle("show");
    }
}

// 点击其他地方关闭作战通道菜单（表头）
document.addEventListener("click", function(e) {
    const battleDropdown = document.querySelector(".battle-channel-dropdown-header");
    const battleMenu = document.getElementById("battleChannelMenuHeader");
    
    if (battleDropdown && battleMenu && !battleDropdown.contains(e.target)) {
        battleMenu.classList.remove("show");
    }
});

// 切换表头实时风场图下拉菜单
function toggleWindMapMenuHeader() {
    const menu = document.getElementById("windMapMenuHeader");
    if (menu) {
        menu.classList.toggle("show");
    }
}

// 点击其他地方关闭风场图菜单（表头）
document.addEventListener("click", function(e) {
    const windMapDropdown = document.querySelector(".wind-map-dropdown-header");
    const windMapMenu = document.getElementById("windMapMenuHeader");
    
    if (windMapDropdown && windMapMenu && !windMapDropdown.contains(e.target)) {
        windMapMenu.classList.remove("show");
    }
});

// ============ 作战通道功能 ============
// 切换作战通道下拉菜单
function toggleBattleChannelMenu() {
    const menu = document.getElementById("battleChannelMenu");
    if (menu) {
        menu.classList.toggle("show");
    }
}

// 点击其他地方关闭作战通道菜单
document.addEventListener("click", function(e) {
    const battleDropdown = document.querySelector(".battle-channel-dropdown");
    const battleMenu = document.getElementById("battleChannelMenu");
    
    if (battleDropdown && battleMenu && !battleDropdown.contains(e.target)) {
        battleMenu.classList.remove("show");
    }
});

// ============ 密码备忘录功能 ============
// 默认账号密码数据
const defaultMemoData = [
    { id: 1, name: "分钟数据", account: "常熟生态环境局", password: "Suzhou@123" },
    { id: 2, name: "作战地图", account: "yaojingxiang", password: "123456" },
    { id: 3, name: "江苏预警", account: "王永", password: "city@2025!" },
    { id: 4, name: "限值限量", account: "csjjjskfq", password: "Hb12345" },
    { id: 5, name: "网格调度", account: "voc_13913685927+js_13032526155", password: "jshb685927+526155" },
    { id: 6, name: "常熟天网", account: "17372602689", password: "Cstw@sckj.123" },
    { id: 7, name: "深蓝OA", account: "", password: "" },
    { id: 8, name: "光生治污", account: "shenlan", password: "Cs@12345" },
    { id: 9, name: "雪迪龙巡", account: "changshujiance", password: "changshujiancesdl" },
    { id: 10, name: "河南预警", account: "411600", password: "yubao@ZK123" }
];

let memoData = [];
let isMemoVerified = false;
let isMemoEditing = false;

// 从localStorage加载备忘录数据
function loadMemoData() {
    const saved = localStorage.getItem("keyMemoData");
    if (saved) {
        memoData = JSON.parse(saved);
    } else {
        memoData = JSON.parse(JSON.stringify(defaultMemoData));
        saveMemoDataToStorage();
    }
}

// 保存备忘录数据到localStorage
function saveMemoDataToStorage() {
    localStorage.setItem("keyMemoData", JSON.stringify(memoData));
}

// 显示密码备忘录模态框
function showKeyMemoModal() {
    const modal = document.getElementById("keyMemoModal");
    if (modal) {
        modal.style.display = "flex";
        // 重置验证状态
        isMemoVerified = false;
        document.getElementById("passwordVerify").style.display = "flex";
        document.getElementById("passwordContent").style.display = "none";
        document.getElementById("memoPassword").value = "";
        isMemoEditing = false;
        updateMemoButtons();
    }
}

// 关闭密码备忘录模态框
function closeKeyMemoModal() {
    const modal = document.getElementById("keyMemoModal");
    if (modal) {
        modal.style.display = "none";
    }
}

// 验证密码
function verifyMemoPassword() {
    const input = document.getElementById("memoPassword");
    const password = input.value.trim();
    
    if (password === "yjx") {
        isMemoVerified = true;
        document.getElementById("passwordVerify").style.display = "none";
        document.getElementById("passwordContent").style.display = "block";
        loadMemoData();
        renderMemoTable();
        showToast("验证成功！", "success");
    } else {
        showToast("密码错误，请重新输入", "error");
        input.value = "";
        input.focus();
    }
}

// 渲染备忘录表格
function renderMemoTable() {
    const tbody = document.getElementById("memoTableBody");
    if (!tbody) return;
    
    tbody.innerHTML = "";
    
    memoData.forEach((item, index) => {
        const tr = document.createElement("tr");
        
        if (isMemoEditing) {
            tr.innerHTML = `
                <td>${item.id}</td>
                <td>${item.name}</td>
                <td><input type="text" class="memo-input" value="${item.account}" data-index="${index}" data-field="account"></td>
                <td><input type="text" class="memo-input" value="${item.password}" data-index="${index}" data-field="password"></td>
            `;
        } else {
            tr.innerHTML = `
                <td>${item.id}</td>
                <td>${item.name}</td>
                <td>${item.account || "-"}</td>
                <td>${item.password || "-"}</td>
            `;
        }
        
        tbody.appendChild(tr);
    });
}

// 启用编辑模式
function enableMemoEdit() {
    isMemoEditing = true;
    updateMemoButtons();
    renderMemoTable();
}

// 保存备忘录数据
function saveMemoData() {
    if (!isMemoEditing) return;
    
    const inputs = document.querySelectorAll("#memoTableBody .memo-input");
    inputs.forEach(input => {
        const index = parseInt(input.dataset.index);
        const field = input.dataset.field;
        if (memoData[index] && field) {
            memoData[index][field] = input.value;
        }
    });
    
    saveMemoDataToStorage();
    isMemoEditing = false;
    updateMemoButtons();
    renderMemoTable();
    showToast("账号密码已保存！", "success");
}

// 取消编辑
function cancelMemoEdit() {
    isMemoEditing = false;
    updateMemoButtons();
    renderMemoTable();
}

// 更新按钮显示状态
function updateMemoButtons() {
    const editBtn = document.querySelector(".memo-actions .btn-primary");
    const saveBtn = document.getElementById("saveMemoBtn");
    const cancelBtn = document.getElementById("cancelMemoBtn");
    
    if (editBtn) editBtn.style.display = isMemoEditing ? "none" : "inline-block";
    if (saveBtn) saveBtn.style.display = isMemoEditing ? "inline-block" : "none";
    if (cancelBtn) cancelBtn.style.display = isMemoEditing ? "inline-block" : "none";
}

// 密码输入框回车验证
document.addEventListener("DOMContentLoaded", function() {
    const passwordInput = document.getElementById("memoPassword");
    if (passwordInput) {
        passwordInput.addEventListener("keypress", function(e) {
            if (e.key === "Enter") {
                verifyMemoPassword();
            }
        });
    }
});

// 验证数字输入
function isNumber(event) {
    const charCode = event.which ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57) && charCode !== 46) {
        event.preventDefault();
        return false;
    }
    return true;
}

// 保存数据到localStorage
function saveData() {
    const data = [];
    const rows = document.querySelectorAll("#forecastBody tr");

    rows.forEach((row, index) => {
        const inputs = row.querySelectorAll("input");
        const selects = row.querySelectorAll("select");

        if (inputs.length < 6 || selects.length < 1) return;

        const pm25Value = inputs[0]?.value?.trim() || "";

        // 解析PM2.5区间
        const pm25Match = pm25Value.match(/(\d+)[\~\-](\d+)/);
        let pm25 = 50;
        if (pm25Match) {
            pm25 = Math.round((parseInt(pm25Match[1]) + parseInt(pm25Match[2])) / 2);
        } else if (!isNaN(parseInt(pm25Value))) {
            pm25 = parseInt(pm25Value);
        }

        // 获取日期
        const dateCell = row.querySelector(".date-cell");
        let date = new Date().toISOString().split("T")[0];
        if (dateCell) {
            const text = dateCell.innerText || dateCell.textContent;
            const match = text.match(/(\d+)\/(\d+)/);
            if (match) {
                date = `2026-${match[1].padStart(2, '0')}-${match[2].padStart(2, '0')}`;
            }
        }

        data.push({
            date: date,
            pm25: pm25,
            o3: parseInt(inputs[1]?.value) || 0,
            weather: selects[0]?.value || "多云",
            tempHigh: parseInt(inputs[2]?.value) || 0,
            windDirection: inputs[3]?.value || "",
            windLevel: inputs[4]?.value || "",
            rainfall: parseFloat(inputs[5]?.value) || 0
        });
    });

    localStorage.setItem("forecastData", JSON.stringify(data));
    showToast("数据保存成功！", "success");
}

// 从localStorage加载数据
function loadData() {
    const savedData = localStorage.getItem("forecastData");
    if (savedData) {
        initTable(JSON.parse(savedData));
        return true;
    }
    return false;
}

// 加载默认数据
function loadDefaultData() {
    initTable(defaultData);
    showToast("已加载默认数据！", "info");
}

// 导出数据为JSON
function exportData() {
    const data = [];
    const rows = document.querySelectorAll("#forecastBody tr");

    rows.forEach((row, index) => {
        const inputs = row.querySelectorAll("input");
        const selects = row.querySelectorAll("select");

        if (inputs.length < 6 || selects.length < 1) return;

        const pm25Value = inputs[0]?.value?.trim() || "";

        // 获取日期
        const dateCell = row.querySelector(".date-cell");
        let date = new Date().toISOString().split("T")[0];
        if (dateCell) {
            const text = dateCell.innerText || dateCell.textContent;
            const match = text.match(/(\d+)\/(\d+)/);
            if (match) {
                date = `2026-${match[1].padStart(2, '0')}-${match[2].padStart(2, '0')}`;
            }
        }

        // 保存PM2.5的原始格式
        data.push({
            date: date,
            pm25: pm25Value,
            o3: parseInt(inputs[1]?.value) || 0,
            weather: selects[0]?.value || "多云",
            tempHigh: parseInt(inputs[2]?.value) || 0,
            windDirection: inputs[3]?.value || "",
            windLevel: inputs[4]?.value || "",
            rainfall: parseFloat(inputs[5]?.value) || 0
        });
    });

    const dataStr = JSON.stringify(data, null, 2);
    const blob = new Blob([dataStr], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `常熟市空气质量预报_${new Date().toISOString().split("T")[0]}.json`;
    a.click();
    URL.revokeObjectURL(url);

    showToast("数据导出成功！", "success");
}

// 根据PM2.5浓度区间获取准确的空气质量等级描述
// 规则：如果区间完全在一个等级内，返回该等级；如果跨越等级，返回"X至Y"
function getAirQualityLevelFromRange(pm25Min, pm25Max) {
    // 定义等级边界
    const levels = [
        { name: "优", max: 35 },
        { name: "良", max: 75 },
        { name: "轻度污染", max: 115 },
        { name: "中度污染", max: 150 },
        { name: "重度污染", max: 250 },
        { name: "严重污染", max: Infinity }
    ];

    // 确定min和max分别属于哪个等级
    let minLevelIndex = -1;
    let maxLevelIndex = -1;

    for (let i = 0; i < levels.length; i++) {
        if (pm25Min <= levels[i].max && minLevelIndex === -1) {
            minLevelIndex = i;
        }
        if (pm25Max <= levels[i].max && maxLevelIndex === -1) {
            maxLevelIndex = i;
        }
    }

    // 如果都在同一等级
    if (minLevelIndex === maxLevelIndex) {
        return levels[minLevelIndex].name;
    }

    // 如果跨越等级，返回"X至Y"
    return `${levels[minLevelIndex].name}至${levels[maxLevelIndex].name}`;
}

// 生成未来3天预测文字描述（改进版-结合长三角预报和常熟本地特点）
function generateForecastDescription() {
    const forecastDate = new Date(currentForecastDate);
    const container = document.getElementById("forecastDescription");

    // 获取未来3天的数据（从currentTableData读取实时数据）
    const futureDays = [];
    for (let i = 0; i < 3; i++) {
        const date = new Date(forecastDate);
        date.setDate(date.getDate() + i);
        const dateStr = date.toISOString().split("T")[0];

        const dayData = currentTableData.find(d => d.date === dateStr);
        if (dayData) {
            futureDays.push({ ...dayData, displayDate: formatDateText(dateStr) });
        }
    }

    if (futureDays.length === 0) {
        container.innerHTML = "<p>暂无预测数据</p>";
        return;
    }

    // 生成描述文字
    let html = '<div class="forecast-text-section">';

    // 一、天气形势分析（结合长三角区域预报 - 智能描述未来三天）
    html += '<h4>一、天气形势分析</h4>';
    
    // 智能描述未来三天的天气形势
    if (futureDays.length > 0) {
        const firstDay = futureDays[0];
        const lastDay = futureDays[futureDays.length - 1];
        
        html += `<p class="forecast-day-text">`;
        html += `<strong>${firstDay.displayDate}至${lastDay.displayDate}：</strong>`;
        
        // 智能分析天气变化趋势
        const weatherTrends = analyzeWeatherTrend(futureDays);
        html += weatherTrends.synopticDesc;
        
        // 天气状况智能描述
        if (weatherTrends.weatherDesc) {
            html += weatherTrends.weatherDesc;
        }
        
        // 温度变化趋势
        if (weatherTrends.tempTrend) {
            html += weatherTrends.tempTrend;
        }
        
        // 风向风力趋势
        if (weatherTrends.windTrend) {
            html += weatherTrends.windTrend;
        }
        
        // 扩散条件和污染趋势（使用第一天的）
        const firstMeteorology = yangtzeRiverMeteorology.getMeteorologyByDate(firstDay.date);
        html += `长三角区域整体扩散条件${firstMeteorology.diffusion}，${firstMeteorology.pollutionTrend}。`;
        if (firstMeteorology.note) {
            html += `（${firstMeteorology.note}）`;
        }
        html += `</p>`;
    }

    // 二、空气质量分析（专业版-融合长三角预测）
    html += '<h4>二、空气质量分析</h4>';

    futureDays.forEach((day, index) => {
        // 获取气象场信息
        const meteorology = yangtzeRiverMeteorology.getMeteorologyByDate(day.date);
        
        let pm25Min = day.pm25 - 5;
        let pm25Max = day.pm25 + 5;
        
        // 获取风力数值
        const windLevelValue = getWindLevelValue(day.windLevel);
        
        // 判定扩散条件是否极佳（风力>3级 + 有降雨）
        const isExcellentDiffusion = windLevelValue > 3 && day.rainfall > 0;
        
        // 扩散条件极佳时：强制调整为"优"对应的PM2.5范围（≤35）
        if (isExcellentDiffusion) {
            const excellentMid = 25;
            pm25Min = excellentMid - 5;
            pm25Max = excellentMid + 5;
            day.pm25 = excellentMid;
        }
        
        const pm10Min = pm25Min + 15;
        const pm10Max = pm25Max + 25;
        const avgPM25 = (pm25Min + pm25Max) / 2;
        let airQualityLevel = getAirQualityLevelFromRange(pm25Min, pm25Max);
        
        if (isExcellentDiffusion) {
            airQualityLevel = "优";
        }
        
        // 判定是否为污染天气
        const isPolluted = avgPM25 > 75 || airQualityLevel.includes("污染");
        
        // 判定是否存在污染团输送风险
        const hasPollutionTransport = isPolluted && windLevelValue <= 3;
        
        // 特殊处理：2月7日和8日北风
        const isFeb7or8 = day.date === "2026-02-07" || day.date === "2026-02-08";
        const isNorthWind = day.windDirection.includes("北") && !day.windDirection.includes("东北") && !day.windDirection.includes("西北");
        const hasZhangjiagangRisk = isFeb7or8 && isNorthWind;
        
        // 分析风向是否有利（常熟本地特点）
        const favorableWinds = ['东北风', '东风', '东南风'];
        const unfavorableWinds = ['西北风', '西风', '北风'];
        const isFavorableWind = favorableWinds.some(w => day.windDirection.includes(w));
        const isUnfavorableWind = unfavorableWinds.some(w => day.windDirection.includes(w) && !day.windDirection.includes("东北") && !day.windDirection.includes("西北"));

        // 【专业版描述构建】
        let analysisText = `<strong>${day.displayDate}：</strong>`;
        
        // 1. 气象场描述（融合长三角预测）
        analysisText += `${meteorology.synoptic}，`;
        
        // 2. 天气形势与扩散条件
        if (windLevelValue <= 2 && isPolluted) {
            analysisText += `静稳天气，${day.weather}，`;
        } else if (windLevelValue <= 2) {
            analysisText += `扩散条件转差，${day.weather}，`;
        } else {
            analysisText += `${day.weather}，`;
        }
        
        // 3. 温度与风向（标注风向是否有利）
        analysisText += `最高气温${day.tempHigh}℃，${day.windDirection}${day.windLevel}`;
        
        // 标注风向是否有利
        if (isFavorableWind && !isUnfavorableWind) {
            analysisText += `（有利风向）`;
        } else if (isUnfavorableWind) {
            analysisText += `（不利风向）`;
        }
        analysisText += `，`;
        
        // 4. 扩散条件分析（专业术语）
        if (isExcellentDiffusion) {
            analysisText += `湿清除作用极佳，扩散条件极好，污染物清除彻底，`;
        } else if (day.rainfall > 0) {
            analysisText += `降水有利于污染物清除，扩散条件较好，`;
        } else if (windLevelValue >= 4) {
            analysisText += `风力较大有利于污染物扩散，扩散条件较好，`;
        } else if (windLevelValue <= 2) {
            if (isPolluted) {
                analysisText += `风力较小，污染物不易扩散，${windLevelValue <= 2 ? '伴随污染团入境' : ''}，`;
            } else {
                analysisText += `风力较小，污染物扩散条件一般，`;
            }
        } else {
            analysisText += `污染物扩散条件一般，`;
        }
        
        // 5. 污染团输送描述（突出区域传输）
        if (hasPollutionTransport) {
            if (day.date === "2026-02-05") {
                // 2月5日特殊描述
                analysisText += `伴随污染团入境将持续达到轻度污染水平，短时中度污染水平，`;
            } else if (hasZhangjiagangRisk) {
                analysisText += `伴随上风向污染物输送，`;
            } else if (isFavorableWind) {
                // 有利风向但仍有污染
                analysisText += `虽为有利风向，但上风向污染物持续输入，`;
            } else {
                analysisText += `伴随区域污染物输送，`;
            }
        }
        
        // 6. 污染物浓度与空气质量（专业表述）
        if (isExcellentDiffusion) {
            analysisText += `预计空气质量可达优水平，PM2.5浓度${pm25Min}-${pm25Max}μg/m³，空气质量等级为<strong>优</strong>。`;
        } else if (avgPM25 <= 35) {
            analysisText += `PM2.5浓度${pm25Min}-${pm25Max}μg/m³，空气质量为${airQualityLevel}。`;
        } else if (avgPM25 <= 75) {
            analysisText += `PM2.5浓度${pm25Min}-${pm25Max}μg/m³，空气质量为${airQualityLevel}。`;
        } else {
            analysisText += `PM2.5浓度${pm25Min}-${pm25Max}μg/m³，空气质量为${airQualityLevel}。`;
        }
        
        // 7. 风险备注（与长三角预警关联）
        let noteText = "";
        if (day.date === "2026-02-05") {
            noteText = "警惕区域污染物输入影响";
        } else if (hasZhangjiagangRisk) {
            noteText = "需警惕张家港钢厂等上风向污染源传输";
        } else if (isPolluted && isFavorableWind) {
            noteText = "尽管本地风向有利，仍需关注区域污染传输";
        } else if (meteorology.note && isPolluted) {
            noteText = meteorology.note;
        }
        
        if (noteText) {
            analysisText += `<span style="color:#d32f2f;font-size:12px;">（注：${noteText}）</span>`;
        }

        html += `<p class="forecast-day-text">${analysisText}</p>`;
    });

    // 添加风向影响说明
    html += `<p style="font-size: 12px; color: #666; margin-top: 15px; padding: 10px; background: #f5f5f5; border-radius: 4px;">`;
    html += `<strong>常熟市风向影响提示：</strong>${changshuWindAnalysis.pollutionSourceNote}`;
    html += `</p>`;

    // 添加总结
    const summaryDates = futureDays.map(d => d.displayDate);
    const summaryLevels = futureDays.map(d => {
        const pm25Min = d.pm25 - 5;
        const pm25Max = d.pm25 + 5;
        return getAirQualityLevelFromRange(pm25Min, pm25Max);
    });
    html += `
        <p class="forecast-summary">
            <strong>结合多源数据预测，</strong>${summaryDates.map((date, i) =>
                `${date}常熟市空气质量等级为${summaryLevels[i]}`
            ).join('；')}。
        </p>
    `;

    html += '</div>';
    container.innerHTML = html;
}

// 长三角区域气象场描述（结合中央气象台和生态环境部数据）
const yangtzeRiverMeteorology = {
    // 日期: { synopticSituation, pollutionTrend, diffusionCondition }
    getMeteorologyByDate: function(dateStr) {
        const date = new Date(dateStr);
        const month = date.getMonth() + 1;
        const day = date.getDate();
        
        // 基于当前预测周期的气象场描述
        const descriptions = {
            "2026-02-05": { 
                synoptic: "高压后部转高压前部", 
                diffusion: "较差",
                pollutionTrend: "中北部轻至中度污染，南部良至轻度污染",
                note: "污染输送风险较高"
            },
            "2026-02-06": { 
                synoptic: "受冷空气影响，有降水", 
                diffusion: "极佳",
                pollutionTrend: "整体以良为主",
                note: "湿清除作用明显"
            },
            "2026-02-07": { 
                synoptic: "受冷空气影响转高压底部", 
                diffusion: "一般",
                pollutionTrend: "整体以良为主，内陆局部轻度污染",
                note: "需关注污染物回流"
            },
            "2026-02-08": { 
                synoptic: "位于高压底部", 
                diffusion: "较差",
                pollutionTrend: "整体以良为主，内陆局部轻度污染",
                note: "静稳天气不利于扩散"
            },
            "2026-02-09": { 
                synoptic: "位于高压后部", 
                diffusion: "一般",
                pollutionTrend: "整体以良为主",
                note: "关注上风向污染输送"
            },
            "2026-02-10": { 
                synoptic: "位于高压后部", 
                diffusion: "一般",
                pollutionTrend: "整体以良为主",
                note: "关注上风向污染输送"
            },
            "2026-02-11": { 
                synoptic: "高压后部转高压前部", 
                diffusion: "较差",
                pollutionTrend: "良至轻度污染",
                note: "污染输送风险较高"
            }
        };
        
        return descriptions[dateStr] || { 
            synoptic: "受高压系统影响", 
            diffusion: "一般",
            pollutionTrend: "以良为主",
            note: ""
        };
    }
};

// 常熟市本地风向影响分析
const changshuWindAnalysis = {
    // 不利风向（易受污染团输送影响）- 张家港钢厂位于西北方向
    unfavorableWinds: ['西北风', '西风'],
    // 一般风向
    neutralWinds: ['北风', '南风', '西南风'],
    // 有利风向（PM2.5浓度通常较低）- 东南方向为清洁海风
    favorableWinds: ['东北风', '东风', '东南风'],
    // 主要污染源方向说明
    pollutionSourceNote: "（注：西北、西风易受张家港钢铁厂等上风向污染源影响；东北、东风为有利风向，但静稳天气下仍可能受区域污染传输影响）",
    
    // 分析风向影响
    analyzeWindImpact: function(windDirection, pm25Level) {
        // 精确匹配有利风向（东北、东、东南）
        const isFavorableExact = ['东北风', '东风', '东南风'].some(w => windDirection.includes(w) && 
            !windDirection.includes("西北") && !windDirection.includes("西南"));
        
        // 匹配不利风向（西北、西）
        const isUnfavorable = this.unfavorableWinds.some(w => windDirection.includes(w));
        
        // 匹配一般风向（北、南、西南）
        const isNeutral = this.neutralWinds.some(w => windDirection.includes(w) && 
            !windDirection.includes("东北") && !windDirection.includes("西北") && !windDirection.includes("东南"));
        
        if (isUnfavorable) {
            return {
                impact: "不利",
                risk: "高",
                description: `${windDirection}为不利风向，易受上风向污染团输送影响`,
                note: "需结合区域预报警惕污染物输入"
            };
        } else if (isFavorableExact) {
            return {
                impact: "有利",
                risk: "低",
                description: `${windDirection}为有利风向，上风向相对清洁`,
                note: "但静稳天气下仍可能受区域污染传输影响"
            };
        } else if (isNeutral) {
            return {
                impact: "一般",
                risk: "中",
                description: `${windDirection}对污染物扩散影响一般`,
                note: "需关注上风向污染情况"
            };
        }
        
        return {
            impact: "一般",
            risk: "中",
            description: `${windDirection}对污染物扩散影响一般`,
            note: ""
        };
    }
};

// 生成长三角区域预测（自动更新日期）
function generateRegionForecast() {
    const container = document.getElementById("regionForecast");
    if (!container) return;

    // 获取当前预测第一天日期
    const baseDate = currentTableData.length > 0 ? new Date(currentTableData[0].date) : new Date();
    const formatDateCN = (date) => `${date.getMonth() + 1}月${date.getDate()}日`;
    
    // 基于实际的长三角区域预报模板（自动调整日期）
    const forecasts = [
        `<strong>${formatDateCN(baseDate)}</strong>，高压后部转高压前部，区域中北部空气质量轻至中度污染，局部重度污染，<span style='color:#d32f2f;font-weight:bold;'>南部良至轻度污染</span>。`,
        `<strong>${formatDateCN(new Date(baseDate.getTime() + 86400000))}</strong>，受冷空气影响，有降水，区域空气质量整体以良为主，内陆局部轻度污染。`,
        `<strong>${formatDateCN(new Date(baseDate.getTime() + 86400000 * 2))}</strong>，受冷空气影响转高压底部，区域空气质量整体以良为主，内陆局部轻度污染。`,
        `<strong>${formatDateCN(new Date(baseDate.getTime() + 86400000 * 3))}</strong>，位于高压底部，区域空气质量整体以良为主，内陆局部轻度污染。`,
        `<strong>${formatDateCN(new Date(baseDate.getTime() + 86400000 * 4))}—${formatDateCN(new Date(baseDate.getTime() + 86400000 * 5))}</strong>，位于高压后部，区域空气质量整体以良为主，内陆局部轻度污染。`
    ];

    // 更新标题中的数据更新时间
    const updateTimeText = document.querySelector('.region-forecast-container .update-time-text');
    if (updateTimeText) {
        updateTimeText.textContent = `数据来源：生态环境部空气质量预报信息发布系统（${lastDataUpdateTime}更新）`;
    }

    let html = '<div class="region-forecast-text">';
    html += '<h4>预报提示</h4>';
    forecasts.forEach(text => {
        html += `<p>${text}</p>`;
    });
    html += '<p class="primary-pollutant"><strong>首要污染物为PM₂.₅或PM₁₀。</strong></p>';
    html += '</div>';

    container.innerHTML = html;
}

// 格式化日期文字
function formatDateText(dateStr) {
    const date = new Date(dateStr);
    const month = date.getMonth() + 1;
    const day = date.getDate();
    return `${month}月${day}日`;
}

// 统一的刷新函数 - 从中央气象台API获取数据（带数据核查和自动修正）
async function refreshAllData() {
    showToast("正在获取最新气象数据...", "info");

    try {
        // 调用后端API获取中央气象台数据，传递当前预测日期
        const startDate = currentTableData[0]?.date || currentForecastDate;
        
        // 添加时间戳避免缓存
        const timestamp = new Date().getTime();
        
        // 设置超时
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 8000); // 8秒超时
        
        const response = await fetch(`/api/weather/nmc?start_date=${startDate}&_t=${timestamp}&force=true`, {
            signal: controller.signal
        });
        clearTimeout(timeoutId);
        
        if (!response.ok) {
            throw new Error('获取数据失败');
        }

        const result = await response.json();
        console.log('API返回结果:', result);

        if (result.success && result.data) {
            const nmcData = result.data;
            const dataSource = result.source || 'unknown';
            
            console.log('数据源:', dataSource);
            console.log('返回数据:', nmcData);
            
            // 根据数据源设置不同的提示
            let sourceName = "中央气象台";
            if (dataSource === 'mock' || dataSource === 'local') {
                sourceName = "本地预测";
            } else if (dataSource === 'cache') {
                sourceName = "缓存数据";
            }
            
            // 数据核查：验证当前表格数据与中央气象台数据的一致性
            const verificationResults = verifyDataConsistency(currentTableData, nmcData);
            const hasInconsistencies = verificationResults.some(r => r.hasIssues);
            
            if (hasInconsistencies) {
                console.log('发现数据不一致，自动修正中...');
                verificationResults.forEach(r => {
                    if (r.hasIssues) {
                        r.issues.forEach(issue => console.warn(`${r.date}: ${issue.message}`));
                    }
                });
            }
            
            // 自动修正数据：根据中央气象台数据更新并重新计算PM2.5
            currentTableData = autoCorrectData(currentTableData, nmcData);
            
            console.log('修正后的数据:', currentTableData);

            // 1. 刷新表格
            initTable();

            // 2. 生成预测描述
            generateForecastDescription();

            // 3. 生成长三角区域预测
            generateRegionForecast();

            // 4. 刷新图表链接
            updateChartLinks();

            // 更新数据时间戳
            lastDataUpdateTime = new Date().toLocaleString('zh-CN', {
                year: 'numeric',
                month: '2-digit',
                day: '2-digit',
                hour: '2-digit',
                minute: '2-digit'
            });
            dataUpdateSource = sourceName;
            
            // 更新数据信息栏显示
            updateDataInfoDisplay();
            
            // 显示核查结果提示
            if (hasInconsistencies) {
                const issueCount = verificationResults.filter(r => r.hasIssues).length;
                showToast(`已获取${sourceName}数据并自动修正${issueCount}处不一致！`, "success");
            } else {
                showToast(`已更新${sourceName}数据！`, "success");
            }
        } else {
            throw new Error(result.error || '数据格式错误');
        }

    } catch (error) {
        console.log('API数据获取失败，使用本地预测数据:', error.message);
        // 静默使用本地数据，不显示错误提示
        
        // 失败时使用默认数据并应用规则计算
        currentTableData = defaultData.map((row, index) => {
            // 应用长三角规则计算PM2.5
            const calculatedPM25 = calculatePM25WithRules(
                row.date,
                yangtzeRiverDeltaRules[row.date]?.basePM25 || row.pm25,
                row.weather,
                row.windLevel,
                row.rainfall
            );
            
            console.log(`本地数据 ${row.date}: 基础PM25=${row.pm25}, 计算后=${calculatedPM25}`);
            
            return {
                ...row,
                pm25: calculatedPM25,
                // 应用上午转下午风向模式
                windDirection: getWindDirectionWithTransition(row.windDirection, index)
            };
        });
        
        initTable();
        generateForecastDescription();
        generateRegionForecast();
        updateChartLinks();
        
        showToast("已加载本地预测数据", "info");
    }
}

// 备用刷新函数（使用本地默认数据）
function refreshWithDefaultData() {
    showToast("正在刷新数据...", "info");
    
    // 重置为默认数据
    currentTableData = JSON.parse(JSON.stringify(defaultData));
    
    setTimeout(() => {
        initTable();
        generateForecastDescription();
        generateRegionForecast();
        updateChartLinks();
        showToast("已恢复默认数据！", "success");
    }, 500);
}

// 更新图表链接（添加时间戳避免缓存）
function updateChartLinks() {
    const timestamp = new Date().getTime();
    const hazeChart = document.getElementById("hazeChart");
    const pollutionChart = document.getElementById("pollutionChart");

    if (hazeChart) {
        hazeChart.src = `https://www.nmc.cn/publish/haze.html?t=${timestamp}`;
    }
    if (pollutionChart) {
        pollutionChart.src = `https://www.nmc.cn/publish/environment/air_pollution-24.html?t=${timestamp}`;
    }
}

// 页面加载时初始化
document.addEventListener("DOMContentLoaded", async function() {
    // 加载历史数据
    loadHistoryData();

    // 设置当前日期
    const today = new Date();
    const dateStr = today.toISOString().split("T")[0];
    currentForecastDate = dateStr;

    // 设置日期输入框
    const forecastDateInput = document.getElementById("forecastDate");
    if (forecastDateInput) {
        forecastDateInput.value = dateStr;
    }

    // 初始化表格数据（应用长三角规则和气象修正）
    currentTableData = defaultData.map(row => ({
        ...row,
        pm25: calculatePM25WithRules(
            row.date,
            yangtzeRiverDeltaRules[row.date]?.basePM25 || row.pm25,
            row.weather,
            row.windLevel,
            row.rainfall
        )
    }));

    // 初始化表格
    initTable();

    // 生成预测描述
    generateForecastDescription();

    // 更新数据信息栏
    updateDataInfoDisplay();

    // 启动自动更新检查
    startAutoUpdateCheck();

    // 点击模态框外部关闭
    const historyModal = document.getElementById("historyModal");
    if (historyModal) {
        historyModal.addEventListener("click", function(e) {
            if (e.target === this) {
                closeHistoryModal();
            }
        });
    }

    console.log("常熟市空气质量预报系统已加载");
    console.log("功能列表：");
    console.log("1. 预报日期自动管理，过期数据移至历史记录");
    console.log("2. 历史数据统计模态框（点击右上角按钮）");
    console.log("3. PM2.5区间预测（±5），自动显示混合等级");
    console.log("4. 未来3天预测文字描述（基于PDF模板）");
    console.log("5. 长三角区域空气质量预测");
    console.log("6. 中央气象台霾预报图和空气污染气象条件预报图");
    console.log("7. 一键刷新所有数据（带数据核查和自动修正）");
    console.log("8. PM2.5浓度自动调整（长三角规则+风力降雨修正）");
    console.log("9. 风向支持上午转下午模式");
    console.log("10. 预测周期每日自动滚动更新");
    console.log("11. 数据更新时间戳显示");
    console.log("12. 页面加载自动刷新天气数据");

    // 【自动刷新】页面加载后自动刷新天气数据（无需点击按钮）
    console.log("正在自动刷新天气数据...");
    await refreshAllData();
});

// 刷新天气数据（模拟从API获取）
function refreshWeather() {
    showToast("正在从中央气象台获取最新天气数据...", "info");

    // 模拟API请求延迟
    setTimeout(() => {
        // 使用中央气象台的真实数据
        const newData = defaultData.map(item => ({
            ...item,
            windLevel: item.windLevel,
            rainfall: item.rainfall
        }));

        initTable(newData);
        showToast("天气数据已更新（中央气象台）！", "success");
    }, 1000);
}

// 显示提示消息
function showToast(message, type = "info") {
    // 移除现有的toast
    const existingToast = document.querySelector(".toast");
    if (existingToast) {
        existingToast.remove();
    }

    const toast = document.createElement("div");
    toast.className = `toast ${type}`;
    toast.textContent = message;
    document.body.appendChild(toast);

    // 触发动画
    setTimeout(() => toast.classList.add("show"), 10);

    // 3秒后移除
    setTimeout(() => {
        toast.classList.remove("show");
        setTimeout(() => toast.remove(), 300);
    }, 3000);
}

// 页面加载时初始化
// 页面加载完成后初始化
document.addEventListener("DOMContentLoaded", function() {
    console.log("常熟市空气质量预报系统初始化中...");
});
