# Tanuki UI Design Tokens

This document provides a comprehensive overview of the design token system used in Tanuki UI. Design tokens are the foundational building blocks that define the visual language of the UI library, ensuring consistency across different themes and components.

## Overview

Tanuki UI uses CSS custom properties (CSS Variables) as design tokens, allowing for dynamic theming and easy customization. The design system is built around multiple platform-specific themes that each implement a consistent set of token categories.

## Theme System

### Available Themes

The following themes are available in `public/styles/`:

1. **iOS 12** (`ios12.css`) - iOS design language with rounded corners and translucent effects
2. **macOS 12** (`macOS12.css`) - macOS Big Sur/Monterey design system with system colors and blur effects
3. **Windows 11** (`windows11.css`) - Windows 11 Fluent Design system
4. **Android 12** (`android12.css`) - Material Design 3 (Material You) styling
6. **Apple Liquid Glass** (`apple-liquid-glass.css`) - Premium glass morphism effect
7. **Vercel** (`vercel.css`) - Clean, modern development-focused theme
8. **Windows 98** (`windows98.css`) - Retro Windows 98 styling
9. **Monotone** (`monotone.css`) - High contrast, accessibility-focused theme
10. **handheld-console** (`handheld-console.css`) -　N天堂 Gaming console inspired theme

### Core Design Token Categories

## 1. Typography Tokens

Typography tokens define the font families, sizes, weights, and line heights used throughout the UI.

### Font Families

```css
--themeDefaultFontFamily: Primary font stack for body text
--themeControlFontFamily: Font family for interactive controls
--themeLabelFontFamily: Font family for labels and UI text
--themeSystemFont: System-specific font definitions
--themeUtilityWindowTitleFont: Specialized font for window titles
```

### Text Styles

```css
--textFont: Base text styling (weight, size, line-height, family)
--labelFont: Label text styling
--controlTextFont: Control element text styling
--titleFont: Heading and title text
--subtitleFont: Secondary heading text
--captionFont: Small caption text
```

### Platform-Specific Examples

**macOS Theme:**
```css
--themeDefaultFontFamily: "SF Pro Text", "SF Pro Icons", -apple-system, BlinkMacSystemFont, "Helvetica Neue", "Helvetica", "Arial", sans-serif;
--textFont: normal normal 400 13px/1.230769 var(--themeLabelFontFamily);
--labelFont: normal normal 500 11px/1.272727 var(--themeLabelFontFamily);
```

**Windows 11 Theme:**
```css
--themeDefaultFontFamily: "Segoe UI", "Helvetica", "Helvetica Neue", sans-serif;
--textFont: normal normal 14px/1.428571 var(--themeDefaultFontFamily);
```

**Figma Theme:**
```css
--themeDefaultFontFamily: "Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", system-ui, sans-serif;
--textFont: 400 13px var(--themeDefaultFontFamily);
--titleFont: 600 16px var(--themeDefaultFontFamily);
```

## 2. Color Tokens

Color tokens provide semantic color definitions that adapt across themes and dark mode.

### Primary Colors

```css
--textColor: Primary text color
--accentColor: Brand/accent color for interactive elements
--cautionColor: Warning/error color
--windowBackgroundColor: Primary background color
```

### Semantic Text Colors

```css
--labelColor: Primary label text
--secondaryLabelColor: Secondary/subdued text
--tertiaryLabelColor: Tertiary/muted text
--quaternaryLabelColor: Quaternary/disabled text
--placeholderTextColor: Placeholder text in inputs
--linkColor: Hyperlink text color
```

### Interactive Colors

```css
--selectedTextColor: Selected text color
--selectedTextBackgroundColor: Selected text background
--selectedContentBackgroundColor: Selected content background
--keyboardFocusIndicatorColor: Focus ring color
--controlAccentColor: Control element accent color
```

### System Colors

All themes include a comprehensive system color palette:

