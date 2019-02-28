export default async function (ctx, inject) {
  const moduleOptions = {"accessibleIcons":true,"iconProperty":"$icon","icons":{"16":"\u002F_nuxt\u002Ficons\u002Ficon_16.00000000000.png","120":"\u002F_nuxt\u002Ficons\u002Ficon_120.00000000000.png"},"sizes":[16,120]}
  inject(moduleOptions.iconProperty.replace('$', ''), retrieveIcons(moduleOptions.icons))
}

const retrieveIcons = icons => size => icons[size] || ''
