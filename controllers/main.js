var dsnv = new DanhSachNhanVien();
var validation = new Validation();
//lấy data từ localStorage
getLocalStorage();
function getEle(id) {
  return document.getElementById(id);
}
//isAdd la truyen vo gia tri true
function layThongTinNV(isAdd) {
  var taiKhoan = getEle("tknv").value;
  var tenNV = getEle("name").value;
  var email = getEle("email").value;
  var matKhau = getEle("password").value;
  var ngayLam = getEle("datepicker").value;
  var luongCoBan = getEle("luongCB").value;
  var chucVu = getEle("chucVu").value;
  var gioLam = getEle("gioLam").value;

  //isValid la true => form hop le
  var isValid = true;
  //&= tat ca dieu dung moi hien het

  //if true
  if (isAdd) {
    isValid &=
      validation.kiemTraRong(
        taiKhoan,
        "tbTKNV",
        "(*) Vui lòng nhập tài khoản"
      ) &&
      validation.kiemTraDoDaiKiTu(
        taiKhoan,
        "tbTKNV",
        "(*) Vui lòng nhập 4-6 kí tự",
        4,
        6
      ) &&
      validation.checkMaNVTonTai(
        taiKhoan,
        "tbTKNV",
        "(*) MaNV này bị trùng",
        dsnv.arr
      );
  }

  isValid &=
    validation.kiemTraRong(tenNV, "tbTen", "(*) Vui lòng nhập tên nhân viên") &&
    validation.kiemTraKiTuChuoi(tenNV, "tbTen", "(*) Vui lòng không nhập số");
  isValid &=
    validation.kiemTraRong(email, "tbEmail", "(*) Vui lòng nhập email") &&
    validation.kiemTraEmail(
      email,
      "tbEmail",
      "(*) Vui lòng nhập đúng định dạng email"
    );
  isValid &=
    validation.kiemTraRong(
      matKhau,
      "tbMatKhau",
      "(*) Vui lòng nhập mật khẩu"
    ) &&
    validation.kiemTraKiTuDacBiet(
      matKhau,
      "tbMatKhau",
      "(*) Vui lòng nhập kí tự đặc biệt"
    ) &&
    validation.kiemTraDoDaiKiTu(
      matKhau,
      "tbMatKhau",
      "(*) Vui lòng nhập từ 6-10 kí tự",
      6,
      10
    );
  isValid &=
    validation.kiemTraRong(ngayLam, "tbNgay", "(*) Vui lòng nhập ngày làm") &&
    validation.kiemTraNgay(
      ngayLam,
      "tbNgay",
      "(*) Vui lòng nhập định dạng mm/dd/yyyy"
    );

  isValid &=
    validation.kiemTraRong(
      luongCoBan,
      "tbLuongCB",
      "(*) Vui lòng nhập lương cơ bản"
    ) &&
    validation.kiemTraSo(luongCoBan, "tbLuongCB", "(*)Vui lòng nhập số") &&
    validation.kiemTraRangeNumber(
      luongCoBan,
      "tbLuongCB",
      "(*)Vui lòng nhập từ 1tr-20tr",
      1000000,
      20000000
    );
  isValid &= validation.checkChucVu(
    "chucVu",
    "tbChucVu",
    "(*) Vui lòng chọn chức vụ"
  );
  isValid &=
    validation.kiemTraRong(gioLam, "tbGioLam", "(*) Vui lòng nhập giờ làm") &&
    validation.kiemTraSo(gioLam, "tbGioLam", "(*)Vui lòng nhập số") &&
    validation.kiemTraRangeNumber(
      gioLam,
      "tbGioLam",
      "(*)Vui lòng nhập từ 80-200",
      80,
      200
    );

  ///cach phu dinh chi 1 dong
  if (!isValid) return null;

  //Tao doi tuong NV
  var nhanVien = new NhanVien(
    taiKhoan,
    tenNV,
    email,
    matKhau,
    ngayLam,
    luongCoBan,
    chucVu,
    gioLam
  );

  //Tinh tong luong
  nhanVien.tinhTongLuong();
  nhanVien.xepLoai();
  return nhanVien;
}

/**
 * them NV
 */

getEle("btnThemNV").addEventListener("click", function () {
  /**
   * Dom toi cac the input lay value
   */

  var nhanVien = layThongTinNV(true);

  // ham if de neu thong tin rong thi ko add vao storage
  if (nhanVien) {
    //Them nv vao mang arr

    dsnv.themNV(nhanVien);

    //gọi hàm setLocalStorage để lưu data
    setLocalStorage();
    renderTable(dsnv.arr);
  }
});
//tao ra table
function renderTable(data) {
  var content = "";
  data.forEach(function (nv) {
    /**
     * ES6 -String template
     */

    content += `
<tr>
    <td>${nv.taiKhoan}</td>
    <td>${nv.tenNV}</td>
    <td>${nv.email}</td>
    <td>${nv.ngayLam}</td>
    <td>${nv.chucVu}</td>
    <td>${nv.tongLuong}</td>
    <td>${nv.loai}</td>
    <td>
    <button class = "btn btn-info" onclick="suaNV('${nv.taiKhoan}')">Sửa</button>
    <button class="btn btn-danger" onclick="xoaNV('${nv.taiKhoan}')">Xoá</button>
    </td>
</tr>
`;
  });
  getEle("tableDanhSach").innerHTML = content;
}

