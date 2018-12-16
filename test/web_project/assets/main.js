require('./fonts/font.css');
import fontList from './fonts/fonts.js';


window.onload = function () {
    var html = fontList.map(font => {
        return `
        <section>
            <header contenteditable>my-icon-${font.name}</header>
            <div>
                <i class="my-icon-${font.name}"></i>
            </div>
        </section>`
    }).join('')

    document.querySelector('.flex-tb').innerHTML = html
}


