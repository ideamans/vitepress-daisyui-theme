---
layout: page
---

<section class="max-w-3xl mx-auto px-6 py-16">

# About this theme

This page uses the `page` layout — shared header and footer stay, but the body is a completely
free canvas. Perfect for pages like *About*, *Pricing*, *Legal*, or anything marketing-ish that
doesn't fit the docs grid.

<div class="card bg-base-200 my-8">
  <div class="card-body">
    <h3 class="card-title">Tell me more</h3>
    <p>You can drop any Vue / DaisyUI component here. Cards, tabs, hero sections, forms — all on.</p>
    <div class="card-actions justify-end">
      <a class="btn btn-primary btn-sm" href="/guide/getting-started">Read the guide</a>
    </div>
  </div>
</div>

## Why a custom theme

- **No collisions.** Tailwind and DaisyUI own the CSS. The default VitePress theme is not loaded.
- **Three layouts.** `doc` for standard docs, `page` for branded free pages, `home` for zero-chrome.
- **Small API surface.** The `themeConfig` schema mirrors VitePress's defaults.

</section>
