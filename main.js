import arrayShuffle from 'array-shuffle'

import './style.css'

(() => {
  const desktopMediaQuery = 'screen and (min-width: 960px)'

  // insert blank stylesheets into page
  const styleTag1 = document.createElement('style') // style tag to update styles related to items order
  const styleTag2 = document.createElement('style') // style tag to update styles related to items color variant
  document.head.appendChild(styleTag1)
  document.head.appendChild(styleTag2)

  const items = [1, 2, 3, 4, 5, 6, 7, 8, 9] // Array.from({ length: 9 }, (_, i) => i + 1)
  let currentItemsOrder = items.concat([])

  const getIsDesktop = () => window.matchMedia(desktopMediaQuery).matches

  const getVariants = (items, _isOnDesktop) => {
    return items.reduce((prev, curr, i) => {
      if (_isOnDesktop) {
        return `
          ${prev}

          .item-${curr} {
            --border-color: transparent;
            background-color: var(--color-${i % 5 + 1});
          }
        `
      }

      return `
        ${prev}

        .item-${curr} {
          --border-color: var(--color-${i % 5 + 1});
        }
      `
    }, _isOnDesktop ? `` : `.item { --bg-color: var(--color-light); }`)
  }

  const updateStyles = (tag, styles) => tag.innerHTML = styles

  const computeItemsOrder = (items, isOnDesktop) => {
    if (isOnDesktop) {
      return `
        main {
          grid-template-areas:
            "item-${items[0]} item-${items[1]} item-${items[2]} controls"
            "item-${items[3]} item-${items[4]} item-${items[5]} ."
            "item-${items[6]} item-${items[7]} item-${items[8]} ."
          ;
        }
      `
    }

    return `
      main {
        grid-template-areas:
          "controls"
          ${items.reduce((prev, curr) => {
            return `
              ${prev}

              "item-${curr}"
            `
          }, '')}
        ;
      }
    `
  }

  const handleShuffle = (event, isOnDesktop) => {
    if (!event.target.matches('.shuffle')) return

    // shuffle items and save order
    currentItemsOrder = arrayShuffle(items)

    // TODO: extract common code?
    const styles = computeItemsOrder(currentItemsOrder, isOnDesktop)
    updateStyles(styleTag1, styles)
  }
  const handleSort = (event, isOnDesktop) => {
      if (!event.target.matches('.sort')) return

      // reset items and save order
      currentItemsOrder = items.sort()

      // TODO: extract common code?
      const styles = computeItemsOrder(currentItemsOrder, isOnDesktop)
      updateStyles(styleTag1, styles)
  }

  // render app
  document.querySelector('#app').innerHTML = `
    <header>Shuffle and Sort</header>

    <main>
      <div class='controls'>
        <button class='control shuffle'>Shuffle</button>
        <button class='control sort'>Sort</button>
      </div>
      <div class='item item-1'>1</div>
      <div class='item item-2'>2</div>
      <div class='item item-3'>3</div>
      <div class='item item-4'>4</div>
      <div class='item item-5'>5</div>
      <div class='item item-6'>6</div>
      <div class='item item-7'>7</div>
      <div class='item item-8'>8</div>
      <div class='item item-9'>9</div>
    </main>

    <footer>Shuffle and Sort by <a href='https://github.com/bboydflo/maersk-shufle-sort' _target='blank'>Florin Onciu</a></footer>
  `

  // check initial screen
  const isOnDesktop = getIsDesktop()

  // set initial order and color variants for each item in a random fashion
  updateStyles(styleTag1, computeItemsOrder(items, isOnDesktop))
  updateStyles(styleTag2, getVariants(items, isOnDesktop))

  // setup event listeners
  document.addEventListener('click', function (event) {

    // are we on desktop or not?
    const _isOnDesktop = getIsDesktop()

    handleShuffle(event, _isOnDesktop)
    handleSort(event, _isOnDesktop)
  })

  window.matchMedia(desktopMediaQuery).addEventListener('change', (query) => {
    updateStyles(styleTag1, computeItemsOrder(currentItemsOrder, query.matches))
    updateStyles(styleTag2, getVariants(currentItemsOrder, query.matches))
  })
})()

