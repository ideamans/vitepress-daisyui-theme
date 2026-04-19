---
layout: page
title: Tailwind Theme for VitePress
---

<section class="hero bg-gradient-to-br from-primary/10 via-base-100 to-secondary/10 py-24">
  <div class="hero-content text-center max-w-4xl">
    <div>
      <div class="badge badge-primary badge-outline mb-4">v0.1.0</div>
      <h1 class="text-5xl md:text-6xl font-bold tracking-tight text-base-content">
        Tailwind-native VitePress theme
      </h1>
      <p class="mt-6 text-lg text-base-content/70 max-w-2xl mx-auto">
        Built from scratch on Tailwind CSS 4 and DaisyUI 5. Write docs in Markdown, design landing
        pages with full Vue control, mix both in one site.
      </p>
      <div class="mt-8 flex gap-3 justify-center">
        <a href="/guide/getting-started" class="btn btn-primary">Get started</a>
        <a href="/guide/markdown-demo" class="btn btn-ghost">See Markdown demo</a>
      </div>
    </div>
  </div>
</section>

<section class="py-20 max-w-6xl mx-auto px-6">
  <div class="grid md:grid-cols-3 gap-6">
    <div class="card bg-base-100 border border-base-300">
      <div class="card-body">
        <h3 class="card-title text-lg">Two layouts</h3>
        <p class="text-base-content/70">
          <code>doc</code> for standard documentation pages, <code>page</code> for anything else.
        </p>
      </div>
    </div>
    <div class="card bg-base-100 border border-base-300">
      <div class="card-body">
        <h3 class="card-title text-lg">Tailwind 4 + DaisyUI 5</h3>
        <p class="text-base-content/70">
          Every class is yours. No default-theme CSS collisions. Theme swap via DaisyUI data-theme.
        </p>
      </div>
    </div>
    <div class="card bg-base-100 border border-base-300">
      <div class="card-body">
        <h3 class="card-title text-lg">VitePress-compatible</h3>
        <p class="text-base-content/70">
          Inherits themeConfig schema: nav, sidebar, search, locales, edit link, lastUpdated.
        </p>
      </div>
    </div>
  </div>
</section>
