# Nova Filterable Metrics
This package inspired by [nova-filterable-cards](https://github.com/beyondcode/nova-filterable-cards)

Add custom filters to your Laravel Nova metrics. 

![screenshot](https://nemrut.co/images/filterable/filter-screenshot1.png)
![screenshot](https://nemrut.co/images/filterable/filter-screenshot2.png)

## Installation

You can install the package in to a Laravel app that uses [Nova](https://nova.laravel.com) via composer:

```bash
composer require nemrutco/nova-filterable-metrics 
```

## Usage

To add the filter ability to your Laravel Nova metric cards, you need to add one of the `Filterable` traits to your metrics.

Depending on your metric type, these are the available traits:

- `FilterableValue`
- `FilterableTrend`
- `FilterablePartition`

For example, within your custom Nova value metric card:
```php
// in your Nova value metric card class:
use Nemrutco\Filterable\FilterableValue;

use FilterableValue;

```

## Defining Filters

The available filters for your cards can be defined, by adding `filters` method which returns array of Nova Filters to your metrics. You can use any Nova Filters you defined in your application.

Example:

```php
// in your filterable Nova metric:
use App\Nova\Filters\Date;
use App\Nova\Filters\Store;

public function filters()
{
	return [
		new Store,
		new Date,
	];
}

```

## Available filter types

By default, this package supports all of the Nova Filter types. For Date type filters it uses flatpicker.

if you want to enable date range, simply add 

```php

public function range()
{
	return $this->withMeta(['mode' => 'range']);
}

```

in your DateFilter filter, and make sure to call it in your use case as:

```php

public function filters(Request $request)
{
	return [
		(new Date)->range(),
	]
}

```

In that case you don't need to use Nova's default `ranges`. Instead you can use a date filter. If you use ranges and a date filter, your date filter will be applied only within the selected Nova's range. So try to not use ranges and a date filter at same time.

## Credits
- [Nemrut Creative Studio](https://github.com/nemrutco)
- [Marcel Pociot](https://github.com/mpociot)
- [All Contributors](../../contributors)

## License

The MIT License (MIT). Please see [License File](LICENSE.md) for more information.
