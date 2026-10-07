To optimize images for the web, do three things: resize each image to the largest size it is actually displayed at, convert it to WebP or AVIF, and compress it to a sensible quality. Then add width and height to every image tag and lazy load everything except the main image at the top of the page. For most sites, those steps cut image weight by more than half and are the fastest route to a better Largest Contentful Paint score.

This guide shows how to do each step by hand, with free tools, and automatically in WordPress, with real file-size examples you can reproduce.

> **How this guide was researched.** Format recommendations follow Google's web.dev guidance, and WordPress format support follows the WordPress release notes, both linked under Sources. The size example uses round, illustrative numbers to show the arithmetic. Your own savings depend on the photo, so measure before and after.

## Why images matter so much

Images are usually the heaviest part of a web page, and the main image is often the element Google measures for Largest Contentful Paint. Google's target for LCP is 2.5 seconds or less. A 4 MB hero photo on a phone connection makes that almost impossible, however fast your server is.

Oversized images also waste your hosting bandwidth and your visitors' mobile data. On developer platforms that bill for transfer at around $0.15 per GB, every unnecessary megabyte has a cost. [Core Web Vitals Explained](/core-web-vitals-explained) covers how LCP is measured.

## The four causes of heavy images

| Cause | Example | Fix |
|-------|---------|-----|
| Too many pixels | A 4,032 pixel wide phone photo shown 800 pixels wide | Resize |
| Old format | A JPEG or PNG where WebP or AVIF would be smaller | Convert |
| Too little compression | A JPEG saved at quality 100 | Compress |
| One size for every screen | A desktop-sized image sent to a phone | Responsive images with srcset |

Fixing the first one alone often does more than everything else combined.

## Step 1: Resize to the size you actually display

A photo from a current phone camera is typically around 4,000 pixels wide. A blog's main column is often 700 to 900 pixels wide. Uploading the original means sending roughly five times the width, and because file size grows with area, something like twenty to twenty-five times the pixels.

Pick the largest size you need, and allow for high-resolution screens, which use two pixels per displayed pixel:

| Where the image appears | Displayed width | Width to export |
|-------------------------|-----------------|-----------------|
| Full-width hero banner | Up to 1,600 pixels | 1,600 to 2,000 pixels |
| Blog content column | About 800 pixels | 1,600 pixels |
| Half-column image | About 400 pixels | 800 pixels |
| Thumbnail or card | About 300 pixels | 600 pixels |
| Logo | As small as it shows | An SVG if possible |

Resizing a 4,000 pixel photo to 1,600 pixels reduces the pixel count by about 84%, because 1,600 squared is 16% of 4,000 squared at the same proportions.

## Step 2: Choose the right format

Google's web.dev guidance is direct: "WebP and AVIF will generally provide better compression than older formats, and should be used where possible."

| Format | Use for | Transparency | Browser support |
|--------|---------|--------------|-----------------|
| AVIF | Photos, where smallest size matters | Yes | All current major browsers |
| WebP | Photos and graphics, the safe modern default | Yes | All current major browsers |
| JPEG | Photos, as a fallback | No | Universal |
| PNG | Screenshots and graphics needing exact detail | Yes | Universal |
| SVG | Logos, icons and simple illustrations | Yes | Universal |

For photos, web.dev suggests JPEG, lossy WebP or AVIF. Where fine detail must be preserved exactly, it suggests PNG or lossless WebP, and notes that lossless WebP "may be more efficient than PNG".

In practice:

- **Photos:** WebP at a quality of around 75 to 82 is a reliable default. Try AVIF for large hero images, where its extra savings count most.
- **Screenshots with text:** try lossless WebP and compare it with PNG. Keep whichever is smaller.
- **Logos and icons:** use SVG. It is sharp at any size and usually tiny.

AVIF tends to produce smaller files than WebP at similar visual quality, but it takes longer to encode, and some editing tools still do not export it. WebP is the easier choice if you want one format everywhere.

## Step 3: Compress, and check by eye

Quality settings run from 0 to 100. The visible difference between 100 and 80 is usually impossible to see on a photo, while the file size difference is large. Below about 60, artifacts start to show, especially around text and sharp edges.

