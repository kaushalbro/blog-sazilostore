# Sazilo Store Blog Writing & SEO Master Guide

This guide outlines the exact editorial standards, technical SEO requirements, and content structuring rules for authoring high-ranking articles on **Sazilo Store Blog** (`https://blog.vritico.com`).

---

## 1. Article Title Formula & Character Limits

| Metric | Requirement |
| :--- | :--- |
| **Character Length** | **50 – 60 characters** (Absolute maximum: 65 characters) |
| **Brand Suffix** | Must end with ` - Sazilo Store` |
| **Keyword Position** | Place the primary keyword within the first 3–5 words |
| **Capitalization** | Title Case (e.g., *How to Integrate Fonepay Dynamic QR in Nepal*) |

### Good vs. Bad Title Examples

- ❌ **Too Long (88 chars)**:
  `A Complete Step-by-Step Guide for Starting an E-Commerce Business in Nepal with Zero Investment - Sazilo Store`
- ❌ **Missing Brand Suffix & Too Short (28 chars)**:
  `Selling Products in Nepal`
- ✅ **Perfect SEO Title (54 chars)**:
  `Top 10 E-Commerce Business Ideas in Nepal - Sazilo Store`
- ✅ **Perfect SEO Title (58 chars)**:
  `Cloud POS Setup for Retail Shops in Nepal - Sazilo Store`

---

## 2. Meta Description Rules (Snippet Optimization)

| Metric | Requirement |
| :--- | :--- |
| **Character Length** | **140 – 160 characters** |
| **Structure** | [Hook / Problem] + [Solution / Value Provided] + [Call to Action] |
| **Keywords** | Include 1 primary keyword + 1 secondary keyword naturally |

### Examples:
- ✅ **Example 1 (156 chars)**:
  `Discover how Nepali retail stores use Cloud POS with sub-15ms barcode billing, weighing scale sync, and automated receipt printing on Sazilo Store platform.`
- ✅ **Example 2 (152 chars)**:
  `Learn how to integrate Fonepay QR, eSewa, and Khalti on your Nepali online store with zero sales commission. Start your 14-day free trial on Sazilo Store.`

---

## 3. URL Slug Best Practices

- **Format**: All lowercase, words separated strictly by hyphens (`-`).
- **Length**: 3 to 6 words.
- **Rules**:
  - Remove stop words (`and`, `the`, `a`, `in`, `for`, `with`) when possible.
  - Do NOT include dates unless specifically writing an annual report.
- **Examples**:
  - ✅ `/blog/cloud-pos-supermarket-billing-nepal`
  - ✅ `/blog/nepal-courier-automated-waybill-shipping`
  - ❌ `/blog/how-to-do-e-commerce-in-nepal-2026-step-by-step-guide`

---

## 4. Heading Hierarchy & Content Structuring

Google and SEOptimer grade content on semantic heading structure. Follow this hierarchy:

```markdown
# [Article Title]               <-- Handled automatically by the page template as the only H1

## Core Section Heading 1       <-- H2 (Main Topic)
Paragraph text with rich context, definitions, and business value.

### Sub-topic or Step 1.1       <-- H3 (Sub-heading)
- Detailed bullet point explaining product specifications.
- Highlight key terms with **bold text**.

### Sub-topic or Step 1.2       <-- H3 (Sub-heading)
Step-by-step implementation notes.

## Comparison & Margin Table    <-- H2 (Data & Analysis)
[Insert Markdown Table]

## Frequently Asked Questions   <-- H2 (FAQ / Rich Snippets)
### How much does Cloud POS hardware cost in Nepal?
Answer in 2-3 concise sentences.
```

> [!IMPORTANT]
> **Never skip heading levels** (e.g., do NOT place an `<h4>` immediately under an `<h2>`). Every article must have at least two `<h2>` headings and two `<h3>` sub-headings.

---

## 5. Image Naming, Format & Optimization

All images served on Sazilo Store Blog must adhere to high-performance WebP standards:

1. **Format**: **100% WebP** (`.webp`).
2. **Master Resolution**: **1200 x 630 px** (landscape 16:9 or 1.91:1 ratio).
3. **Naming Convention**:
   `[topic-focus]-[descriptor]-sazilo-store-ecommerse-builder-in-nepal.webp`
   - *Example*: `cloud-pos-barcode-scanner-sazilo-store-ecommerse-builder-in-nepal.webp`
   - *Example*: `nepal-handicraft-storefront-sazilo-store-ecommerse-builder-in-nepal.webp`
4. **Alt Text**: Always provide clear, descriptive alternative text containing relevant keywords.
   - *Example*: `Departmental store cashier using barcode scanner and Cloud POS billing in Kathmandu Nepal`

---

## 6. Content Length, Formatting & Tables

- **Word Count**:
  - Standard Guides: **800 – 1,200 words**
  - In-Depth Pillar Pages: **1,500 – 2,500 words**
- **Markdown Tables**:
  Comparison tables boost user engagement and generate Google Rich Answer Cards.
  ```markdown
  | Feature | Traditional POS | Sazilo Cloud POS |
  | :--- | :--- | :--- |
  | **Billing Speed** | 3–5 seconds | <15ms keyboard hotkeys |
  | **Inventory Sync** | End of day manual | Real-time cloud sync |
  | **Monthly Cost** | Rs. 5,000+ AMC | 0% sales commission |
  ```
- **Readability**:
  - Keep paragraphs short (3 to 4 sentences maximum).
  - Use bulleted lists (`- `) and numbered lists (`1. `) frequently.
  - Zero emojis in editorial titles, headers, and UI elements.

---

## 7. Internal Linking Strategy

Every article must include at least **3 internal links**:

1. **Sazilo Store Platform / Register CTA**:
   `[Create your online store on Sazilo Store](https://sazilostore.vritico.com/register)`
2. **Interactive Demo Store Showcase**:
   `[Explore live storefront templates](https://sazilostore.vritico.com/#templates)`
3. **Related Blog Article or Category**:
   `[Read our guide on courier shipping in Nepal](/blog/automated-shipping-labels-waybill-generation-sazilo-store)` or `[browse all logistics tutorials](/category/logistics)`

---

## 8. Strapi 5 Pre-Publish Checklist

Before publishing an article in the Strapi Admin Panel (`https://cmsblog.vritico.com/admin`):

- [ ] **Title**: 50–60 characters ending in ` - Sazilo Store`.
- [ ] **Slug**: Short, lowercase, hyphenated.
- [ ] **Description**: 140–160 characters summary with keywords and CTA.
- [ ] **Category**: Assigned to one core category (*Business & Growth*, *Logistics*, *Payments*, *Technology*, *Culture*).
- [ ] **Author**: Assigned to a verified editor (*Sazilo Store*, *Editorial Team*).
- [ ] **Cover Image**: 1200x630 WebP file with `-sazilo-store-ecommerse-builder-in-nepal.webp` naming and filled `Alternative Text` + `Caption`.
- [ ] **Content Blocks**: Rich text formatted with H2/H3 subheadings, lists, tables, and internal links.
- [ ] **Status**: Click **Publish** (not just Save Draft).
