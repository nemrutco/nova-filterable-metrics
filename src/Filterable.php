<?php

namespace Nemrutco\Filterable;

use Illuminate\Database\Eloquent\Builder;

trait Filterable
{
    public function component()
    {
        return 'filterable-'.$this->component;
    }

    /**
     * @param  \Illuminate\Http\Request  $request
     * @param  \Illuminate\Database\Eloquent\Builder|string  $model
     * @return Builder
     */
    public function applyFiltersToModel($request, $model)
    {
        $request->range = optional($request)->range ?? 3600;

        $model = $model instanceof Builder ? $model : (new $model)->newQuery();

        $filters = collect($this->filters());

        $filters->filter(static function ($filter) use ($request) {
            return $request->input($filter->key()) ?: $filter->default();
        })->map(static function ($filter) use ($request, $model) {
            $model = $filter->apply($request, $model, $request->input($filter->key()) ?: $filter->default());
        });

        return $model;
    }

    /**
     * Prepare the metric for JSON serialization.
     *
     * @return array
     */
    public function jsonSerialize(): array
    {
        return array_merge(parent::jsonSerialize(), [
            'filters' => collect($this->filters() ?? [])->map(static function ($filter) {
                return $filter->jsonSerialize();
            })->values()->all(),
        ]);
    }
}
