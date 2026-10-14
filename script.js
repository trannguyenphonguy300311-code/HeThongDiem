// ==========================================
// HỆ THỐNG ĐIỂM GIA ĐÌNH
// VERSION 2.0 OFFICIAL
// PHẦN A1
// ==========================================

// ===== KHỞI TẠO =====

const STORAGE_KEY = "HeThongDiem_V2";

let data = JSON.parse(localStorage.getItem(STORAGE_KEY));

if (!data) {

    data = {

        password: "123456",

        admin: false,

        childName: "Tên em",

        todayPoint: 5,

        weekPoint: 35,

        history: [],

        dailyHistory: [],

        stats: {

            viecNha: 5,

            veSinh: 5,

            thaiDo: 5,

            hocTap: 5,

            giupBoMe: 5,

            gioGiac: 5

        }

    };

}

// ===== LẤY HTML =====

const todayPoint = document.getElementById("todayPoint");
const weekPoint = document.getElementById("weekPoint");
const progress = document.getElementById("weekProgress");
const progressText = document.getElementById("progressText");
const history = document.getElementById("history");
const dailyHistory = document.getElementById("dailyHistory");
const childName = document.getElementById("childName");
const todayDate = document.getElementById("todayDate");
const wish = document.getElementById("wish");

// ===== LƯU =====

function save() {

    localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify(data)
    );

}

// ===== NGÀY GIỜ =====

function updateClock() {

    const now = new Date();

    todayDate.innerHTML =
        now.toLocaleString("vi-VN", {

            timeZone: "Asia/Ho_Chi_Minh",

            weekday: "long",

            day: "2-digit",

            month: "2-digit",

            year: "numeric",

            hour: "2-digit",

            minute: "2-digit"

        });

}

setInterval(updateClock,1000);

// ===== GIỜ =====

function getTime(){

    return new Date().toLocaleTimeString("vi-VN",{

        hour:"2-digit",

        minute:"2-digit"

    });

}

// ===== LỊCH SỬ =====

function addHistory(text){

    data.history.unshift(

        getTime()

        + " - "

        + text

    );

    if(data.history.length>100){

        data.history.pop();

    }

}

// ===== ĐĂNG NHẬP =====

function login(){

    if(data.admin){

        alert("Đã đăng nhập.");

        return;

    }

    let pass = prompt("Nhập mật khẩu");

    if(pass===null) return;

    if(pass===data.password){

        data.admin=true;

        alert("Đăng nhập thành công.");

    }else{

        alert("Sai mật khẩu.");

    }

    save();

}

// ===== ĐỔI TÊN =====

function changeName(){

    if(!data.admin){

        alert("Bạn chưa đăng nhập.");

        return;

    }

    let name = prompt("Tên mới");

    if(name===null) return;

    if(name.trim()=="") return;

    data.childName=name;

    save();

    render();

}

// ===== HIỂN THỊ =====

function render(){

    todayPoint.innerHTML=data.todayPoint;

    weekPoint.innerHTML=data.weekPoint;

    childName.innerHTML=data.childName;

    progress.value=data.weekPoint;

    progressText.innerHTML=

        data.weekPoint+" / 70 điểm";

    if(data.weekPoint>=60){

        wish.innerHTML="🎉 ĐỦ ĐIỀU KIỆN NHẬN ĐIỀU ƯỚC";

        wish.style.color="green";

    }

    else{

        wish.innerHTML=

        "Còn "+(60-data.weekPoint)+" điểm";

        wish.style.color="#dc2626";

    }

    history.innerHTML="";

    data.history.forEach(item=>{

        history.innerHTML+=

        "<li>"+item+"</li>";

    });

    dailyHistory.innerHTML="";

    data.dailyHistory.forEach(item=>{

        dailyHistory.innerHTML+=

        `<li>📅 ${item.date} - ⭐ ${item.point} điểm</li>`;

    });

    updateClock();

    save();

}
// ==========================================
// VERSION 2.0 OFFICIAL
// PHẦN A2
// ==========================================

// ===== BIỂU ĐỒ RADAR =====

const radar = new Chart(

    document.getElementById("radarChart"),

    {

        type: "radar",

        data: {

            labels: [

                "🧹 Việc nhà",

                "🚿 Vệ sinh",

                "😊 Thái độ",

                "📚 Học tập",

                "❤️ Giúp bố mẹ",

                "⏰ Giờ giấc"

            ],

            datasets: [{

                label: "Năng lực",

                data: [

                    data.stats.viecNha,

                    data.stats.veSinh,

                    data.stats.thaiDo,

                    data.stats.hocTap,

                    data.stats.giupBoMe,

                    data.stats.gioGiac

                ],

                backgroundColor: "rgba(37,99,235,.2)",

                borderColor: "#2563eb",

                borderWidth: 3,

                pointRadius: 4

            }]

        },

        options: {

            responsive: true,

            scales: {

                r: {

                    min: 0,

                    max: 10,

                    ticks: {

                        stepSize: 2

                    }

                }

            },

            plugins: {

                legend: {

                    display: false

                }

            }

        }

    }

);

// ===== CẬP NHẬT RADAR =====

function updateRadar(){

    radar.data.datasets[0].data = [

        data.stats.viecNha,

        data.stats.veSinh,

        data.stats.thaiDo,

        data.stats.hocTap,

        data.stats.giupBoMe,

        data.stats.gioGiac

    ];

    radar.update();

}

// ===== CHỈ SỐ =====

