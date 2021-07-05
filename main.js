import arrayShuffle from 'array-shuffle'

import './style.css'

(() => {

  // insert blank stylesheet into page
  const styleTag = document.createElement('style')
  document.head.appendChild(styleTag)

  // const items = Array.from({ length: 9 }, (_, i) => i + 1)
  const items = [1, 2, 3, 4, 5, 6, 7, 8, 9]

  const initialVariants = items.reduce((prev, curr, i) => {


  }, '')

  const updateStyles = (styles) => {
    styleTag.innerHTML = styles
  }

  const isDesktop = () => window.matchMedia('screen and (min-width: 960px)')

  const computeStyles = (items) => {

    // change desktop styles -> items order
    if (isDesktop()) {
      return items.reduce((prev, curr, i) => {
        return prev + `
        .item-${i+1} {
          grid-area: item-${curr}
        }`
      }, '')
    }

    return `
      main {
        grid-template-areas:
          "controls"
          ${items.reduce((prev, curr, i) => {
            return prev + `
              "item-${curr}${i === items.length - 1 ? ';' : ''}"
            `
          }, '')}
      }
    `
  }

  const handleShuffle = (event) => {
    if (!event.target.matches('.shuffle')) return

    const styles = computeStyles(arrayShuffle(items))
    updateStyles(styles)
  }
  const handleSort = (event) => {
      if (!event.target.matches('.sort')) return

      const styles = computeStyles(items.sort())
      updateStyles(styles)
  }

  // render app
  document.querySelector('#app').innerHTML = `
    <header>Shuffle and Sort</header>

    <main>
      <div class='controls'>
        <button class='control shuffle'>Shuffle</button>
        <button class='control sort'>Sort</button>
      </div>
      <div class='item item-1 item-variant-2'>1</div>
      <div class='item item-2 item-variant-4'>2</div>
      <div class='item item-3 item-variant-1'>3</div>
      <div class='item item-4 item-variant-3'>4</div>
      <div class='item item-5 item-variant-2'>5</div>
      <div class='item item-6 item-variant-4'>6</div>
      <div class='item item-7 item-variant-1'>7</div>
      <div class='item item-8 item-variant-2'>8</div>
      <div class='item item-9 item-variant-1'>9</div>
    </main>

    <footer>Shuffle and Sort by <a href='https://github.com/bboydflo/maersk-shufle-sort' _target='blank'>Florin Onciu</a></footer>
  `

  // setup event listeners
  document.addEventListener('click', function (event) {
    handleShuffle(event)
    handleSort(event)
  })
})()