//Luu du lieu vao local storage cua web
function setLocalStorage() {
  //convert tu JSON => string moi luu len storage web duoc, web ko nhan value, chi nhan string
  var dataString = JSON.stringify(dsnv.arr);
  //luu xuong localStorage
  localStorage.setItem("DanhSachNhanVien", dataString);
}

function getLocalStorage() {
  //ham if de check xem co san data ko, co data moi chay ham nay, ko thi ko can chay ham nay
  if (localStorage.getItem("DanhSachNhanVien")) {
    var dataString = localStorage.getItem("DanhSachNhanVien");
    //convert string =>JSON
    var dataJson = JSON.parse(dataString);
    // moi khi reload dsnv se la chuoi rong nen phai truyen dataJson tu local storage vao
    dsnv.arr = dataJson;
    //hiển thị dsnv ra ngoài table
    renderTable(dataJson);
  }
}

function xoaNV(taiKhoan) {
  dsnv._xoaNV(taiKhoan);
  //load lai table
  renderTable(dsnv.arr);
  setLocalStorage();
}

function suaNV(taiKhoan) {
    document.getElementById("btnThem").click();

    var element = getEle("btnThemNV");
    var hidden = element.getAttribute("hidden");
    if (!hidden) {
     element.setAttribute("hidden", "hidden");
  } 

  var element = getEle("btnCapNhat");
  var hidden = element.getAttribute("hidden");
  if (hidden) {
      element.removeAttribute("hidden");
} 

  var nv = dsnv._layThongTinNV(taiKhoan);
  //kiem tra neu nv khac null
  if (nv) {
    // Dom toi cac the input show value
    getEle("tknv").value = nv.taiKhoan;
    //disabled #txtmasv
    getEle("tknv").disabled = true;
    getEle("name").value = nv.tenNV;
    getEle("email").value = nv.email;
    getEle("password").value = nv.matKhau;
    getEle("datepicker").value = nv.ngayLam;
    getEle("luongCB").value = nv.luongCoBan;
    getEle("chucVu").value = nv.chucVu;
    getEle("gioLam").value = nv.gioLam;
  }

}

/**
 * cap nhat NV
 */
getEle("btnCapNhat").addEventListener("click", function () {
  //lay value tu cac the input

  //false de khong bi chan cap nhat nv
  var nhanVien = layThongTinNV(false);

  dsnv._capNhatNhanVien(nhanVien);
  //cap nhat danh sach lai local storage
  renderTable(dsnv.arr);
  setLocalStorage();


// sau khi cap nhat xoa trang
    getEle("tknv").value = '';
    getEle("tknv").disabled = false;
    getEle("name").value = '';
    getEle("email").value ='' ;
    getEle("password").value ='' ;
    getEle("datepicker").value ='' ;
    getEle("luongCB").value = '';
    getEle("chucVu").value = '';
    getEle("gioLam").value = '';


    var element = getEle("btnThemNV");
    var hidden = element.getAttribute("hidden");
    if (hidden) {
        element.removeAttribute("hidden");
  } 
    
  var element = getEle("btnCapNhat");
  var hidden = element.getAttribute("hidden");
  if (!hidden) {
   element.setAttribute("hidden", "hidden");
} 

document.getElementById("btnDong").click();
});

//tim kiem nv

getEle("searchName").addEventListener("keyup",function(){
    var keyword = getEle("searchName").value;
   var mangTimKiem = dsnv._timKiemLoaiNhanVien(keyword);
   renderTable(mangTimKiem);
})

getEle("btnDong").addEventListener("click", function () {
    var element = getEle("btnThemNV");
    var hidden = element.getAttribute("hidden");
    if (hidden) {
        element.removeAttribute("hidden");
  } 
    
  var element = getEle("btnCapNhat");
  var hidden = element.getAttribute("hidden");
  if (!hidden) {
   element.setAttribute("hidden", "hidden");
} 
getEle("tknv").value = '';
getEle("tknv").disabled = false;
getEle("name").value = '';
getEle("email").value ='' ;
getEle("password").value ='' ;
getEle("datepicker").value ='' ;
getEle("luongCB").value = '';
getEle("chucVu").value = '';
getEle("gioLam").value = '';

});