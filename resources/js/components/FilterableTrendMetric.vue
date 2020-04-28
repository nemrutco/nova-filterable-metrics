<template>
  <BaseTrendMetric
    @selected="handleChange"
    :title="card.name"
    :help-text="card.helpText"
    :help-width="card.helpWidth"
    :value="value"
    :chart-data="data"
    :ranges="card.ranges"
    :format="format"
    :prefix="prefix"
    :suffix="suffix"
    :suffix-inflection="suffixInflection"
    :selected-range-key="selectedRangeKey"
    :loading="loading"
    :filters="card.filters"
    :selected-filters="selectedFilters"
  />
</template>

<script>
import _ from "lodash";
import { Minimum } from "laravel-nova";
import BaseTrendMetric from "./Base/TrendMetric";
import TrendMetric from "@/components/Metrics/TrendMetric";

export default {
  extends: TrendMetric,

  components: {
    BaseTrendMetric
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

      this.fetch();
    },

    fetch() {
      this.loading = true;

      Minimum(
        Nova.request().get(this.metricEndpoint, this.filterPayload())
      ).then(
        ({
          data: {
            value: {
              labels,
              trend,
              value,
              prefix,
              suffix,
              suffixInflection,
              format
            }
          }
        }) => {
          this.value = value;
          this.labels = Object.keys(trend);
          this.data = {
            labels: Object.keys(trend),
            series: [
              _.map(trend, (value, label) => {
                return {
                  meta: label,
                  value: value
                };
              })
            ]
          };
          this.format = format || this.format;
          this.prefix = prefix || this.prefix;
          this.suffix = suffix || this.suffix;
          this.suffixInflection = suffixInflection;
          this.loading = false;
        }
      );
    },

    filterPayload() {
      const payload = {
        params: {
          timezone: this.userTimezone,
          twelveHourTime: this.usesTwelveHourTime,
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
