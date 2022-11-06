let pallettes = localStorage.getItem('palletes')


if (!pallettes) {
   localStorage.setItem('palletes', JSON.stringify([]))
}

const cols = document.querySelectorAll('.col')

document.addEventListener('keydown', event => {
   event.preventDefault()
if (event.code.toLowerCase() === 'space'){
   setRandomColors()
}
})

document.addEventListener('click', event => {
   const type = event.target.dataset.type

   if (type === 'lock') {
      const node = event.target.tagName.toLowerCase() === 'i' 
      ? event.target
      : event.target.children[0]  


      node.classList.toggle('fa-lock-open')
      node.classList.toggle('fa-lock')
   } else if (type === 'copy') {
      copyToClickboard(event.target.textContent)
   } else if (type === 'save') {
      const node = event.target.tagName.toLowerCase() === 'i' 
      ? event.target
      : event.target.children[0]  


      node.classList.toggle('fa-regular')
      node.classList.toggle('fa-solid')

      let pallettes = localStorage.getItem('palletes')
      pallettes = JSON.parse(pallettes)

      if (document.location.hash) {
         if (pallettes.indexOf(document.location.hash) === -1) {
            pallettes.unshift(document.location.hash)
         } else {
            pallettes.splice(pallettes.indexOf(document.location.hash), 1)
         }
         localStorage.setItem('palletes', JSON.stringify(pallettes))
      }
   } 
} )

function gerenerateRandomColor() {
   // RGB 
   // #FF0000
   // #00FF00
   // #0000FF

   const hexCodes ='123456789ABCDEF'
   let color = ''
   for (let i = 0; i < 6; i++) {
      color += hexCodes[Math.floor(Math.random() * hexCodes.length)]
   }
   return '#' + color
}

function copyToClickboard(text) {
   return navigator.clipboard.writeText(text)
}

function setRandomColors(isInitial){
   const colors = isInitial ? getColorsFromHash() : []
   
    cols.forEach((col, index) => {
      const isLocked = col.querySelector('i').classList.contains('fa-lock')
      const text =col.querySelector('h2')
      const button =col.querySelector('button')
      const book =col.querySelector('.fa-bookmark')
      const pallette =col.querySelector('.fa-palette')
      const lock = col.querySelector('.fa-solid')
    
    if (isLocked) {
      colors.push(text.textContent)
      return
    }

    let allPallettes = localStorage.getItem('palletes')
    allPallettes = JSON.parse(pallettes)

    if (allPallettes) {
      if (allPallettes.indexOf(document.location.hash) !== -1 && book) {
         book.classList.toggle('fa-solid')
         book.classList.toggle('fa-regular')
       } else if (allPallettes.indexOf(document.location.hash) === -1 && book) {
         book.classList.remove('fa-regular')
         book.classList.remove('fa-solid')
         book.classList.add('fa-regular')
       }
    }


    const color = isInitial 
       ? colors[index]
       ? colors[index]
       :chroma.random()
       : chroma.random()

      colors.push(color)     

    
    
    text.textContent = color
    col.style.background = color

    setTextColor(lock, color)
    setTextColor(text, color)
    setTextColor(button, color)
    if (book && pallette) {
      setTextColor(book, color)
      setTextColor(pallette, color)
    }
   })

   updateColorsHash(colors)
}

function setTextColor (text, color) {
   const luminance = chroma(color).luminance()
   text.style.color = luminance > 0.5 ? 'black' : 'white'
}

function updateColorsHash(colors = []) {
   document.location.hash = colors
   .map((col) => {
      return col.toString().substring(1)
   }).join('-')  
}

function getColorsFromHash() {
   if (document.location.hash.length > 1) {
      return document.location.hash
      .substring(1)
      .split('-')
      .map(color => '#' + color) 

   } 
   return []
}
      
setRandomColors(true)
