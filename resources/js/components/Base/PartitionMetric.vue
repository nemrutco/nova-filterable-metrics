<template>
  <LoadingCard :loading="loading" class="px-6 py-4">
    <h3 class="h-6 flex mb-3 text-sm font-bold">
      {{ title }}

      <span class="ml-auto font-semibold text-gray-400 text-xs"
        >({{ formattedTotal }} {{ __('total') }})</span
      >
        <button class="ml-2 text-80 btn btn-white" v-if="filters.length > 0" @click="openModal">
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

    <HelpTextTooltip :text="helpText" :width="helpWidth" />

    <div class="min-h-[90px]">
      <div class="overflow-hidden overflow-y-auto max-h-[90px]">
        <ul>
          <li
            v-for="item in formattedItems"
            :key="item.color"
            class="text-xs leading-normal"
          >
            <span
              class="inline-block rounded-full w-2 h-2 mr-2"
              :style="{
                backgroundColor: item.color,
              }"
            />{{ item.label }} ({{ item.value }} - {{ item.percentage }}%)
          </li>
        </ul>
      </div>

      <div
        ref="chart"
        class="right-[20px]"
        :class="chartClasses"
        style="width: 90px; height: 90px; bottom: 30px; top: calc(50% + 15px)"
      />
    </div>

    <filterable-modal
      v-if="modalOpen"
      :selected-filters="selectedFilters"
      :title="title"
      :filters="filters"
      @selected="selected"
      @closeModal="closeModal"
    />
  </LoadingCard>
</template>

<script>
import BasePartitionMetric from "@/components/Metrics/Base/BasePartitionMetric";
import Base from "../base";
import Modal from "../modal";

export default {
  extends: BasePartitionMetric,
  mixins: [Base, Modal]
};
</script>
