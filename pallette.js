let pallettes = localStorage.getItem('palletes')
pallettes = JSON.parse(pallettes)

let div = document.querySelector('.pallettes')

function getColorsFromHash(hash) {
    if (hash.length > 1) {
       return hash
       .substring(1)
       .split('-')
       .map(color => '#' + color) 
 
    } 
    return []
}

function setTextColor (color) {
    const luminance = chroma(color).luminance()
    return luminance > 0.5 ? 'black' : 'white'
 }

let palletesHtml = ''

pallettes.forEach(element => {
    colors = getColorsFromHash(element)
    palletesHtml += `
    <div style="margin: 60px 30px 0;">
        <a href="${'mypage.html'+element}" style="text-decoration:none; color: black">
            <div style="border-radius: 15px; display: flex; flex-direction: row;">
                <div style="background-color: ${colors[0]}; padding: 70px 7px 70px; border-radius: 10px 0 0 10px; color: ${setTextColor(colors[0])}" class="col">
                    ${colors[0]}
                </div>
                <div style="background-color: ${colors[1]}; padding: 7px; color: ${setTextColor(colors[1])}" class="col">
                    ${colors[1]}
                </div>
                <div style="background-color: ${colors[2]}; padding: 7px; color: ${setTextColor(colors[2])}" class="col">
                    ${colors[2]}
                </div>
                <div style="background-color: ${colors[3]}; padding: 7px; color: ${setTextColor(colors[3])}" class="col">
                    ${colors[3]}
                </div>
                <div style="background-color: ${colors[4]}; padding: 7px; border-radius: 0 10px 10px 0; color: ${setTextColor(colors[4])}" class="col">
                    ${colors[4]}
                </div>
            </div>
        </a>
    </div>`
});

div.innerHTML = palletesHtml