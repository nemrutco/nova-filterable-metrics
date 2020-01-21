<template>
  <BasePartitionMetric
    @selected="handleChange"
    :title="card.name"
    :help-text="card.helpText"
    :help-width="card.helpWidth"
    :chart-data="chartData"
    :loading="loading"
    :filters="card.filters"
    :selected-filters="selectedFilters"
    :url="card.url"
    :wrap="card.width === '1/3'"
  />
</template>

<script>
import { Minimum } from "laravel-nova";
import BasePartitionMetric from "./Base/PartitionMetric";
import PartitionMetric from "@/components/Metrics/PartitionMetric";

export default {
  extends: PartitionMetric,

  components: {
    BasePartitionMetric
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
      ).then(({ data: { value: { value } } }) => {
        this.chartData = value;
        this.loading = false;
      });
    },

    filterPayload() {
      const payload = {
        params: {
          timezone: this.userTimezone
        }
      };

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
