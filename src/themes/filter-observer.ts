export class FilterObserver {
  filterPattern: string;
  observer: MutationObserver | null;
  pendingChecks: Set<Node>;
  rafId: number | null;
  trackedElements: WeakMap<Node, { hasFilter: boolean; timestamp: number }>;
  callback: (element: Node) => void;
  constructor(filterPattern: string, callback: (element: Node) => void) {
    this.callback = callback;
    this.filterPattern = filterPattern;
    this.observer = null;
    this.pendingChecks = new Set();
    this.rafId = null;
    this.trackedElements = new WeakMap();
  }
  hasTargetFilter(element: Node): boolean {
    if (!(element instanceof Element)) {
      return false;
    }

    // キャッシュチェック
    const cached = this.trackedElements.get(element);
    if (cached && cached.timestamp > Date.now() - 100) {
      return cached.hasFilter;
    }

    const computedStyle = window.getComputedStyle(element);
    const computedStyleBefore = window.getComputedStyle(element, "::before");
    const computedStyleAfter = window.getComputedStyle(element, "::after");

    const filters = [computedStyle.filter, computedStyleBefore.filter, computedStyleAfter.filter];
    const hasFilter = filters.some((filter) => {
      return filter ? filter.includes(this.filterPattern) : false;
    });

    this.trackedElements.set(element, {
      hasFilter,
      timestamp: Date.now(),
    });

    return hasFilter;
  }

  scheduleCheck(element: Node) {
    this.pendingChecks.add(element);

    if (!this.rafId) {
      this.rafId = requestAnimationFrame(() => {
        this.processPendingChecks();
      });
    }
  }

  processPendingChecks() {
    const elements = Array.from(this.pendingChecks);
    this.pendingChecks.clear();
    this.rafId = null;

    elements.forEach((element) => {
      if (document.body.contains(element)) {
        if (this.hasTargetFilter(element)) {
          this.callback(element);
        }
      }
    });
  }

  start() {
    this.observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.type === "childList") {
          mutation.addedNodes.forEach((node) => {
            if (node instanceof Element) {
              this.scheduleCheck(node);
              node.querySelectorAll("*").forEach((child) => {
                this.scheduleCheck(child);
              });
            }
          });
        } else if (mutation.type === "attributes") {
          this.scheduleCheck(mutation.target);
        }
      });
    });

    this.observer.observe(document.body, {
      childList: true,
      subtree: true,
      attributes: true,
      attributeFilter: ["style", "class"],
    });

    // 初期チェック
    document.body.querySelectorAll("*").forEach((el) => {
      this.scheduleCheck(el);
    });
  }

  stop() {
    if (this.observer) {
      this.observer.disconnect();
      this.observer = null;
    }
    if (this.rafId) {
      cancelAnimationFrame(this.rafId);
      this.rafId = null;
    }
    this.pendingChecks.clear();
  }
}
