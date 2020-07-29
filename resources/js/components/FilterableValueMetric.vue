<template>
  <BaseValueMetric
    @selected="handleChange"
    :title="card.name"
    :help-text="card.helpText"
    :help-width="card.helpWidth"
    :previous="previous"
    :value="value"
    :ranges="card.ranges"
    :format="format"
    :prefix="prefix"
    :suffix="suffix"
    :suffix-inflection="suffixInflection"
    :selected-range-key="selectedRangeKey"
    :loading="loading"
    :zero-result="zeroResult"
    :filters="card.filters"
    :selected-filters="selectedFilters"
  />
</template>

<script>
import { Minimum } from "laravel-nova";
import BaseValueMetric from "./Base/ValueMetric";
import ValueMetric from "@/components/Metrics/ValueMetric";

export default {
  extends: ValueMetric,

  components: {
    BaseValueMetric
  },

  data: () => ({
    selectedFilters: {
      type: Object
    }
  }),

  methods: {
    handleChange(payload) {
      if (typeof payload !== "object") {
        this.selectedRangeKey = payload;
      } else {
        this.selectedFilters[payload.filter.class] = payload.selected;
      }
    },

    fetch() {
      this.loading = true;

      Minimum(Nova.request().get(this.metricEndpoint, this.filterPayload)).then(
        ({
          data: {
            value: {
              value,
              previous,
              prefix,
              suffix,
              suffixInflection,
              format,
              zeroResult
            }
          }
        }) => {
          this.value = value;
          this.format = format || this.format;
          this.prefix = prefix || this.prefix;
          this.suffix = suffix || this.suffix;
          this.suffixInflection = suffixInflection;
          this.zeroResult = zeroResult || this.zeroResult;
          this.previous = previous;
          this.loading = false;
        }
      );
    },

    filterPayload() {
      const payload = {
        params: {
          timezone: this.userTimezone
        }
      };

      if (this.hasRanges) {
        payload.params.range = this.selectedRangeKey;
      }

      this.card.filters.forEach(filter => {
        if (typeof this.selectedFilters[filter.class] !== "undefined") {
          payload.params[filter.class] = this.selectedFilters[filter.class];
        }
      });

      return payload;
    }
  }
};
</script>
