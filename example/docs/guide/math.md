---
outline: false
---

# Math Equations

This page sets `outline: false` in frontmatter, so the right-hand table of contents is hidden and the article takes the full content width — handy for wide content like equations or tables.

Enable math in `.vitepress/config.ts` with `markdown: { math: true }` and install `markdown-it-mathjax3`. VitePress then renders TeX via MathJax 3. This theme does not interfere with MathJax's own styling.

## Inline

Einstein's most famous equation is $E = mc^2$. The Pythagorean theorem states $a^2 + b^2 = c^2$. Greek letters render too: $\alpha, \beta, \gamma, \pi, \Omega$.

## Block

The quadratic formula:

$$
x = \frac{-b \pm \sqrt{b^2 - 4ac}}{2a}
$$

Euler's identity:

$$
e^{i\pi} + 1 = 0
$$

A matrix:

$$
\begin{pmatrix}
  a & b \\
  c & d
\end{pmatrix}
\begin{pmatrix}
  x \\
  y
\end{pmatrix}
=
\begin{pmatrix}
  ax + by \\
  cx + dy
\end{pmatrix}
$$

Sum with limits:

$$
\sum_{k=1}^{n} k = \frac{n(n+1)}{2}
$$

Integral:

$$
\int_{-\infty}^{\infty} e^{-x^2} \, dx = \sqrt{\pi}
$$

## Aligned derivation

$$
\begin{aligned}
(a+b)^2 &= (a+b)(a+b) \\
        &= a^2 + ab + ba + b^2 \\
        &= a^2 + 2ab + b^2
\end{aligned}
$$

## Inline with code

When $x \neq 0$, we can divide: `const r = 1 / x`.
