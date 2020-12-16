export class Audio extends HTMLElement{
    constructor(){
        super();
    }
    connectedCallback(){
        const div = document.createElement('div');
        const btnPlay = document.createElement('button');
        const btnStop = document.createElement('button');
        const audioPlay = document.createElement('audio');

        audioPlay.controls=true;

        const play=()=>{
            navigator.mediaDevices.getUserMedia({audio:true}).then(stream=>{
                this.mr=new MediaRecorder(stream);
                this.gravador=[];
                this.mr.ondataavailable=data=>{
                    this.gravador.push(data.data)
                }
                this.mr.start();
            })
        }

        const stop=()=>{
            this.mr.stop();

            this.mr.onstop=()=>{
                const blob=new Blob(this.gravador,
                    {type:'audio/ogg;code=opus'});
                this.gravador=[];

                this.reader=new window.FileReader();
                this.reader.readAsDataURL(blob);

                this.reader.onloadend=()=>{
                    audioPlay.src=this.reader.result;
                }
            }
        }

        btnPlay.classList.add('btn','btn-outline-success');
        btnPlay.type='button';
        btnPlay.innerHTML='<span class="fa fa-microphone"></span>';
        btnPlay.style='display:block';
        btnPlay.addEventListener('click', ()=>{
            btnPlay.style='display:none';
            btnPlay.style='display:block';

            play();
        })

        btnStop.classList.add('btn','btn-outline-danger');
        btnStop.type='button';
        btnStop.innerHTML='<span class="fa fa-stop"></span>';
        btnStop.style='display:none';
        btnStop.addEventListener('click', ()=>{
            btnPlay.style='display:block';
            btnStop.style='display:none'; 

            stop();
        })

    div.appendChild(btnPlay);
    div.appendChild(btnStop);
    div.appendChild(audioPlay);

    this.appendChild(div);
    
    }
}
