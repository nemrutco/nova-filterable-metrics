<template>
  <loading-card :loading="loading" class="px-6 py-4">
    <div class="flex mb-4">
      <h3 class="mr-3 text-base text-80 font-bold">{{ title }}</h3>
      <button class="ml-auto text-80 btn btn-white" v-if="filters.length > 0" @click="openModal">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="15"
          height="15"
          viewBox="0 0 20 20"
          aria-labelledby="filter"
          role="presentation"
          class="fill-current text-80"
        >
          <path
            fill-rule="nonzero"
            d="M.293 5.707A1 1 0 0 1 0 4.999V1A1 1 0 0 1 1 0h18a1 1 0 0 1 1 1v4a1 1 0 0 1-.293.707L13 12.413v2.585a1 1 0 0 1-.293.708l-4 4c-.63.629-1.707.183-1.707-.708v-6.585L.293 5.707zM2 2v2.585l6.707 6.707a1 1 0 0 1 .293.707v4.585l2-2V12a1 1 0 0 1 .293-.707L18 4.585V2H2z"
          />
        </svg>
      </button>
      <div v-if="helpText" class="absolute pin-r pin-b p-2 z-50">
        <tooltip trigger="click">
          <icon
            type="help"
            viewBox="0 0 17 17"
            height="16"
            width="16"
            class="cursor-pointer text-60 -mb-1"
          />

          <tooltip-content slot="content" v-html="helpText" :max-width="helpWidth" />
        </tooltip>
      </div>
    </div>

    <p class="flex items-center text-4xl mb-4">
      {{ formattedValue }}
      <span v-if="suffix" class="ml-2 text-sm font-bold text-80">
        {{
        formattedSuffix
        }}
      </span>
    </p>

    <div ref="chart" class="absolute pin rounded-b-lg ct-chart" style="top: 60%;" />

    <filterable-modal
      v-if="modalOpen"
      :selected-range-key="selectedRangeKey"
      :selected-filters="selectedFilters"
      :ranges="ranges"
      :title="title"
      :filters="filters"
      @selected="selected"
      @closeModal="closeModal"
    />
  </loading-card>
</template>

<script>
import TrendMetric from "@/components/Metrics/Base/TrendMetric";

export default {
  extends: TrendMetric,
  mixins: [require("@/base"), require("./../modal")]
};
</script>
