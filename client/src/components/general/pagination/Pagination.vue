<template>
  <nav aria-label="Page navigation example" class="mt-4" v-if="total > perPage">
    <ul class="pagination">

      <li class="page-item" :class="{ 'disabled': !previousPage }">
        <a class="page-link" href="#" @click.prevent="paginate(previousPage)">Previous</a>
      </li>

      <li class="page-item"><a class="page-link" v-if="hiddenOnLeft">...</a></li>

      <li class="page-item">
        <a class="page-link" href="#" @click.prevent="paginate(previousPage)"
           v-if="previousPage">{{ previousPage }}</a>
      </li>

      <li class="page-item active"><a class="page-link" href="#">{{ currentPage }}</a></li>

      <li class="page-item"><a class="page-link" href="#" @click.prevent="paginate(nextPage)" v-if="nextPage">{{
        nextPage }}</a></li>

      <li class="page-item"><a class="page-link" v-if="hiddenOnRight">...</a></li>

      <li class="page-item" :class="{ 'disabled': !nextPage }">
        <a class="page-link" href="#" @click.prevent="paginate(nextPage)">Next</a>
      </li>
    </ul>
  </nav>
</template>

<script>
  export default {
    name: "Pagination",

    props: {
      total: {
        type: Number
      },
      currentPage: {
        type: Number
      },
      perPage: {
        type: Number
      }
    },

    computed: {
      previousPage: function () {
        return this.currentPage > 1 ? (this.currentPage - 1) : null;
      },
      nextPage: function () {
        let lastPage = Math.ceil(this.total / this.perPage);
        return lastPage > this.currentPage ? (this.currentPage + 1) : null;
      },

      hiddenOnLeft: function () {
        return this.currentPage > 2;
      },
      hiddenOnRight: function () {
        let lastPage = Math.ceil(this.total / this.perPage);
        return (lastPage - this.currentPage) > 1;
      }
    },
    methods: {
      paginate(page) {
        this.$emit('paginate', page);
      }
    }
  }
</script>

<style scoped>

</style>
