// 用戶下拉選單功能
const profileButton = document.querySelector('.profile-button');
const dropdownMenu = document.querySelector('.dropdown-menu');

profileButton.addEventListener('click', (e) => {
    e.stopPropagation();
    dropdownMenu.classList.toggle('show');
});

// 點擊其他地方關閉下拉選單
document.addEventListener('click', () => {
    dropdownMenu.classList.remove('show');
});

// 防止點擊下拉選單內容時關閉
dropdownMenu.addEventListener('click', (e) => {
    e.stopPropagation();
});

// 下拉選單項目點擊事件
const dropdownItems = document.querySelectorAll('.dropdown-item');
dropdownItems.forEach(item => {
    item.addEventListener('click', () => {
        console.log(`點擊了: ${item.textContent}`);
        dropdownMenu.classList.remove('show');
    });
});

// 日曆導航功能
const calendarNavs = document.querySelectorAll('.calendar-nav');
const calendarTitle = document.querySelector('.calendar-title');
const calendarGrid = document.querySelector('.calendar-grid');

const today = new Date();
let currentMonth = today.getMonth();  // 0-based
let currentYear = today.getFullYear();

const months = ['一月', '二月', '三月', '四月', '五月', '六月',
               '七月', '八月', '九月', '十月', '十一月', '十二月'];

const weekDays = ['日', '一', '二', '三', '四', '五', '六'];

// 獲取某月的天數
function getDaysInMonth(year, month) {
    return new Date(year, month + 1, 0).getDate();
}

// 獲取某月第一天是星期幾 (0=星期日, 1=星期一...)
function getFirstDayOfMonth(year, month) {
    return new Date(year, month, 1).getDay();
}

// 生成日曆
function generateCalendar() {
    const daysInMonth = getDaysInMonth(currentYear, currentMonth);
    const firstDay = getFirstDayOfMonth(currentYear, currentMonth);
    const today = new Date();
    const isCurrentMonth = today.getFullYear() === currentYear && today.getMonth() === currentMonth;
    const todayDate = today.getDate();

    // 清空現有內容
    calendarGrid.innerHTML = '';

    // 添加星期標題
    weekDays.forEach(day => {
        const dayHeader = document.createElement('div');
        dayHeader.className = 'calendar-day-header';
        dayHeader.textContent = day;
        calendarGrid.appendChild(dayHeader);
    });

    // 添加空白格子（上個月的最後幾天）
    for (let i = 0; i < firstDay; i++) {
        const emptyDay = document.createElement('div');
        emptyDay.className = 'calendar-day';
        calendarGrid.appendChild(emptyDay);
    }

    // 添加當月的日期
    for (let day = 1; day <= daysInMonth; day++) {
        const dayElement = document.createElement('div');
        dayElement.className = 'calendar-day';
        dayElement.textContent = day;

        // 標記今天
        if (isCurrentMonth && day === todayDate) {
            dayElement.classList.add('today');
        }

        // 添加點擊事件
        dayElement.addEventListener('click', () => {
            // 移除之前的選中狀態
            document.querySelectorAll('.calendar-day.selected').forEach(el => {
                el.classList.remove('selected');
            });
            // 添加選中狀態
            dayElement.classList.add('selected');
        });

        calendarGrid.appendChild(dayElement);
    }

    // 計算剩餘格子並填充下個月的前幾天
    const totalCells = calendarGrid.children.length - 7; // 減去星期標題
    const remainingCells = 42 - totalCells; // 6行x7列 - 已用格子

    for (let day = 1; day <= remainingCells && remainingCells < 7; day++) {
        const nextMonthDay = document.createElement('div');
        nextMonthDay.className = 'calendar-day next-month';
        nextMonthDay.textContent = day;
        calendarGrid.appendChild(nextMonthDay);
    }
}

// 更新日曆
function updateCalendar() {
    calendarTitle.textContent = `${currentYear}年 ${months[currentMonth]}`;
    generateCalendar();
}

// 上一個月
calendarNavs[0].addEventListener('click', () => {
    currentMonth--;
    if (currentMonth < 0) {
        currentMonth = 11;
        currentYear--;
    }
    updateCalendar();
});

// 下一個月
calendarNavs[1].addEventListener('click', () => {
    currentMonth++;
    if (currentMonth > 11) {
        currentMonth = 0;
        currentYear++;
    }
    updateCalendar();
});

// 初始化日曆
updateCalendar();

// 商店按鈕點擊效果
const shopButton = document.querySelector('.shop-button');
shopButton.addEventListener('click', () => {
    console.log('商店按鈕被點擊');
    // 這裡可以添加跳轉到商店頁面的邏輯
});

// 更多按鈕點擊效果
const moreButton = document.querySelector('.more-button');
moreButton.addEventListener('click', () => {
    console.log('更多按鈕被點擊');
    // 這裡可以添加顯示更多功能選單的邏輯
});

// 課程卡片點擊效果
const classCard = document.querySelector('.class-card');
classCard.addEventListener('click', () => {
    classCard.style.transform = 'scale(0.98)';
    setTimeout(() => {
        classCard.style.transform = 'scale(1)';
    }, 100);
});