The only reliable method is to look. Export at a few settings, view them side by side at actual size, and keep the smallest one you cannot tell apart from the original.

### A worked example

Here is how the steps stack up for a typical phone photo used as a blog's main image. These are round illustrative numbers, but the proportions are typical.

| Step | Dimensions | Format | File size |
|------|------------|--------|-----------|
| Original from the phone | 4,032 x 3,024 | JPEG | 4.0 MB |
| Resized | 1,600 x 1,200 | JPEG, quality 82 | 380 KB |
| Converted | 1,600 x 1,200 | WebP, quality 80 | 230 KB |
| Converted | 1,600 x 1,200 | AVIF, quality 60 | 160 KB |

That takes the image from 4 MB to under 250 KB, a reduction of over 94%, with no visible change at the size it is displayed. Run the same steps on your own photo and record the numbers. That is the best way to choose your settings.

A useful target: keep content images under about 200 KB and the main hero image under about 400 KB.

## Free tools that do it

### Squoosh, in the browser

Squoosh is a free web app from the Chrome team. Drag in an image, choose a size and format, move the quality slider and compare the result against the original with a split view. The file never leaves your computer. It is the best way to learn what different settings look like.

### Command line, for batches

The `cwebp` tool from Google converts to WebP:

```
cwebp -q 80 -resize 1600 0 photo.jpg -o photo.webp
```

The `-resize 1600 0` sets the width to 1,600 pixels and keeps the proportions.

ImageMagick can resize and convert many files at once:

```
magick mogrify -path optimized -resize 1600x -quality 80 -format webp *.jpg
```

This writes a WebP version of every JPEG in the folder into a folder called `optimized`, 1,600 pixels wide. Create the `optimized` folder first.

### Your editing app

Most photo editors can export WebP, and many can export AVIF. Set the export width and quality there and you avoid the extra step entirely.

## Step 4: Write the image tag correctly

How you add an image to the page matters as much as the file.

### Always set width and height

```
<img src="desk.webp" width="1600" height="1200" alt="Laptop and notebook on an oak desk">
```

The browser uses these numbers to reserve the right amount of space before the image arrives, so the text below does not jump down when it loads. That jump is what Cumulative Layout Shift measures. The CSS can still make the image responsive. Width and height set the proportions.

### Lazy load images below the fold

```
<img src="chart.webp" width="800" height="450" loading="lazy" alt="Monthly visits chart">
```

`loading="lazy"` tells the browser to wait until the image is close to the screen. It saves data for people who never scroll that far.

### Never lazy load the main image

The image at the top of the page should load as early as possible. Remove `loading="lazy"` from it and add a priority hint:

```
<img src="hero.webp" width="1600" height="900" fetchpriority="high" alt="Team working in a bright office">
```

Lazy loading the hero image is one of the most common causes of a poor LCP score, and some themes and plugins do it by default.

### Serve different sizes to different screens

`srcset` gives the browser a choice of files, and it picks the smallest that fits the screen:

```
<img
  src="desk-1600.webp"
  srcset="desk-800.webp 800w, desk-1200.webp 1200w, desk-1600.webp 1600w"
  sizes="(max-width: 800px) 100vw, 800px"
  width="1600" height="1200"
  alt="Laptop and notebook on an oak desk">
```

A phone gets the 800 pixel file and a large monitor gets the 1,600 pixel one.

### Offer AVIF with a fallback

The `<picture>` element lets the browser choose the best format it supports:

```
<picture>
  <source srcset="desk.avif" type="image/avif">
  <source srcset="desk.webp" type="image/webp">
  <img src="desk.jpg" width="1600" height="1200" alt="Laptop and notebook on an oak desk">
</picture>
```

### Write useful alt text

Alt text describes the image for people using screen readers and when the image fails to load. Describe what the image shows and why it is there, in a short sentence. Do not stuff it with keywords. Decorative images that add nothing should have an empty `alt=""`.

## Image optimization in WordPress

WordPress handles part of this automatically.

- **Multiple sizes:** when you upload an image, WordPress creates several smaller copies and adds `srcset` to images in your posts.
- **Width, height and lazy loading:** WordPress adds dimensions and `loading="lazy"` to images inserted through the editor, and it tries to skip lazy loading for the first large image on the page.
- **Modern formats:** WordPress has supported uploading WebP images since version 5.8 and AVIF since version 6.5, provided your server's image library supports them. Check under Tools, Site Health, Info, Media Handling.

