<template>
  <Modal :show="openModal" class="modal"  tabindex="-1" role="dialog">
    <div class="bg-white rounded-lg shadow-lg overflow-hidden w-action-fields">
        <ModalHeader>
            Filter: {{ title }}
        </ModalHeader>
        <ModalContent>
          <div
            v-if="ranges && ranges.length > 0"
            class="flex border-b border-40"
          >
            <div class="w-1/5 px-8 py-6">
              <label
                for="nova-time-range"
                class="inline-block text-80 pt-2 leading-tight"
                >Time Range</label
              >
            </div>
            <div class="py-6 px-8 w-1/2">
              <select
                id="nova-time-range"
                v-if="ranges.length > 0"
                @change="handleChange(null, $event)"
                class="w-full form-control form-select"
              >
                <option
                  v-for="option in ranges"
                  :key="option.value"
                  :value="option.value"
                  :selected="selectedRangeKey == option.value"
                >
                  {{ option.label }}
                </option>
              </select>
            </div>
          </div>
          <div
            v-for="filter in filters"
            :key="filter.value"
            class="flex"
          >
            <div class="w-1/5 pr-0 py-3">
              <label
                :for="filter.name"
                class="inline-block text-80 pt-2 leading-tight"
                >{{ filter.name }}</label
              >
            </div>
            <div class="py-3 px-8 w-4/5">
                <input
                    class="w-full flex form-control form-control-sm form-input form-input-bordered"
                    type="date"
                    ref="dateTimePicker"
                    v-if="filter.component.includes('date-filter')"
                    :dusk="`${filter.name}-date-filter`"
                    name="date-filter"
                    autocomplete="off"
                    :value="selectedFilters[filter.class] || filter.currentValue"
                    :placeholder="placeholder"
                    @change="handleChange(filter, $event)"
                />
                <input
                    :id="filter.name"
                    :class="inputClasses(filter.component)"
                    v-else-if="filter.component !== 'select-filter'"
                    @change="handleChange(filter, $event)"
                    :type="filter.component"
                    :checked="selectedFilters[filter.class] === 1"
                    :value="selectedFilters[filter.class]"
                />
                <select
                    :id="filter.name"
                    v-if="filter.component === 'select-filter'"
                    @change="handleChange(filter, $event)"
                    class="w-full form-control form-select form-select-bordered"
                    style="appearance: auto;"
                >
                    <option value selected v-if="!filter.currentValue && filter.currentValue !== 0">{{ __('Choose') }}</option>
                    <option
                      v-for="option in filter.options"
                      :key="option.value"
                      :value="option.value"
                      :selected="option.value == selectedFilters[filter.class]"
                    >
                      {{ option.label }}
                    </option>
                </select>
            </div>
          </div>
        </ModalContent>
        <ModalFooter>
            <div class="ml-auto">
                <DefaultButton
                    @click.prevent="closeModal"
                    type="submit"
                >
                    {{ __('Close') }}
                </DefaultButton>
            </div>
        </ModalFooter>
    </div>
  </Modal>
</template>
<script>
export default {
  props: ["title", "ranges", "filters", "selectedRangeKey", "selectedFilters", "show"],

  computed: {
    placeholder() {
      return this.__("Choose date");
    },
  },
  methods: {
    inputClasses(inputType) {
      if (inputType !== "checkbox") {
        return "w-full form-control form-input form-input-bordered";
      }
    },

    closeModal() {
      this.$emit("closeModal");
    },

    openModal() {
      this.$emit("openModal");
    },

    handleChange(filter, event) {
      if (filter === null) {
        this.$emit("selected", event.target.value);

        Nova.success("Filtered Time Range");

        return;
      }

      let selected;

      if (filter.component.includes("date-filter")) {
        selected = event?.target?.value ?? event;
      } else {
        selected = event.target.value;
      }

      if (filter.component === "boolean-filter") {
        selected = event.target.checked ? 1 : 0;
      }

      if (this.selectedFilters[filter.class] !== selected) {
        this.$emit("selected", {
          filter,
          selected,
        });

        Nova.success("Filtered " + filter.name);
      }
    },
  },
};
</script>
