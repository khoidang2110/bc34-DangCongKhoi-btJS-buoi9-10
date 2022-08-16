function DanhSachNhanVien() {
    this.arr = [];
    this.themNV = function (nv) {
      this.arr.push(nv);
    };
    this._timViTriNV = function (taiKhoan) {
      var index = -1;
      this.arr.forEach(function (nv, i) {
        if (nv.taiKhoan=== taiKhoan) {
          index = i;
        }
      });
      return index;
    };
  
    this._xoaNV = function (taiKhoan) {
      /**
       * Tìm vị trí
       */
      var index = this._timViTriNV(taiKhoan);
  
      if (index !== -1) {
        this.arr.splice(index, 1);
      }
    };
    this._layThongTinNV = function (taiKhoan) {
      var nv = null;
      //tim vi tri nv
      var index = this._timViTriNV(taiKhoan);
      if (index !== -1) {
        nv = this.arr[index];
      }
      return nv;
    };
    this._capNhatNhanVien = function(nv){
  //tim vi tri
  var index = this._timViTriNV(nv.taiKhoan);
  if(index !==-1){
    this.arr[index] = nv;
  }
    };
    this._timKiemLoaiNhanVien = function(keyword){
    /**
     * 0. Tao mangTimkiem = []
     * 1. Duyet mảng this.arr => sv
     * 2. Kiểm tra sv.tenSV trùng với keyword?
     *      => true => thêm sv vào mangTimkiem;
     * 3. trả về mangTimKiem;
     */
  var mangTimKiem = [];
  
  this.arr.forEach(function(nv){
    //chuyen ten nv => chu thuong
    var nameLowerCase = nv.loai.toLowerCase();
    var keywordLowerCase = keyword.toLowerCase();
    //indexOf: tim kiem tuong doi
    if(nameLowerCase.indexOf(keywordLowerCase) !==-1){
      mangTimKiem.push(nv);
  }
  
  });
  return mangTimKiem;
    };
   
  
  }
  
  