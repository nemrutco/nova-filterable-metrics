import FilterableModal from './components/FilterModal';
import FilterableValueMetric from "./components/FilterableValueMetric";
import FilterablePartitionMetric from "./components/FilterablePartitionMetric";
import FilterableTrendMetric from "./components/FilterableTrendMetric";

Nova.booting((app, store) => {
    app.component('filterable-modal', FilterableModal);
    app.component('filterable-value-metric', FilterableValueMetric);
    app.component('filterable-trend-metric', FilterableTrendMetric);
    app.component('filterable-partition-metric', FilterablePartitionMetric);
})
