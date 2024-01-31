import { data } from '../js/data.js';
import { toMinAndSec } from '../js/utils.js';


const AudioController = {
    state: {
        audios: [],
    },
    init() {
        this.initVariables();
        this.renderAudio();
    },
    initVariables() {
        this.audiolist = document.querySelector('.items');
    },
    loadAudio(audio) {
            const { id, link, genre, track, group, duration  } = audio;
            

            const [ image ] = link.split('.')

            console.log(image)

            const item = `<div class="item" data-id = "${id}" >
                                <div class="item-image">
                                    <div
                                        class="item-image"
                                        style="background-image: url(./assets/images/${image}.jpg);"
                                    ></div>
                                </div>
                                <div class="item-titles">
                                    <h2 class="item-group">${group}</h2>
                                    <div class="item-track">${track}r</div>
                                </div>

                                <p class="item-duration">${toMinAndSec(duration)}</p>
                                <p class="item-ginre">${genre}</p>
                                <button class="item-play">
                                    <img src="./assets/images/button_play.png"/> 
                                </button>
                        </div>`
            this.audiolist.innerHTML += item;
    },
    renderAudio() {
        data.forEach((item) => {
            const audio = new Audio(`./assets/audio/${item.link}`)
        
            audio.addEventListener('loadeddata', () => {
                const newItem = { ...item, duration: audio.duration, audio }
                this.state.audios.push(newItem)
                this.loadAudio(newItem)
            })
        })
    } 
}

AudioController.init()