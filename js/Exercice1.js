showInterface = () => {
    //variables globales
    let startTime = 0;
    let start = 0;
    let end = 0;
    let diff = 0;
    let timerID = 0;

    class Chrono{
        constructor(x, y, c, b){
            this.x=x;
            this.y=y;
            this.c=c;
            this.b=b;

            /*-----------------DOM-----------------*/
            this.div = document.createElement("div");
            let div = this.div;
                div.style.backgroundColor = this.c;
                div.style.border = `1px solid ${this.b}`;
                div.style.left = this.x;
                div.style.top = this.y;
                div.style.width = "200px";
                div.style.height = "80px";
                div.style.position = "absolute";

            this.input = document.createElement("input");
            let input = this.input;
                input.setAttribute("type", "text");
                input.setAttribute("value", "00 : 00 : 00");
                input.setAttribute("readOnly", "true");
                input.style.textAlign = "center";
                input.style.display="block";
                input.style.margin = "0 auto";
                input.style.marginTop = "10px";
                
            this.divB = document.createElement("div");
            let divB = this.divB;
                divB.style.display = "flex";
                divB.style.justifyContent = "space-evenly";
                divB.style.marginTop = "20px";

            this.playBtn = document.createElement("img");
            let playBtn = this.playBtn;  
                playBtn.src = "img/play-button.png";
                playBtn.alt = "play";

                
            this.pauseBtn = document.createElement("img");
            let pauseBtn = this.pauseBtn
                pauseBtn.src = "img/pause-button.png";
                pauseBtn.alt = "pause";

            this.stopBtn = document.createElement("img");
            let stopBtn = this.stopBtn;
                stopBtn.src = "img/stop-button.png";
                stopBtn.alt = "stop";
            /*----------------finDOM---------------*/

            //Event sur les buttons play/reset
            this.stopBtn.onclick = () => { this.init() };
            this.playBtn.onclick = () => { this.lecture() };;
        }
        //methode affiche qui display le chrono
        affiche(){
            document.body.appendChild(this.div);
            this.div.appendChild(this.input);
            this.div.appendChild(this.divB);
            this.divB.appendChild(this.playBtn);
            this.divB.appendChild(this.stopBtn);
            //change le curseur
            this.playBtn.style.cursor = "pointer";
            this.pauseBtn.style.cursor = "pointer";
            this.stopBtn.style.cursor = "pointer";
        }
        //methode chrono qui contient l'algo   
        chrono(){
            end = new Date();
            diff = end - start;
            diff = new Date(diff);
            let sec = diff.getSeconds();
            let min = diff.getMinutes();
            let hr = diff.getHours()-1;
            if (min < 10){
                min = "0" + min;
            }
            if (sec < 10){
                sec = "0" + sec;
            }
                this.input.value = `${hr} : ${min} : ${sec}`;
                timerID = setTimeout(()=> {this.chrono()}, 10);
        }
        //methode pause qui stop le chrono      
        pause(){
            this.divB.removeChild(this.pauseBtn);
            this.divB.removeChild(this.stopBtn);
            this.divB.appendChild(this.playBtn);
            this.divB.appendChild(this.stopBtn);
            this.playBtn.onclick = () => { this.continue() };
            this.stopBtn.onclick = () => { this.init() };
            clearInterval(timerID);
        }
        //methode lecture qui met en marche le chrono
        lecture(){
            this.divB.removeChild(this.playBtn);
            //remove child du stop afin que les buttons restent dans l'ordre
            this.divB.removeChild(this.stopBtn);
            this.divB.appendChild(this.pauseBtn);
            this.divB.appendChild(this.stopBtn);
            this.pauseBtn.onclick = () => { this.pause() };
            this.stopBtn.onclick = () => { this.init() };
            start = new Date();
            this.chrono();
        }
        //methode continue qui remet en marche le chrono   
        continue(){
            this.divB.removeChild(this.playBtn);
            //remove child du stop afin que les buttons restent dans l'ordre
            this.divB.removeChild(this.stopBtn);
            this.divB.appendChild(this.pauseBtn);
            this.divB.appendChild(this.stopBtn);
            this.pauseBtn.onclick = () => { this.pause() };
            this.stopBtn.onclick = () => { this.init() } ;
            start = new Date()-diff;
            start = new Date(start);
            this.chrono()
        }
        //methode init qui reset le chrono   
        init(){
            if(this.input.value === "00 : 00 : 00"){
                start = new Date();
            }else{
                this.input.value = "00 : 00 : 00";
                this.pause();
                start = new Date();
                this.playBtn.onclick = () => { this.lecture() };
            }
        }
    }

    let chrono1 = new Chrono("100px", "200px", "orange", "black");
    chrono1.affiche();
}
onload = showInterface;