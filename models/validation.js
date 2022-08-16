//tao lop doi tuong
function Validation(){
    this.kiemTraRong = function (value,errorId,mess){
    
         if(value === ""){
            //error
            getEle(errorId).style.display = "block";
            getEle(errorId).innerHTML = mess;
            return false;
        } 
        //co return chan lai nen ko can ghi else van duoc
            getEle(errorId).style.display = "none";
            getEle(errorId).innerHTML = "";
            return true;
        
    };
    
    this.kiemTraDoDaiKiTu = function(value,errorId,mess,min,max){
    if(value.length >=min && value.length<=max){
    //true
    getEle(errorId).style.display = "none";
            getEle(errorId).innerHTML = "";
            return true;
        
    }
    getEle(errorId).style.display = "block";
            getEle(errorId).innerHTML = mess;
            return false;
    
    };
    this.kiemTraRangeNumber = function(value,errorId,mess,min,max){
        if(value >=min && value<=max){
        //true
        getEle(errorId).style.display = "none";
                getEle(errorId).innerHTML = "";
                return true;
            
        }
        getEle(errorId).style.display = "block";
                getEle(errorId).innerHTML = mess;
                return false;
        
        };
    
    this.kiemTraKiTuChuoi = function(value, errorId, mess){
        //check tu a-z co viet hoa viet thuong ko
    var letter = "^[a-zA-Z_ÀÁÂÃÈÉÊẾÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶ" + "ẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểếỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợ" + "ụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ\\s]+$";
    if (value.match(letter)){
        getEle(errorId).style.display = "none";
        getEle(errorId).innerHTML = "";
        return true;
    
    }
    getEle(errorId).style.display = "block";
    getEle(errorId).innerHTML = mess;
    return false;
    };
    
    this.kiemTraKiTuDacBiet = function(value, errorId,mess){
        //check pass co ki tu dac biet
        var letter = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{0,}$/;
        if (value.match(letter)){
            getEle(errorId).style.display = "none";
            getEle(errorId).innerHTML="";
            return true;
        }
        getEle(errorId).style.display = "block";
    getEle(errorId).innerHTML = mess;
    return false;
    };
    this.kiemTraEmail = function(value, errorId, mess){
        //check dau @ email
        var letter = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (value.match(letter)){
        getEle(errorId).style.display = "none";
        getEle(errorId).innerHTML ="";
        return true;
    }
    getEle(errorId).style.display="block";
    getEle(errorId).innerHTML = mess;
    return false;
    };
    this.kiemTraNgay = function(value,errorId,mess){
        var letter = /^((0?[1-9]|1[012])[- /.](0?[1-9]|[12][0-9]|3[01])[- /.](19|20)?[0-9]{2})*$/;
        if (value.match(letter)){
            getEle(errorId).style.display = "none";
            getEle(errorId).innerHTML ="";
            return true;
        }
        getEle(errorId).style.display="block";
        getEle(errorId).innerHTML = mess;
        return false;
    };
    this.kiemTraSo = function(value,errorId,mess){
        //check diem la so 0-9
        var number =  /^[0-9]+$/;
        if(value.match(number)){
            getEle(errorId).style.display = "none";
            getEle(errorId).innerHTML= "";
            return true;
        }
        getEle(errorId).style.display = "block";
        getEle(errorId).innerHTML = mess;
        return false;
    };
    //kiem tra chon khoa hoc, tu lam
    this.kiemtraSelect = function(value, errorId,mess){
    var select = value.options[value.selectedIndex].getAttribute('status');
       
        if (select=="no"){
            getEle(errorId).style.display = "block";
        getEle(errorId).innerHTML = mess;
        return false;
        }
        getEle(errorId).style.display = "none";
            getEle(errorId).innerHTML = "";
            return true;
    };
    //kiem tra khoa hoc, thay day
    this.checkChucVu =function(selectId,errorId,mess){
        //select xem la array vi tri 0 1 2....
        if(getEle(selectId).selectedIndex !== 0){
            getEle(errorId).style.display = "none";
            getEle(errorId).innerHTML = "";
            return true;
        }
            getEle(errorId).style.display = "block";
            getEle(errorId).innerHTML = mess;
            return false;
    };
    
    /*Tim kiem msnv
    
    */
    this.checkMaNVTonTai = function(value,errorId,mess,list){
        //tao flag(co), false la khong to tai
        //true la ton tai
    
        //cach 1
    //     var status = false;
    // list.forEach(function(sv){
    // if(value === sv.maSV){
    //     status=true;
    // }
    
    var status = list.some(function(nv){
      return value === nv.taiKhoan
    })
    
    if(status){
        getEle(errorId).style.display = "block";
        getEle(errorId).innerHTML = mess;
        return false;
    }
    
    
    getEle(errorId).style.display = "none";
        getEle(errorId).innerHTML = "";
        return true;
    
    
    
    };
    }