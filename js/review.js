class review{

    constructor(){
        // home 파라미터 자리에 자기 html페이지 이름 , nav 파라미터 자리에 자기 html속 nav id넣기!!

        //2. 여기에 실행 순서대로 추가함니다 !!
        //드래그 앤 드랍
        this.dragAndDrop();
        // this.get_tags();
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
                let info = document.getElementById("content_info");
                info.style.display = "none";
            }else{
                alert('이미지가 아닙니다.');
                return;
            }
        
        }
    }

    // get_tags(){
    //     tags = 
    // }



    star(){
        const drawStar = (target) => {
            document.querySelector('.star span').style.width = '${target.value * 10}%';
          }
    }

}
window.onload = () =>{
    new review();
}