class review{

    constructor(){
        // home 파라미터 자리에 자기 html페이지 이름 , nav 파라미터 자리에 자기 html속 nav id넣기!!

        //2. 여기에 실행 순서대로 추가함니다 !!
        //드래그 앤 드랍
        this.dragAndDrop();
        this.star();
    }

    dragAndDrop(){
        $('.content')
        .on("dragover", dragOver)
        .on("dragleave", dragOver)
        .on("drop", uploadFiles);

        function dragOver(e){
        e.stopPropagation();
        e.preventDefault();
        if (e.type == "dragover") {
            $(e.target).css({
            "background-color": "black",
            "outline-offset": "-20px"
            });
        } else {
            $(e.target).css({
            "background-color": "gray",
            "outline-offset": "-10px"
            });
            }
        }

        function uploadFiles(e) {
            e.stopPropagation();
            e.preventDefault();
            dragOver(e);
        
            e.dataTransfer = e.originalEvent.dataTransfer;
            var files = e.target.files || e.dataTransfer.files;
            if (files.length > 1) {
                alert('하나만 올려라.');
                return;
            }
            if (files[0].type.match(/image.*/)) {
                        $(e.target).css({
                    "background-image": "url(" + window.URL.createObjectURL(files[0]) + ")",
                    "outline": "none",
                    "background-size": "100% 100%"
                });
            }else{
            alert('이미지가 아닙니다.');
            return;
            }
        }
    }
    star(){
        const rating_input = document.querySelector('.rating input');
        const rating_star = document.querySelector('.rating_star');

        // 별점 드래그 할 때
        rating_input.addEventListener('input', () => {
        rating_star.style.width = `${rating_input.value * 10}%`;
        });
    }

}
window.onload = () =>{
    new review();
}