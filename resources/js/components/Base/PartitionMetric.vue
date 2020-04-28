<template>
  <loading-card :loading="loading" class="px-6 py-4">
    <h3 class="flex mb-3 text-base text-80 font-bold">
      {{ title }}
      <span
        class="ml-auto font-semibold text-70 text-sm"
      >({{ formattedTotal }} {{ __('total') }})</span>
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
    </h3>

    <div v-if="helpText" class="absolute pin-r pin-b p-2">
      <tooltip trigger="hover">
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

    <div class="overflow-hidden overflow-y-auto max-h-90px">
      <ul class="list-reset">
        <li v-for="item in formattedItems" class="text-xs text-80 leading-normal">
          <span
            class="inline-block rounded-full w-2 h-2 mr-2"
            :style="{
              backgroundColor: item.color,
            }"
          />
          {{ item.label }} ({{ item.value }} - {{ item.percentage }}%)
        </li>
      </ul>
    </div>

    <div
      ref="chart"
      :class="chartClasses"
      style="
        width: 90px;
        height: 90px;
        right: 20px;
        bottom: 30px;
        top: calc(50% + 15px);
      "
    />

    <filterable-modal
      v-if="modalOpen"
      :selected-filters="selectedFilters"
      :title="title"
      :filters="filters"
      @selected="selected"
      @closeModal="closeModal"
    />
  </loading-card>
</template>

<script>
import PartitionMetric from "@/components/Metrics/Base/PartitionMetric";

export default {
  extends: PartitionMetric,
  mixins: [require("@/base"), require("./../modal")]
};
</script>