function tangChiSo(loai, diem){

    if(data.stats[loai] == undefined) return;

    data.stats[loai] += diem;

    if(data.stats[loai] > 10){

        data.stats[loai] = 10;

    }

}

function giamChiSo(loai, diem){

    if(data.stats[loai] == undefined) return;

    data.stats[loai] -= diem;

    if(data.stats[loai] < 0){

        data.stats[loai] = 0;

    }

}

// ===== CỘNG ĐIỂM =====

function congDiem(point, type){

    if(!data.admin){

        alert("Bạn chưa đăng nhập quản trị.");

        return;

    }

    data.todayPoint += point;

    if(data.todayPoint > 10){

        data.todayPoint = 10;

    }

    switch(type){

        case "Việc nhà":

            tangChiSo("viecNha",0.5);

            break;

        case "Vệ sinh":

            tangChiSo("veSinh",0.5);

            break;

        case "Giúp bố mẹ":

            tangChiSo("giupBoMe",0.5);

            break;

        case "Học tập":

            tangChiSo("hocTap",1);

            break;

    }

    addHistory("✅ "+type+" +"+point);

    render();

    updateRadar();

}

// ===== TRỪ ĐIỂM =====

function truDiem(point,type){

    if(!data.admin){

        alert("Bạn chưa đăng nhập quản trị.");

        return;

    }

    data.todayPoint -= point;

    if(data.todayPoint < 0){

        data.todayPoint = 0;

    }

    switch(type){

        case "Việc nhà":

            giamChiSo("viecNha",0.5);

            break;

        case "Vệ sinh":

            giamChiSo("veSinh",0.5);

            break;

        case "Thái độ":

            giamChiSo("thaiDo",1);

            break;

        case "Giờ giấc":

            giamChiSo("gioGiac",0.5);

            break;

    }

    addHistory("❌ "+type+" -"+point);

    render();

    updateRadar();

}
// ==========================================
// VERSION 2.0 OFFICIAL
// PHẦN B1
// ==========================================

// ===== LẤY NGÀY =====

function getDateVN(){

    return new Date().toLocaleDateString("vi-VN",{

        timeZone:"Asia/Ho_Chi_Minh"

    });

}

// ===== SANG NGÀY MỚI =====

function resetDay(){

    if(!data.admin){

        alert("Bạn chưa đăng nhập quản trị.");

        return;

    }

    if(!confirm("Xác nhận sang ngày mới?")){

        return;

    }

    // Lưu lịch sử ngày

    data.dailyHistory.unshift({

        date:getDateVN(),

        point:data.todayPoint

    });

    // Chỉ giữ 30 ngày gần nhất

    if(data.dailyHistory.length>30){

        data.dailyHistory.pop();

    }

    // Cộng điểm tuần

    data.weekPoint+=data.todayPoint;

    if(data.weekPoint>70){

        data.weekPoint=70;

    }

    addHistory(

        "🌞 Kết thúc ngày ("+

        data.todayPoint+

        " điểm)"

    );

    // Reset điểm ngày

    data.todayPoint=5;

    render();

    updateRadar();

}

// ===== RESET TUẦN =====

function resetWeek(){

    if(!data.admin){

        alert("Bạn chưa đăng nhập quản trị.");

        return;

    }

    if(!confirm("Reset tuần?")){

        return;

    }

    data.weekPoint=35;

    data.dailyHistory=[];

    addHistory("📅 Reset tuần");

    render();

    updateRadar();

}

// ===== ĐĂNG XUẤT =====

function logout(){

    data.admin=false;

    save();

    alert("Đã đăng xuất.");

}

// ===== THAY ĐỔI MẬT KHẨU =====

function changePassword(){

    if(!data.admin){

        alert("Bạn chưa đăng nhập.");

        return;

    }

    let pass=prompt("Nhập mật khẩu mới");

    if(pass===null) return;

    if(pass.trim().length<4){

        alert("Mật khẩu tối thiểu 4 ký tự.");

        return;

    }

    data.password=pass;

    save();

    alert("Đổi mật khẩu thành công.");

}
// ==========================================
// VERSION 2.0 OFFICIAL
// PHẦN B2
// ==========================================

// ===== KIỂM TRA ĐIỀU ƯỚC =====

function checkWish(){

    if(data.weekPoint>=60){

        wish.innerHTML="🎉 ĐỦ ĐIỀU KIỆN THỰC HIỆN MỘT NGUYỆN VỌNG";

        wish.style.color="#16a34a";

    }else{

        wish.innerHTML=

        "Còn "+(60-data.weekPoint)+" điểm";

        wish.style.color="#dc2626";

    }

}

// ===== XÓA LỊCH SỬ =====

function clearHistory(){

    if(!data.admin){

        alert("Bạn chưa đăng nhập.");

        return;

    }

    if(!confirm("Xóa toàn bộ lịch sử?")){

        return;

    }

    data.history=[];

    data.dailyHistory=[];

    render();

}

// ===== RESET TOÀN BỘ =====

function resetAll(){

    if(!data.admin){

        alert("Bạn chưa đăng nhập.");

        return;

    }

    if(!confirm("Reset toàn bộ dữ liệu?")){

        return;

    }

    localStorage.removeItem(STORAGE_KEY);

    location.reload();

}

// ===== KHỞI ĐỘNG =====

function init(){

    updateClock();

    updateRadar();

    checkWish();

    render();

}

// ===== TỰ CẬP NHẬT ĐIỀU ƯỚC =====

const oldRender = render;

render = function(){

    oldRender();

    checkWish();

}

// ===== CHẠY =====

init();