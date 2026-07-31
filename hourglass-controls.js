/*
 * <hourglass-controls> — optional, zero-dependency companion to hourglass.js.
 * Drops a duration slider + color picker onto the page that drive one or
 * more <hour-glass> elements live. No JS required from the site owner.
 *
 * Usage:
 *   <script src="hourglass.js"></script>
 *   <script src="hourglass-controls.js"></script>
 *   <hour-glass id="main"></hour-glass>
 *   <hourglass-controls for="main"></hourglass-controls>
 *
 * Attributes (all optional):
 *   for            space-separated id(s) of the <hour-glass> element(s) to control (required to do anything)
 *   show-duration  "true"/"false" — show the duration slider (default true)
 *   show-color     "true"/"false" — show the color picker (default true)
 *   duration-min   minimum seconds for the slider (default 4)
 *   duration-max   maximum seconds for the slider (default 20)
 *   label-duration text label for the duration control (default "Duration")
 *   label-color    text label for the color control (default "Color")
 *
 * Styling hooks (CSS custom properties, set on the element or an ancestor):
 *   --hourglass-controls-color    text color (default: inherited)
 *   --hourglass-controls-accent   accent color for the inputs (default: #e6b93d)
 */
(function () {
  var TEMPLATE = `
    <style>
      :host {
        display: inline-flex;
        gap: 16px;
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
        font-size: 13px;
        color: var(--hourglass-controls-color, inherit);
      }
      label {
        display: flex;
        flex-direction: column;
        gap: 4px;
      }
      label[hidden] { display: none; }
      input[type="range"] {
        accent-color: var(--hourglass-controls-accent, #e6b93d);
      }
      input[type="color"] {
        accent-color: var(--hourglass-controls-accent, #e6b93d);
        width: 36px;
        height: 26px;
        padding: 0;
        border: none;
        background: none;
        cursor: pointer;
      }
    </style>
    <label class="dur-row">
      <span class="dur-label">Duration</span>
      <input type="range" class="dur-input">
    </label>
    <label class="color-row">
      <span class="color-label">Color</span>
      <input type="color" class="color-input">
    </label>
  `;

  class HourGlassControlsEl extends HTMLElement {
    static get observedAttributes() {
      return [
        'for', 'show-duration', 'show-color',
        'duration-min', 'duration-max',
        'label-duration', 'label-color',
      ];
    }

    constructor() {
      super();
      var root = this.attachShadow({ mode: 'open' });
      root.innerHTML = TEMPLATE;
      this._durRow = root.querySelector('.dur-row');
      this._colorRow = root.querySelector('.color-row');
      this._durLabel = root.querySelector('.dur-label');
      this._colorLabel = root.querySelector('.color-label');
      this._durInput = root.querySelector('.dur-input');
      this._colorInput = root.querySelector('.color-input');

      this._durInput.addEventListener('input', () => {
        this._targets().forEach((el) => el.setAttribute('duration', this._durInput.value));
      });
      this._colorInput.addEventListener('input', () => {
        this._targets().forEach((el) => el.setAttribute('sand-color', this._colorInput.value));
      });
    }

    connectedCallback() {
      if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => this._init(), { once: true });
      } else {
        this._init();
      }
    }

    attributeChangedCallback() {
      if (this._initialized) this._applyAttrs();
    }

    _init() {
      this._initialized = true;
      this._applyAttrs();
      this._syncFromTarget();
    }

    _targets() {
      var forAttr = this.getAttribute('for') || '';
      var ids = forAttr.split(/\s+/).filter(Boolean);
      return ids
        .map((id) => document.getElementById(id))
        .filter((el) => el != null);
    }

    _applyAttrs() {
      var showDuration = this.getAttribute('show-duration');
      var showColor = this.getAttribute('show-color');
      this._durRow.hidden = showDuration === 'false';
      this._colorRow.hidden = showColor === 'false';

      this._durLabel.textContent = this.getAttribute('label-duration') || 'Duration';
      this._colorLabel.textContent = this.getAttribute('label-color') || 'Color';

      this._durInput.min = this.getAttribute('duration-min') || '4';
      this._durInput.max = this.getAttribute('duration-max') || '20';
    }

    _syncFromTarget() {
      var target = this._targets()[0];
      if (!target) return;
      var duration = parseFloat(target.getAttribute('duration'));
      var color = target.getAttribute('sand-color');
      this._durInput.value = String(!isNaN(duration) ? duration : 12);
      this._colorInput.value = color || '#e6b93d';
    }
  }

  customElements.define('hourglass-controls', HourGlassControlsEl);
})();
