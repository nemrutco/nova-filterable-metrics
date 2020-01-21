<script>
import DateTimePicker from "@/components/DateTimePicker";
export default {
  extends: DateTimePicker,
  props: {
    mode: {
      type: String,
      default: "single"
    }
  },

  mounted() {
    try {
      this.$parent.filter.mode ? (this.mode = this.$parent.filter.mode) : "";
    } catch (e) {}

    this.placeholder = this.value || this.__("Choose date");

    this.$nextTick(() => {
      this.flatpickr = flatpickr(this.$refs.datePicker, {
        enableTime: this.enableTime,
        enableSeconds: this.enableSeconds,
        onClose: this.onChange,
        dateFormat: this.dateFormat,
        allowInput: true,
        // static: true,
        time_24hr: !this.twelveHourTime,
        locale: { firstDayOfWeek: this.firstDayOfWeek },
        mode: this.mode
      });
    });
  }
};
</script>
