export const cleanData = (data) => {
  const store = data.reduce((accu, cosmetic) => {
    const type = cosmetic.product_type
    const newProductObj = Object.assign({}, {
                          image: cosmetic.api_featured_image,
                          brand: cosmetic.brand ? cosmetic.brand : '',
                          description: cosmetic.description,
                          id: cosmetic.id,
                          name: cosmetic.name,
                          colors: cosmetic.product_colors,
                          type: type,
                          tags: cosmetic.tag_list
                          })
    if(!accu[type]){
      accu[type] = [];
    }
    accu[type].push(newProductObj)
    return accu
  }, {})
  return store
}