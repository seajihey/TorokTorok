export class Nav {
    constructor() {
        this.id = "";
        this.code = "";
        this.fetchingUser();
        this.exportLoginInfo();
    }

    fetchingNav(pageName, myNavIdName) {
        fetch('nav.html')
            .then(response => response.text())
            .then(html => {
                document.getElementById(myNavIdName).innerHTML = html;
                this.navFirst(pageName, myNavIdName);
            })
            .catch(error => console.error('에러 발생:', error));
    }

    fetchingUser(userInfo) {
        if (userInfo && userInfo.id) {
            const { id, pw, code } = userInfo;
            this.id = id;
            this.code = code;
            console.log("nav에서도 작동하지롱");
        } else {
            this.id = "none";
            this.code = "none";
        }
    }

    navFirst(pageName, myNavIdName) {
        const nav = document.getElementById(myNavIdName);
        const temp = pageName + "Text";
        const tempImg = pageName + "Img";

        if (nav) {
            const textElement = nav.querySelector('.' + temp);
            const imgElement = nav.querySelector('.' + tempImg);

            if (textElement) {
                textElement.style.color = "#E97E41";
                textElement.classList.remove('nav_unactive');
            }
            if (imgElement) {
                imgElement.classList.add('nav_active');
            } else {
                imgElement.classList.remove('nav_active');
                textElement.style.color = "none";
            }

            const setLogout = document.querySelector('.nav_login');
            if (this.id === "") {
                setLogout.innerHTML = `<a href="./login.html">로그아웃&nbsp;▶</a>`;
            }
        }
    }

    exportLoginInfo() {
        document.addEventListener('DOMContentLoaded', () => {
            const datas = {
                id: this.id,
                code: this.code,
            };

            const aTag = document.querySelector('a');
            if (aTag) {
                aTag.addEventListener('click', () => {
                    if (this.dataTrue == true) {
                        localStorage.setItem("userInfo", JSON.stringify(datas));
                    }
                });
            }
        });
    }
}

const userInfo = JSON.parse(localStorage.getItem("userInfo"));

// Instantiate Nav with user info
window.onload = () => {
    const nav = new Nav();
    nav.fetchingUser(userInfo);
};
