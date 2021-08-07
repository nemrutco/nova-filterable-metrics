<script>
import DateTimePicker from "@/components/DateTimePicker";
export default {
  extends: DateTimePicker,
  props: {
    mode: {
      type: String,
      default: "single",
    },
  },

  mounted() {
    try {
      this.$parent.filter.mode ? (this.mode = this.$parent.filter.mode) : "";
    } catch (e) {}

    if (this.mode === "range") {
      this.placeholder = "Choose date range";
    }
    
    this.$nextTick(() => {
      this.flatpickr = flatpickr(this.$refs.datePicker, {
        enableTime: this.enableTime,
        enableSeconds: this.enableSeconds,
        onClose: this.onClose,
        onChange: this.onChange,
        dateFormat: this.dateFormat,
        altInput: true,
        altFormat: this.altFormat,
        allowInput: true,
        // static: true,
        time_24hr: !this.twelveHourTime,
        hourIncrement: this.hourIncrement,
        minuteIncrement: this.minuteIncrement,
        locale: { firstDayOfWeek: this.firstDayOfWeek },
        mode: this.mode,
        defaultDate: this.mode ? this.value.split('to') : this.value
      });
    });
  },
};
</script>
