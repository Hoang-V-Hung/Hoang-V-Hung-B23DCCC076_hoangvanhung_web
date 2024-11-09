
function them(){
    let masv = document.getElementById('masv').value;
    let hoten = document.getElementById('hoten').value;
    let ngaysinh = document.getElementById('ngaysinh').value;
    let quequan = document.getElementById('quequan').value;
    let gioitinh = '';
    if(document.getElementById('nam').checked){
        gioitinh = document.getElementById('nam').value;
    }
    else if(document.getElementById('nu').checked) {
        gioitinh = document.getElementById('nu').value;
    }
//nhập mã sinh viên
    if(_.isEmpty(masv)){
        masv = '';
        document.getElementById('masv-error').innerHTML ='Vui lòng nhập mã sinh viên';
       
    }
    else if(masv.length < 10){
        masv = '';
        document.getElementById('masv-error').innerHTML ='Mã sinh viên không hợp lệ';
    }
    else {
        document.getElementById('masv-error').innerHTML = '';
    }
//nhâp họ tên
    if(_.isEmpty(hoten)){
        hoten = '';
        document.getElementById('hoten-error').innerHTML ='Vui lòng nhập họ tên';
       
    }
    else if(hoten.length < 2 || hoten.length > 50){
        hoten = '';
        document.getElementById('hoten-error').innerHTML ='Họ tên không hợp lệ';
    }
    else {
        document.getElementById('hoten-error').innerHTML = '';

    }
//nhập ngày sinh 
    if(_.isEmpty(ngaysinh)){
        ngaysinh = '';
        document.getElementById('ngaysinh-error').innerHTML ='Vui lòng chọn ngày sinh';
    }
    else {
        document.getElementById('ngaysinh-error').innerHTML ='';
    }
//nhập quê quán
    if(_.isEmpty(quequan)){
        quequan = '';
        document.getElementById('quequan-error').innerHTML ='Vui lòng nhập quê quán';
    }
    else if(quequan.length < 2){
        quequan = '';
        document.getElementById('quequan-error').innerHTML ='Quê quán không hợp lệ';
    }
    else {
        document.getElementById('quequan-error').innerHTML ='';
    }
//nhập giới tính
    if(_.isEmpty(gioitinh)){
        gioitinh = '';
        document.getElementById('gioitinh-error').innerHTML ='Vui lòng chọn giới tính';
    }
    else {
        document.getElementById('gioitinh-error').innerHTML ='';
    }
    

    if(masv && hoten && ngaysinh && quequan && gioitinh ){
        let sinhviens = localStorage.getItem('sinhviens') ? JSON.parse(localStorage.getItem('sinhviens')) : [] ;
        
        sinhviens.push({
            masv : masv,
            hoten : hoten,
            ngaysinh : ngaysinh,
            quequan : quequan,
            gioitinh : gioitinh,
        });

        localStorage.setItem('sinhviens', JSON.stringify(sinhviens));
        this.renderListStudent();
    };
}

function renderListStudent(){
    let sinhviens = localStorage.getItem('sinhviens') ? JSON.parse(localStorage.getItem('sinhviens')) : [] ;

    if(sinhviens.length == 0){
        document.getElementById('list-sv').style.display = 'none';
        return false ;
    } 

    document.getElementById('list-sv').style.display = 'block';


    let tableContent = `            
    <tr>
        <td width=3px>Stt</td>
        <td width=40px>Mã sinh viên</td>
        <td width=150px>Họ tên</td>
        <td width=55px>Giới tính</td>
        <td width=80px>Ngày sinh</td>
        <td width=80px>Quê quán</td>
        <td width=70px>Hành động</td>
    </tr`

    sinhviens.forEach((sinhvien,index) => {
        let masinhvien = index;
        let gioitinhs =parseInt(sinhvien.gioitinh) === 1 ? 'Nam' : 'Nữ';
        index++
        tableContent +=`
        <tr>
            <td>${index}</td>
            <td>${sinhvien.masv}</td>
            <td>${sinhvien.hoten}</td>
            <td>${gioitinhs}</td>
            <td>${sinhvien.ngaysinh}</td>
            <td>${sinhvien.quequan}</td>
            <td>
                <a href="#" onclick=''>Sửa</a> | <a href="#" onclick='xoasv(${masinhvien})'>Xoá</a>
            </td>

        </tr>`;
    })
    document.getElementById('ds-sv').innerHTML = tableContent;
}

function xoasv(id){
    let sinhviens = localStorage.getItem('sinhviens') ? JSON.parse(localStorage.getItem('sinhviens')) : [] ;
    sinhviens.splice(id,1);
    localStorage.setItem('sinhviens',JSON.stringify(sinhviens));
    renderListStudent();
}