```css
--systemBlueColor: System blue
--systemGreenColor: System green
--systemRedColor: System red/error
--systemOrangeColor: System orange
--systemYellowColor: System yellow
--systemPurpleColor: System purple
--systemPinkColor: System pink
--systemTealColor: System teal
--systemIndigoColor: System indigo
--systemBrownColor: System brown
--systemGrayColor: System gray
```

### Dark Mode Support

Most themes include automatic dark mode support using `@media (prefers-color-scheme: dark)`:

```css
@media (prefers-color-scheme: dark) {
  body {
    --windowBackgroundColor: rgba(33, 28, 38, 1);
    --textColor: rgba(255, 255, 255, 1);
    --labelColor: rgba(255, 255, 255, 0.847059);
    /* ... additional dark mode overrides */
  }
}
```

## 3. Control Tokens

Control tokens define the appearance of interactive elements like buttons, inputs, and form controls.

### Base Control Properties

```css
--controlBackground: Default control background
--controlTextColor: Default control text color
--controlTextFont: Control typography
--controlBorderRadius: Control corner radius
--controlPadding: Internal control padding
--controlBoxShadow: Control shadow/elevation
--controlTextLetterSpacing: Control text spacing
```

### Control States

```css
--controlHoverBackground: Hover state background
--controlActiveBackground: Active/pressed state background
--controlDisabledBackground: Disabled state background
--controlFocusBoxShadow: Focus state shadow
--disabledControlTextColor: Disabled text color
```

### Control Variants

#### Primary Controls
```css
--controlBackground--primary: Primary button background
--controlTextColor--primary: Primary button text
--controlBoxShadow--primary: Primary button shadow
--controlHoverBackground--primary: Primary button hover state
--controlFocusBackground--primary: Primary button focus state
```

#### Secondary Controls
```css
--controlBackground--secondary: Secondary button background
--controlTextColor--secondary: Secondary button text
--controlBoxShadow--secondary: Secondary button shadow
--controlHoverBackground--secondary: Secondary button hover state
```

#### CTA (Call-to-Action) Controls
```css
--controlBackground--cta: CTA button background
--controlTextColor--cta: CTA button text
--controlHoverBackground--cta: CTA button hover state
```

## 4. Input Tokens

Input tokens define the styling for form inputs and text fields.

```css
--inputPadding: Input internal padding
--inputFont: Input typography
--inputBorder: Input border definition
--inputBorderRadius: Input corner radius
--inputBackground: Input background color
--inputBoxShadow: Input shadow/inset effects
--inputFocusBorder: Input focus border
--inputFocusBoxShadow: Input focus shadow
```

### Example Input Styling

**macOS Theme:**
```css
--inputPadding: 2px 7.5px 2.4px;
--inputBoxShadow: 0 0 0 0 rgba(0, 0, 0, 0.06), 0 1px 0 0 rgba(0, 0, 0, 0.12);
--inputBorder: 0.5px solid rgba(0, 0, 0, 0.08);
```

**Figma Theme:**
```css
--inputPadding: 8px 12px;
--inputBorder: 1px solid rgba(0, 0, 0, 0.1);
--inputBorderRadius: 6px;
--inputFocusBorder: 1px solid rgba(24, 160, 251, 1);
--inputFocusBoxShadow: 0 0 0 3px rgba(24, 160, 251, 0.1);
```

## 5. Layout Tokens

Layout tokens define spacing, sizing, and structural properties.

### Application Layout

```css
--appMainToolbarHeight: Main toolbar height
--headerHeight: Header height with safe areas
--footerHeight: Footer height with safe areas
--fullScreenHeight: Full viewport height with safe areas
```

### Component Sizing

```css
--checkboxSize: Checkbox dimensions
--tabItemHeight: Tab item height
--tabItemIconSize: Tab icon size
--selectBoxSplitButtonWidth: Select dropdown button width
```

### Elevation System

```css
--windowLevelElevation: Window z-index level
--dialogLevelElevation: Dialog z-index level
--popupLevelElevation: Popup z-index level
--tooltipLevelElevation: Tooltip z-index level
--cardLevelElevation: Card z-index level
--controlsLevelElevation: Controls z-index level
--layerLevelElevation: Base layer z-index level
```

