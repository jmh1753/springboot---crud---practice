var app = {
    $wrapper : $wrapper = document.querySelector('#wrapper'),
    init : init
};

var user = {
    login_form : login_form,
    login : login,
    loginok : loginok,
    loginok_form : loginok_form,
    update : update,
    update_form : update_form,
    
};

var admin = {
    admin_login : admin_login,
    list : list,
    list_form : list_form,
    list_row : list_row
}

var session = {
    set_value : set_value,
    get_value : get_value
};

function set_value(key,value){
    sessionStorage.setItem(key, value);
}
function get_value(x){
    return sessionStorage.getItem(x);
}

function init(){
    $wrapper.innerHTML = user.login_form();
    document.getElementById('confirmbtn')
            .addEventListener('click', e=>{
                e.preventDefault();
                alert("로그인 버튼 클릭");
                user.login({lid : 'loginid', lpwd : 'loginpwd', domain : 'login'});
            });
    
    document.getElementById('adminbtn')
            .addEventListener('click',e=>{
                e.preventDefault();
                alert("관리자버튼 클릭");
                admin.admin_login();
            })
};


function login_form(){
    return '<h2>로그인페이지</h2>'+
            'ID<br><input type="text" id="loginid"><br>'+
            'PWD<br><input type="text" id="loginpwd"><br>'+
            '<input type="button" id="confirmbtn" value="확인">'+
            '<input type="button" id="adminbtn" value="관리자">'
};

function login(x){  
    id = document.getElementById(x.lid).value;
    pwd = document.getElementById(x.lpwd).value;
  
    let xhr = new XMLHttpRequest();
    xhr.open('GET', x.domain+'/'+id+'/'+pwd, true);
    xhr.setRequestHeader('Content-type','application/json; charset=utf-8');
    xhr.onload=()=>{
        if(xhr.readyState===4 && xhr.status===200){
            let d = JSON.parse(xhr.responseText);  
          
            alert("d : " + d);
            if(d){
                if(x.domain === 'login'){
                    alert("로그인성공폼");
                    user.loginok(d);
                }else{
                    alert("로그인실패");
                    user.login_form();
                }    
            }
        }else {
            alert("ajax 실패");
        }
    }
    xhr.send();
};



function loginok(x){
    $wrapper.innerHTML = user.loginok_form(x);
    document.getElementById('updatebtn')
            .addEventListener('click', e=>{
                e.preventDefault();
                alert("수정버튼클릭");
                user.update(x);
            });
    document.getElementById('deletebtn')
            .addEventListener('click', e=>{
                e.preventDefault();
                alert("삭제버튼클릭 : " + x.userid);
                let xhr = new XMLHttpRequest();
                xhr.open('DELETE', 'login/'+x.userid, true);
                xhr.onload=()=>{
                    if(xhr.readyState===4 && xhr.status===200){
                        let d = JSON.parse(xhr.responseText);
                        alert(d.result);
                        if(d.result === "탈퇴성공"){
                            alert("탈퇴성공");
                            app.init();
                        }else{
                            alert("탈퇴실패");
                        }
                    }
                };
                xhr.send();
            });
  
     
};

function loginok_form(d){
    // return '<h2>로그인 성공!</h2>'+
    //         '<h3>id : '+session.get_value('lid')+'</h3>' +
    //         '<h3>비밀번호 : '+session.get_value('lpassword')+'</h3>' +
    //         '<h3>주소 : '+session.get_value('lname')+'</h3>' +
    //         '<h3>폰번호 : '+session.get_value('lphone')+'</h3>' 
    return '<h2>로그인 성공!</h2>' +
            'id : '+d.userid +'<br>' +
            'pwd : '+d.password +'<br>' +
            'phone : '+d.phone +'<br>' +
            'address : '+d.address +'<br><br>' +
            '<input type="button" id="updatebtn" value="회원수정">'+
            '<input type="button" id="deletebtn" value="회원탈퇴">'
};

function update(x){
    let wrapper = document.querySelector('#wrapper');
    wrapper.innerHTML = user.update_form(x);
    document.getElementById('updategobtn')
            .addEventListener('click', e=>{
                e.preventDefault();
                alert("수정완료 버튼클릭");
                let data = {
                    userid : document.getElementById('userid').innerText,
                    password : document.getElementById('updatepwd').value,
                    phone : document.getElementById('updatephone').value,
                    address : document.getElementById('updateaddress').value
                } 
                alert("id : " + data.userid);
                alert("pwd : " + data.password);
                alert("phone : " + data.phone);
                alert("address : " + data.address);

                let xhr = new XMLHttpRequest();
                xhr.open('PUT', 'login/'+data.userid, true);
                xhr.setRequestHeader('Content-type','application/json; charset=utf-8');
                xhr.onload=()=>{
                    if(xhr.readyState===4 && xhr.status===200){
                        let d = JSON.parse(xhr.responseText);
                        alert("수정이 완료되었습니다.");
                        user.loginok_form(d);
                    }
                };
     
                xhr.send(JSON.stringify(data));


            })
}

function update_form(x){
    return '<h2>수정</h2>'+
            'id : <span id="userid">'+x.userid+'</span><br>'+
            'pwd : <input type="text" id="updatepwd" value="'+x.password+'"><br>' +
            'phone : <input type="text" id="updatephone" value="'+x.phone+'"><br>' +
            'address : <input type="text" id="updateaddress" value="'+x.address+'"><br><br>' +
            '<input type="button" id="updategobtn" value="수정완료">'
}




function admin_login(){
    let isadmin = confirm("관리자입니까?");
    if(isadmin){
        let pass = prompt("관리자번호를 입력하세요");
        if(pass ==1000){
            admin.list();
        }else{
            alert("비밀번호를 잘못 입력하셨습니다.");
        }
    }else{
        alert("관리자만 접속이 가능합니다.");
    }
};

function list_form(){
    return '<h2>고객목록</h2>'+
    '<table id="customer-table">'+
        '<tr>'+
            '<th>아이디</th>'+
            '<th>비밀번호</th>'+
            '<th>전화번호</th>'+
            '<th>주소</th>'+
        '</tr>'+  
        '<tbody id="tbody">'+
        '</tbody>'+
    '</table>';        
}

function list(){
    let xhr = new XMLHttpRequest();
    alert("list로옴");
    xhr.open('GET', 'login/list', true);
    xhr.onload =()=>{
        if(xhr.readyState===4 && xhr.status===200){
            let d = JSON.parse(xhr.responseText);
            alert(d);
            alert(Array.isArray(d.list))
            alert(d.list[0].userid);
            let wrapper = document.getElementById('wrapper');
            wrapper.innerHTML = admin.list_form();

            let tbody = document.getElementById('tbody');
            d.list.forEach((v)=>{
                tbody.innerHTML+=admin.list_row(v);
            });
        }
    }
    xhr.send();
}



function list_row(x){
    return  "<tr><td>"+x.userid+"</td><td>"+x.password+"</td>"+
    "<td>"+x.phone+"</td><td>"+x.address+"</td></tr>"
}