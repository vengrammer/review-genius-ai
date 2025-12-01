<?php

use Illuminate\Support\Facades\Route;

Route::get('/hey', function () {
    return ['name' => "hello"];
});
