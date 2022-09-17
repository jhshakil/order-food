<template>
  <div>
    <h2>Foods</h2>
    <div id="table">
      <div>
        <table class="food-table">
          <thead>
            <th>SI</th>
            <th>Food</th>
            <th>Price</th>
          </thead>
          <tbody v-for="foods in allFoods" :key="foods.id">
            <td>{{ foods.id }}</td>
            <td class="click-name" @click="addToOrder(foods)">
              {{ foods.Food }}
            </td>
            <td>
              {{ foods.individualPrice ? foods.individualPrice : foods.price }}
            </td>
          </tbody>
        </table>
      </div>
      <div>
        <table class="food-table">
          <thead>
            <tr>
              <th>Food Name</th>
              <th>Quantity</th>
              <th>Subtotal</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody v-for="foods in allOrder" :key="foods.id">
            <tr>
              <td>{{ foods.Food }}</td>
              <td class="quantity">
                <span><button @click="reduceQuantity(foods)">-</button> </span
                ><span> {{ foods.quantity }} </span>
                <span><button @click="addQuantity(foods)">+</button></span>
              </td>
              <td>{{ foods.price }}</td>
              <td class="delete-btn">
                <button @click="deleteFood(foods)">Delete</button>
              </td>
            </tr>
          </tbody>
          <tfoot>
            <tr>
              <td>Discount</td>
              <td>
                <input v-model="discount" type="number" />
                <span> %</span>
              </td>
              <td>{{ dPrice }}</td>
            </tr>
            <tr>
              <td>Vat</td>
              <td><input v-model="vat" type="number" /> <span> %</span></td>
              <td>{{allVat}}</td>
            </tr>
            <tr>
              <td>Total</td>
              <td></td>
              <td>{{total}}</td>
            </tr>
          </tfoot>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
export default {
  name: "FoodTable",
  data() {
    return {
      discount: "",
      vat: "",
    };
  },
  computed: {
    ...mapGetters(["allFoods", "allOrder", "dPrice", "allVat", "total"]),
  },
  methods: {
    ...mapActions([
      "addToOrder",
      "deleteFood",
      "reduceQuantity",
      "addQuantity",
      "disPrice",
      "totalVat",
    ]),
  },
  watch: {
    discount: {
      handler: function (val) {
        this.disPrice(val);
      },
      deep: true,
    },
    vat: {
      handler: function (val) {
        this.totalVat(val);
      },
      deep: true,
    },
  },
};
</script>