What WordPress does not do by default is resize your original upload or convert JPEGs to WebP. A plugin fills that gap.

| Plugin | What it does | Good to know |
|--------|--------------|--------------|
| ShortPixel | Compresses and converts to WebP and AVIF | Free allowance each month, then paid credits |
| Imagify | Compresses and converts to WebP and AVIF | Free monthly quota, then paid |
| EWWW Image Optimizer | Compresses on your own server, with an optional paid cloud service | Free local mode uses your server's resources |
| Converter for Media | Converts existing images to WebP or AVIF | Focused on format conversion |

Whichever you use, set a maximum upload size, for example 2,000 pixels wide, so that full-size phone photos are scaled down when uploaded. Then run a bulk optimization on your existing media library, ideally after taking a backup. [How to Back Up a WordPress Site](/how-to-back-up-wordpress-site) covers that.

Image plugins are one part of a wider speed checklist. [Why Is My WordPress Site Slow?](/why-is-my-wordpress-site-slow) puts them in order with caching and the other fixes.

## Using a CDN for images

A content delivery network serves images from a location near each visitor, which shortens the trip. Some CDNs and hosts can also resize and convert images on the fly, sending WebP or AVIF to browsers that accept them. That saves you managing several files per image, at the cost of depending on the service. [What Is a CDN?](/what-is-a-cdn) explains how it fits together.

## How to check your images

1. Run your page through PageSpeed Insights and look for the diagnostics "Properly size images", "Serve images in next-gen formats" and "Efficiently encode images". Each lists the specific files and the potential saving.
2. In Chrome DevTools, open the Network tab, filter by "Img" and sort by size. The largest files are your first targets.
3. In the Performance panel, check which element is your LCP element. If it is an image, it should be small, not lazy loaded, and ideally have `fetchpriority="high"`.

Fix the top five images on your most visited pages first. That usually delivers most of the benefit.

## Frequently asked questions

### Is WebP or AVIF better?

AVIF usually produces smaller files than WebP at similar visual quality, while WebP encodes faster and is supported by more editing tools. Google's web.dev guidance recommends using either where possible. WebP is the simpler default, and AVIF is worth trying for large hero images.

### What size should images be for a website?

Export each image at about twice the width it is displayed at, to stay sharp on high-resolution screens. For a content column about 800 pixels wide, that means 1,600 pixels. Aim to keep content images under about 200 KB and hero images under about 400 KB.

### Does WordPress support WebP and AVIF?

Yes. WordPress has supported uploading WebP images since version 5.8 and AVIF since version 6.5, as long as the server's image library supports the format. It does not convert JPEG uploads automatically, so use a plugin for conversion.

### Should I lazy load all images?

No. Lazy load images below the visible part of the page, but never the main image at the top. Lazy loading the largest visible image delays it and harms your Largest Contentful Paint score. Give that image fetchpriority set to high instead.

### Why should images have width and height attributes?

They let the browser reserve the right space before the image downloads, so text and other content do not shift when it appears. Missing dimensions are a common cause of poor Cumulative Layout Shift scores. CSS can still resize the image responsively.

### What quality setting should I use for JPEG or WebP?

A quality of around 75 to 82 is a good starting point for photos in JPEG or WebP. Compare the result with the original at actual size, and keep the lowest setting where you cannot see a difference. Below about 60, artifacts usually become visible.

### Do image optimization plugins slow down WordPress?

The optimization work runs when you upload or during a bulk job, not when visitors load pages, so it does not slow the public site. Plugins that compress on your own server use CPU during those jobs, which can matter on small shared hosting plans.

## Sources

- [web.dev: Choose the right image format](https://web.dev/articles/choose-the-right-image-format)
- [web.dev: Web Vitals](https://web.dev/articles/vitals)
- [MDN: The image embed element](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/img)
- [WordPress 6.5 release notes: AVIF support](https://make.wordpress.org/core/2024/02/23/wordpress-6-5-adds-avif-support/)
- [Squoosh](https://squoosh.app/)