## 6. Component-Specific Tokens

### Dialog Tokens

```css
--dialogBackground: Dialog background color
--dialogBoxShadow: Dialog shadow effects
--dialogBorderRadius: Dialog corner radius
--dialogBackdrop: Dialog backdrop color
--dialogPadding: Dialog internal padding
```

### Table Tokens

```css
--tableBackgroundColor: Table background
--tableBorderColor: Table border color
--tableHeaderBackground: Table header background
--tableHeaderFont: Table header typography
--tableCellPadding: Table cell padding
--tableHoverBackground: Table row hover state
```

### Tab Tokens

```css
--tabBarBackground: Tab bar background
--tabBarBoxShadow: Tab bar shadow
--tabItemTextColor: Tab text color
--tabItemFont: Tab typography
--tabItemBackground-selected: Selected tab background
--tabItemTextColor-selected: Selected tab text color
--tabActiveBackground: Active tab background
--tabHoverBackground: Tab hover background
```

### Card Tokens

```css
/* Base Card Properties */
--cardBackground: Card background color
--cardBorder: Card border definition
--cardBorderRadius: Card corner radius
--cardBorderColor: Card border color (separate from border)
--cardBoxShadow: Card shadow/elevation
--cardPadding: Card internal padding
--cardMargin: Card external margin
--cardGap: Gap between cards in a grid
--cardMinHeight: Minimum card height
--cardMaxWidth: Maximum card width

/* Card States */
--cardHoverBackground: Hover state background
--cardHoverBorder: Hover state border
--cardHoverBoxShadow: Hover state shadow
--cardHoverTransform: Hover state transform (e.g., scale)
--cardActiveBackground: Active/pressed state background
--cardActiveBoxShadow: Active state shadow
--cardFocusBorder: Focus state border
--cardFocusBoxShadow: Focus state shadow
--cardDisabledBackground: Disabled state background
--cardDisabledOpacity: Disabled state opacity

/* Card Variants */
--cardBackground--elevated: Elevated card background
--cardBoxShadow--elevated: Elevated card shadow
--cardBackground--outlined: Outlined card background
--cardBorder--outlined: Outlined card border
--cardBackground--filled: Filled card background

/* Card Header/Footer */
--cardHeaderBackground: Card header background
--cardHeaderPadding: Card header padding
--cardHeaderBorder: Card header border
--cardHeaderFont: Card header typography
--cardFooterBackground: Card footer background
--cardFooterPadding: Card footer padding
--cardFooterBorder: Card footer border

/* Card Content */
--cardTitleFont: Card title typography
--cardTitleColor: Card title text color
--cardSubtitleFont: Card subtitle typography
--cardSubtitleColor: Card subtitle text color
--cardBodyFont: Card body text typography
--cardBodyColor: Card body text color

/* Card Media */
--cardMediaBorderRadius: Card media (image/video) border radius
--cardMediaObjectFit: Card media object-fit property
--cardMediaAspectRatio: Card media aspect ratio

/* Card Interaction */
--cardCursor: Card cursor (pointer for clickable cards)
--cardTransition: Card transition properties
--cardTransitionDuration: Card transition duration
--cardTransitionEasing: Card transition easing
```

### Toolbar Tokens

```css
--barItemsFontFamily: Toolbar font family
--barItemsTextColor: Toolbar text color
--barItemsAccentColor: Toolbar accent color
--barItemsLabelTextColor: Toolbar label color
--barItemsBorderRadius: Toolbar item border radius
--barItemsControlsBorder: Toolbar control borders
```

### Sidebar Tokens

```css
--sidebarBackground: Sidebar background color
--sidebarWidth: Sidebar width
--sidebarBorder: Sidebar border
--sidebarItemPadding: Sidebar item padding
--sidebarItemHeight: Sidebar item height
--sidebarItemFont: Sidebar typography
--sidebarItemHoverBackground: Sidebar item hover state
--sidebarItemActiveBackground: Sidebar item active state
--selectedSidebarListItemBackground: Selected sidebar item background
```

