const state = {
    foodTable: [
        {
    "id" : 1,
    "Food": "Noodles",
    "price": 500
  },
  {
    "id" : 2,
    "Food": "Pizza",
    "price": 800
  },
  {
    "id" : 3,
    "Food": "Aroma",
    "price": 700
  },
  {
    "id" : 4,
    "Food": "Bagel",
    "price": 500
  },
  {
    "id" : 5,
    "Food": "Butter",
    "price": 1200
  },
  {
    "id" : 6,
    "Food": "Chicken",
    "price": 300
  },
  {
    "id" : 7,
    "Food": "Pan Cake",
    "price": 300
  },
  {
    "id" : 8,
    "Food": "Butter Cake",
    "price": 380
  },
  {
    "id" : 9,
    "Food": "French Fries",
    "price": 120
  },
  {
    "id" : 10,
    "Food": "Paneer",
    "price": 450
  },
  {
    "id" : 11,
    "Food": "Roti",
    "price": 50
  },
  {
    "id" : 12,
    "Food": "Dal Curry",
    "price": 80
  },
  {
    "id" : 13,
    "Food": "Chappathi",
    "price": 90
  },
  {
    "id" : 14,
    "Food": "Chilli Chicken",
    "price": 190
  }
    ],
    orderTable: [],
    discountPrice: '',
    vat: '',
    total: '',
}

const getters = {
    allFoods: state => state.foodTable,
    allOrder: state => state.orderTable,
    dPrice: state => state.discountPrice,
    allVat: state => state.vat,
    total: state => state.total,
}

const actions = {
    addToOrder({commit}, data) {
        let orderFood = state.orderTable.find(value => value.id === data.id);
        if(orderFood) {
            orderFood.quantity += 1;
            orderFood.price += orderFood.individualPrice;
        } else {
            data.quantity = 1;
            data.individualPrice = data.price;
            commit('setOrder', data)
        }
        let allPrice = state.orderTable.map(value => value.price);
        let totalPrice = allPrice.reduce((a, b) => a + b);
        state.total = totalPrice
        // console.log(state.orderTable)

    },

    deleteFood({commit}, data) {
        commit('delete', data)
    },

    reduceQuantity({commit}, data) {
        let orderFood = state.orderTable.find(value => value.id === data.id);
        orderFood.price = orderFood.price - orderFood.individualPrice;
        if(orderFood.quantity > 1) {
            orderFood.quantity -= 1
        } else {
            commit('delete', data)
        }
        let allPrice = state.orderTable.map(value => value.price);
        let totalPrice = allPrice.reduce((a, b) => a + b);
        state.total = totalPrice
    },

    addQuantity({commit}, data) {
        let orderFood = state.orderTable.find(value => value.id === data.id);
        orderFood.price += orderFood.individualPrice;
        let orderIndex = state.orderTable.findIndex(value => value.id === data.id);
        commit('updateOrder', orderIndex)
        let allPrice = state.orderTable.map(value => value.price);
        let totalPrice = allPrice.reduce((a, b) => a + b);
        state.total = totalPrice
    },

    disPrice({commit}, data) {
        let allPrice = state.orderTable.map(value => value.price);
        let totalPrice = allPrice.reduce((a, b) => a + b);
        let discount = totalPrice * (data / 100);
        commit("discPrice", discount);
        state.total = totalPrice - discount + state.vat;
    },

    totalVat({commit}, data) {
        let allPrice = state.orderTable.map(value => value.price);
        let totalPrice = allPrice.reduce((a, b) => a + b);
        let vat = state.discountPrice ? state.total * (data / 100) : totalPrice * (data / 100);
        commit("allVat", vat)
        state.total = totalPrice + vat - state.discountPrice
    }
}

const mutations = {
    setOrder: (state, order) => (state.orderTable.push(order)),
    updateOrder: (state, value) => (state.orderTable[value].quantity += 1 ),
    delete: (state, data) => (state.orderTable = state.orderTable.filter(value => value.id != data.id)),
    discPrice: (state, data) => (state.discountPrice = data),
    allVat: (state, data) => (state.vat = data),
}

export default {
    state,
    getters,
    actions,
    mutations
}