module.exports = {
  props: {
    filters: {
      type: Array,
      default: () =>  []
    },
    selectedFilters: {
      type: Object,
      default: () =>  {}
    },
    url: {
      type: Object,
      default: () =>  {}
    },
  },

  data() {
    return {
      modalOpen: false
    };
  },
  methods: {
    openModal() {
      this.modalOpen = true;
    },

    closeModal() {
      this.modalOpen = false;
    },

    selected(payload) {
      this.$emit('selected', payload)
    }
  }
}