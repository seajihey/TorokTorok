// nav 불러오기
import{ Nav } from './nav.js';
import{ Db } from './db.js';
class Friends {

    constructor() {

        /* nav불러오기*/
        this.navTool = new Nav();
        this.navTool.fetchingNav('friend', 'nav');
        /* db불러오기*/
        this.db = new Db();

        /* 로그인으로부터 불러온 내 정보 저장*/
        this.myid = "";
        this.myData = []; 
        this.navTool.exportLoginInfo()
        this.getUserInfo();
        this.setMyFriend();
        this.setPaging();
        this.setAddFriend();
        console.log(this.myData)
    }
    getUserInfo() {
        const userInfo = JSON.parse(localStorage.getItem("userInfo"));
    
        if (userInfo && userInfo.id) {
            const { id, pw, code } = userInfo;
            this.myid = id;
    
            // myid를 가진 사용자가 존재하는지 확인
            this.myData = this.db.user.find(user => user.userId === this.myid);
    
            if (!this.myData) {
                console.error("사용자 데이터를 찾을 수 없습니다.");
            }
        } 
    }


    /*  페이지 선택에따라 unacitve속성 와리가리 */
    setPaging(){
            const firstpage = document.querySelector('.firstPage');
            const secondpage = document.querySelector('.secondPage');
            const selector1Btn = document.querySelectorAll('.fS1');
            const selector2Btn = document.querySelectorAll('.fS2');
        
            selector1Btn[1].addEventListener('click', () => {
                secondpage.classList.add('unactive');
                firstpage.classList.remove('unactive');
                console.log("여러번되니?")
            });
        
            selector2Btn[0].addEventListener('click', () => {
                firstpage.classList.add('unactive');
                secondpage.classList.remove('unactive');
                console.log("여러번되니?")
                this.setMyCalOpen();    
            });       
    }
    
    /*              화면에db에 맞게 내 친구들 정보가 보이게 설정하는 함수           */
    setMyFriend() {
        const sectionFriends = document.querySelector('.fsection');
        if (this.myData && this.myData.friends) {
            const myfriendsListArray = this.myData.friends.split(" ");
        //친구추가시에도 호출되는데, 클리너 안해주면 이미있는 친구가 두번나오기에 클리너해주기
        sectionFriends.innerHTML="";

        //루프를 돌며 내 친구들 화면에 추가하기 
        myfriendsListArray.forEach((friend)=>{
            let tempDiv = document.createElement("div");
            tempDiv.classList.add("fbox");
            //친구의 자기소개 찾기위해 친구 객체 찾기
            const userIdToFind = friend;
            const foundUser = this.db.user.find(user => user.userId === userIdToFind);
            tempDiv.innerHTML=`               
            <div class="fprofile">
            <img class="profileImg" src="./icon/gold_bunny.png">
            </div>
            <div class="fdetail">
                <div class="fname">${friend}</div>
                <div class="fresume">: ${foundUser.resume}</div>
            </div>
            <div class="fseeCal">
                <div class="fseeCalText"><a href="./home.html">달력보기▶</a></div>
            </div>`
            sectionFriends.appendChild(tempDiv);
        })
        }else{
            sectionFriends.innerHTML=
            `               
            로그인 부탁드립니다. `
        }
    }
    setAddFriend(){
        const close = document.querySelector('.exitFriend');
        const plus = document.querySelector('.addFriend');
        const allBox = document.querySelector('.addFriends');
        const plusBtn = document.querySelectorAll('.fplus');
        //친구추가 클릭시 팝업 보이기(첫페이지)
        plusBtn[0].addEventListener('click',()=>{
            allBox.classList.remove('unactive');
            //이거 안 하면 divInner남아있음 . divInner초기화
            const cleaner = document.querySelector('.twice');
            if (cleaner) {
                cleaner.remove();
            }
        })
        //친구추가 클릭시 팝업 보이기(두번째페이지)
        plusBtn[1].addEventListener('click',()=>{
            allBox.classList.remove('unactive');
        })

        //닫기 버튼 클릭시 팝업 내리기
        close.addEventListener('click',()=>{
            allBox.classList.add('unactive');
            console.log('잘되니?');
        })

        //추가 버튼 클릭시 친구 추가 후 , 팝업 내리기
        plus.addEventListener('click',()=>{4
            const temp = document.querySelector('.popupInput');
            console.log(temp.value);
            //친구검사
            this.checkFriend(temp.value);
        })

    }
    checkFriend(inputData){
        const allBox = document.querySelector('.addFriends');

        //이미 있는 친구 검사
        const userIds = []
        this.db.user.forEach((person)=>{
            userIds.push(person.userId);
        })
        console.log(userIds);
        //이미 나의 친구인지 검사
        let myfriend = this.myData.friends;
        let myfriendArray = myfriend.split(" ");
        myfriendArray.forEach((check1)=>{
            if(check1==inputData){
                const divItem = document.createElement('div');
                divItem.classList.add('twice');
                allBox.appendChild(divItem);
                let divInner = document.querySelector('.twice');
                divInner.innerHTML="이미 나의 친구입니다!";
                console.log("왜아난옴");
            }
            else{
            // 내가적은 아이디가 db에 존재하고, 내 친구에 없다면 친구에 추가하고 팝업끄기
            userIds.forEach((check)=>{
                if(check==inputData){
                    let myfriend = this.myData.friends;
                    let myfriendArray = myfriend.split(" ");
                    myfriendArray.push(inputData);
                    let result = myfriendArray.join(" ");
                    this.myData.friends = result;
                    console.log('성공!');

                    //친구 공개 범위
                    this.myData["open_"+check]="0 0 0";
                    console.log(this.myData);


                    this.setMyFriend();
                    allBox.classList.add('unactive');
                    console.log(this.myData.friends)
                }
                //내가 적은 아이디가 db에 없음
                else{
                    const divItem = document.createElement('div');
                    divItem.classList.add('twice');
                    allBox.appendChild(divItem);

                    let divInner = document.querySelector('.twice');
                    divInner.innerHTML=("해당 유저 정보가 없습니다.");
                    return 0;  
                }
            })
                
            }
        });

    }




