export const cleanData = (data) => {
      const store = data.reduce((accu, cosmetic) => {
      const type = cosmetic.product_type
      const newObj = Object.assign({}, )
      if(!accu[type]){
        accu[type] = [];
      }
      accu[type].push(cosmetic)
      return accu
    }, {})
}