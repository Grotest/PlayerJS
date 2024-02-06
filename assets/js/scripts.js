import { data } from '../js/data.js';
import { toMinAndSec } from '../js/utils.js';


const AudioController = {
    state: {
        audios: [],
        current: {},
        playing: false
    },
    init() {
        this.initVariables();
        this.initEvent();
        this.renderAudio();
    },
    initVariables() {
        this.audiolist = document.querySelector('.items');
        this.itemCurrent = document.querySelector('.current');
    },
    handleAudioPlay() {
        const { playing, current } = this.state;
        const { audio } = current;

        !playing ? audio.play() : audio.pause();
        this.state.playing = !playing

    },
    handlePlay() {
        const play = document.querySelector('.controls-play');
        console.log(play)
        this.playButton = play;
        play.addEventListener('click', this.handleAudioPlay.bind(this))
    },
    initEvent() {
        this.audiolist.addEventListener('click', this.handleItem.bind(this))
    },
    handleItem({ target }) {
        const { id } = target.dataset;

        if (!id) return;
        this.setCurrentItem(id);
    },
    renderCurrentItem({ link, year, track, group, duration }) {

        const [ image ] = link.split('.')

        return `<div
                    class="current-image"
                    style="background-image: url(./assets/images/${image}.jpg);"
                ></div>

                <div class="current-info">
                    <div class="current-info__top">
                        <div class="current-info_titles">
                            <h2 class="current-info__group"> ${group} </h2>
                            <h3 class="current-info__track"> ${track} </h3>
                        </div>
                        <div class="current-info__year"> ${year} </div>
                    </div>
            

                    <div class="controls">
                        <div class="controls-buttons">
                            <button class="controls-button controls-prev">
                                <svg class="icon-arrow">
                                    <!-- <use xlink:href="./assets/images/sprite.svg#arrow"></use> -->
                                    <img src="./assets/images/button_back.png"> 
                                </svg>
                            </button>

                            <button class="controls-button controls-play">
                                <!-- <svg class="icon-pause"> -->
                                    <!-- <use xlink:href="./assets/images/sprite.svg#pause"></use>
                                    
                                </svg> -->
                                <svg class="icon-play">
                                    <!-- <use xlink:href="./assets/images/sprite.svg#play"></use> -->
                                    <img src="./assets/images/button_play.png" id="button-play-pause" onclick="() => {console.log(sda)}"> 
                                </svg>
                            </button>

                            <button class="controls-button controls-next">
                                <svg class="icon-arrow">
                                <!-- <use xlink:href="./assets/images/sprite.svg#arrow"></use> -->
                                <img src="./assets/images/button_back.png"> 
                                </svg>
                            </button>
                        </div>
                    </div>

                    <div class="controls-progress">
                        <div class="progress">
                            <div class="progress-current"></div>
                        </div>
                    </div>

                    <div class="timeline">
                        <span class="timeline-start">00:00</span>
                        <span class="timeline-end">${toMinAndSec(duration)}</span>
                    </div>
                </div> `
    },
    setCurrentItem(itemId) {
        const current = this.state.audios.find(({ id }) =>  +id === +itemId )
        if (!current) return
        this.state.current = current
        this.itemCurrent.innerHTML = this.renderCurrentItem(current)
        this.audioUpdateHandler(current)
        this.handlePlay()
    },
    loadAudio(audio) {
            const { id, link, genre, track, group, duration } = audio;

            const [ image ] = link.split('.')

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
                                <button class="item-play controls-play">
                                    <img src="./assets/images/button_play.png" id="button-play-pause" onclick="changeButton()"/> 
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
    },
    audioUpdateHandler( { audio, duration }) {
        const progress = document.querySelector('.progress-current');
        const timeline = document.querySelector('.timeline-start');

        audio.addEventListener('timeupdate', ({ target }) => {
            const { currentTime } = target;
        
            const widht = (currentTime * 100) / duration;
            timeline.innerHTML = toMinAndSec(currentTime);
            progress.style.width = `${widht}%`

        })
    }
}

AudioController.init()