    //db에 저장된 범위에 맞추어 open하는 함수
    setMyCalOpen(){
        const sectionAll = document.querySelector('.user');
        sectionAll.innerHTML="";        

        const myfriendsList = this.myData.friends;
        const myfriendsListArray = this.myData.friends.split(" ");
        //친구추가시에도 호출되는데, 클리너 안해주면 이미있는 친구가 두번나오기에 클리너해주기

        //루프를 돌며 내 친구들 화면에 추가하기 
        myfriendsListArray.forEach((friend)=>{

            let tempDiv = document.createElement("div");
            tempDiv.classList.add("wrapUser");

            
            //친구의 설정 범위찾기위해 친구 객체 찾기
            const userIdToFind = friend;
            const foundUser = this.db.user.find(user => user.userId === userIdToFind);
            const openList = this.myData["open_" + friend].split(" ");


            
            tempDiv.innerHTML = `
                <div class="fsfriend">
                    <div class="fsImg">
                        <img class="fsprofile" src="./icon/gold_bunny.png">
                        <div class="fsfname">${friend}</div>
                    </div>
                    <select id="fsftime" class="fsfselectbox">
                        ${["전체공개", "1달", "3달", "6달", "1년"].map((value, index) => `
                            <option value="${index}" ${openList[0] === String(index) ? "selected" : ""}>${value}</option>
                        `).join("")}
                    </select>

                    <br>

                    <select id="fsfrecord" class="fsfselectbox">
                        <option value="0" ${openList[1] === "0" ? "selected" : ""}>전체공개</option>
                        <option value="1" ${openList[1] === "1" ? "selected" : ""}>비공개</option>
                    </select>

                    <br>

                    <select id="fsfreview" class="fsfselectbox">
                        <option value="0" ${openList[2] === "0" ? "selected" : ""}>전체공개</option>
                        <option value="1" ${openList[2] === "1" ? "selected" : ""}>비공개</option>
                    </select>
                </div>
            </div>`;

            sectionAll.appendChild(tempDiv);
        });
    }


}




//필수 지우면 안돼용 맨 막줄에 있어야 해용
window.onload = () =>{
    new Friends();
}