## 7. Animation and Effect Tokens

### Backdrop Filters

```css
--backgroundBackdropFilter: Global backdrop filter
--windowBackdropFilter: Window backdrop filter
--controlBackgroundFilter: Control background filter
--dialogBackgroundFilter: Dialog backdrop filter
--segmentBackgroundFilter: Segment control backdrop filter
```

### Animation Properties

```css
--animationDuration: Standard animation duration (150ms)
--animationEasing: Standard easing function (cubic-bezier(0.4, 0, 0.2, 1))
```

### Visual Effects

**Apple Liquid Glass Theme Example:**
```css
--backgroundBackdropFilter: blur(20px) saturate(180%) brightness(110%);
--windowBackdropFilter: blur(40px) saturate(200%) brightness(120%);
```

## Usage Guidelines

### 1. Token Hierarchy

Tokens follow a hierarchical naming convention:
- `--{category}` - Base category (e.g., `--control`)
- `--{category}{Property}` - Specific property (e.g., `--controlBackground`)
- `--{category}{Property}--{variant}` - Variant-specific (e.g., `--controlBackground--primary`)
- `--{category}{Property}-{state}` - State-specific (e.g., `--controlBackground-selected`)

### 2. Theme Customization

To create a custom theme:

1. Create a new CSS file in `public/styles/`
2. Define all required tokens for your theme
3. Include dark mode variants using `@media (prefers-color-scheme: dark)`
4. Add accessibility support with `@media (prefers-contrast: high)`
5. Consider reduced motion with `@media (prefers-reduced-motion: reduce)`

### 3. Component Development

When developing components:

1. Always use design tokens instead of hardcoded values
2. Provide fallback values: `var(--token, fallback)`
3. Support variant-specific tokens: `var(--controlBackground--primary, var(--controlBackground))`
4. Use semantic tokens over literal values
5. Test across multiple themes to ensure compatibility

### 4. Accessibility Considerations

Many themes include accessibility features:

```css
/* High contrast mode support */
@media (prefers-contrast: high) {
  body {
    --inputBorder: 2px solid rgba(0, 0, 0, 0.8);
    --focusRingWidth: 3px;
    --separatorColor: rgba(0, 0, 0, 0.3);
  }
}

/* Reduced motion support */
@media (prefers-reduced-motion: reduce) {
  body {
    --animationDuration: 0ms;
    --windowBackdropFilter: none;
  }
}
```

## Implementation Examples

### Using Tokens in Components

```css
.myComponent {
  background: var(--controlBackground);
  color: var(--controlTextColor);
  border-radius: var(--controlBorderRadius);
  padding: var(--controlPadding);
  font: var(--controlTextFont);
  box-shadow: var(--controlBoxShadow);
}

.myComponent:hover {
  background: var(--controlHoverBackground);
}

.myComponent[data-variant="primary"] {
  background: var(--controlBackground--primary);
  color: var(--controlTextColor--primary);
  box-shadow: var(--controlBoxShadow--primary, var(--controlBoxShadow));
}
```

### Theme Selection

Themes can be applied by including the appropriate CSS file:

```html
<!-- iOS Theme -->
<link rel="stylesheet" href="/styles/ios12.css">

<!-- macOS Theme -->
<link rel="stylesheet" href="/styles/macOS12.css">

<!-- Figma Theme -->
<link rel="stylesheet" href="/styles/figma.css">
```

## Token Reference

### Complete Token List

For a complete, up-to-date list of all available tokens, refer to the individual theme files in `public/styles/`. Each theme implements the full token specification while providing platform-appropriate values.

### Token Categories Summary

1. **Typography**: Font families, text styles, sizing
2. **Colors**: Semantic colors, system colors, state colors
3. **Controls**: Button styles, interactive element styling
4. **Inputs**: Form field styling and states
5. **Layout**: Spacing, sizing, elevation
6. **Components**: Component-specific styling tokens
7. **Effects**: Animations, filters, visual effects

This design token system ensures visual consistency while allowing for extensive customization and theming across different platforms and use cases.
