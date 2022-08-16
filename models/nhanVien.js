function NhanVien(_taiKhoan,_tenNV,_email,_matKhau,_ngayLam,_luongCoBan,_chucVu,_gioLam){
    this.taiKhoan=_taiKhoan;
    this.tenNV = _tenNV;
    this.email = _email;
    this.matKhau = _matKhau;
    this.ngayLam = _ngayLam;
    this.luongCoBan = _luongCoBan;
    this.chucVu = _chucVu;
    this.gioLam = _gioLam;
    this.tongLuong = 0;
    this.loai = '';

    this.tinhTongLuong = function(){
        var select = chucVu.options[chucVu.selectedIndex].getAttribute('status');

        if(select==="sep"){
            this.tongLuong = _luongCoBan*3;
        }else if(select==="truongPhong")
        this.tongLuong = _luongCoBan*2;
        else{
            this.tongLuong= _luongCoBan;
        }

        };
     this.xepLoai = function(){
        if(_gioLam>=192){
            this.loai += "NV xuất sắc";
        }else if(_gioLam<192&&_gioLam>=176){
            this.loai += "NV giỏi";
        }else if(_gioLam<176&&_gioLam>=160){
            this.loai += "NV khá";
        }else if(_gioLam<160){
            this.loai += "NV trung bình";
        }
     };
    }
    