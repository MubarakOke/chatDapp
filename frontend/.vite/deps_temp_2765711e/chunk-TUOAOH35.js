import {
  AccountController,
  ApiController,
  ConnectionController,
  EventsController,
  LitElement,
  ModalController,
  OptionsController,
  RouterController,
  SnackController,
  ThemeController,
  UiHelperUtil,
  css,
  customElement,
  html,
  initializeTheming,
  state
} from "./chunk-OQ6TX2IK.js";

// node_modules/@web3modal/scaffold/dist/esm/src/modal/w3m-modal/styles.js
var styles_default = css`
  :host {
    z-index: var(--w3m-z-index);
    display: block;
    backface-visibility: hidden;
    will-change: opacity;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    pointer-events: none;
    opacity: 0;
    background-color: var(--wui-cover);
  }

  @keyframes zoom-in {
    0% {
      transform: scale(0.95) translateY(0);
    }
    100% {
      transform: scale(1) translateY(0);
    }
  }

  @keyframes slide-in {
    0% {
      transform: scale(1) translateY(50px);
    }
    100% {
      transform: scale(1) translateY(0);
    }
  }

  wui-card {
    max-width: 360px;
    width: 100%;
    position: relative;
    animation-delay: 0.3s;
    animation-duration: 0.2s;
    animation-name: zoom-in;
    animation-fill-mode: backwards;
    animation-timing-function: var(--wui-ease-out-power-2);
    outline: none;
  }

  wui-flex {
    overflow-x: hidden;
    overflow-y: auto;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
  }

  @media (max-height: 700px) and (min-width: 431px) {
    wui-flex {
      align-items: flex-start;
    }

    wui-card {
      margin: var(--wui-spacing-xxl) 0px;
    }
  }

  @media (max-width: 430px) {
    wui-flex {
      align-items: flex-end;
    }

    wui-card {
      max-width: 100%;
      border-bottom-left-radius: 0;
      border-bottom-right-radius: 0;
      border-bottom: none;
      animation-name: slide-in;
    }
  }
`;

// node_modules/@web3modal/scaffold/dist/esm/src/modal/w3m-modal/index.js
var __decorate = function(decorators, target, key, desc) {
  var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
  if (typeof Reflect === "object" && typeof Reflect.decorate === "function")
    r = Reflect.decorate(decorators, target, key, desc);
  else
    for (var i = decorators.length - 1; i >= 0; i--)
      if (d = decorators[i])
        r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
  return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var SCROLL_LOCK = "scroll-lock";
var W3mModal = class W3mModal2 extends LitElement {
  constructor() {
    super();
    this.unsubscribe = [];
    this.abortController = void 0;
    this.open = ModalController.state.open;
    this.caipAddress = AccountController.state.caipAddress;
    this.isSiweEnabled = OptionsController.state.isSiweEnabled;
    this.initializeTheming();
    ApiController.prefetch();
    this.unsubscribe.push(ModalController.subscribeKey("open", (val) => val ? this.onOpen() : this.onClose()), AccountController.subscribe((newAccountState) => this.onNewAccountState(newAccountState)));
    EventsController.sendEvent({ type: "track", event: "MODAL_LOADED" });
  }
  disconnectedCallback() {
    this.unsubscribe.forEach((unsubscribe) => unsubscribe());
    this.onRemoveKeyboardListener();
  }
  render() {
    return this.open ? html`
          <wui-flex @click=${this.onOverlayClick.bind(this)}>
            <wui-card role="alertdialog" aria-modal="true" tabindex="0">
              <w3m-header></w3m-header>
              <w3m-router></w3m-router>
              <w3m-snackbar></w3m-snackbar>
            </wui-card>
          </wui-flex>
        ` : null;
  }
  async onOverlayClick(event) {
    if (event.target === event.currentTarget) {
      await this.handleClose();
    }
  }
  async handleClose() {
    if (this.isSiweEnabled) {
      const { SIWEController } = await import("./exports-VIOVPJWW.js");
      if (SIWEController.state.status !== "success") {
        await ConnectionController.disconnect();
      }
    }
    ModalController.close();
  }
  initializeTheming() {
    const { themeVariables, themeMode } = ThemeController.state;
    const defaultThemeMode = UiHelperUtil.getColorTheme(themeMode);
    initializeTheming(themeVariables, defaultThemeMode);
  }
  async onClose() {
    this.onScrollUnlock();
    await this.animate([{ opacity: 1 }, { opacity: 0 }], {
      duration: 200,
      easing: "ease",
      fill: "forwards"
    }).finished;
    SnackController.hide();
    this.open = false;
    this.onRemoveKeyboardListener();
  }
  async onOpen() {
    this.onScrollLock();
    this.open = true;
    await this.animate([{ opacity: 0 }, { opacity: 1 }], {
      duration: 200,
      easing: "ease",
      fill: "forwards",
      delay: 300
    }).finished;
    this.onAddKeyboardListener();
  }
  onScrollLock() {
    const styleTag = document.createElement("style");
    styleTag.dataset["w3m"] = SCROLL_LOCK;
    styleTag.textContent = `
      html, body {
        touch-action: none;
        overflow: hidden;
        overscroll-behavior: contain;
      }
      w3m-modal {
        pointer-events: auto;
      }
    `;
    document.head.appendChild(styleTag);
  }
  onScrollUnlock() {
    const styleTag = document.head.querySelector(`style[data-w3m="${SCROLL_LOCK}"]`);
    if (styleTag) {
      styleTag.remove();
    }
  }
  onAddKeyboardListener() {
    var _a;
    this.abortController = new AbortController();
    const card = (_a = this.shadowRoot) == null ? void 0 : _a.querySelector("wui-card");
    card == null ? void 0 : card.focus();
    window.addEventListener("keydown", (event) => {
      if (event.key === "Escape") {
        this.handleClose();
      } else if (event.key === "Tab") {
        const { tagName } = event.target;
        if (tagName && !tagName.includes("W3M-") && !tagName.includes("WUI-")) {
          card == null ? void 0 : card.focus();
        }
      }
    }, this.abortController);
  }
  onRemoveKeyboardListener() {
    var _a;
    (_a = this.abortController) == null ? void 0 : _a.abort();
    this.abortController = void 0;
  }
  async onNewAccountState(newState) {
    const { isConnected, caipAddress: newCaipAddress } = newState;
    if (this.isSiweEnabled) {
      const { SIWEController } = await import("./exports-VIOVPJWW.js");
      if (isConnected && !this.caipAddress) {
        this.caipAddress = newCaipAddress;
      }
      if (isConnected && newCaipAddress && this.caipAddress !== newCaipAddress) {
        await SIWEController.signOut();
        this.onSiweNavigation();
        this.caipAddress = newCaipAddress;
      }
      try {
        const session = await SIWEController.getSession();
        if (session && !isConnected) {
          await SIWEController.signOut();
        } else if (isConnected && !session) {
          this.onSiweNavigation();
        }
      } catch (error) {
        if (isConnected) {
          this.onSiweNavigation();
        }
      }
    }
  }
  onSiweNavigation() {
    if (this.open) {
      RouterController.push("ConnectingSiwe");
    } else {
      ModalController.open({
        view: "ConnectingSiwe"
      });
    }
  }
};
W3mModal.styles = styles_default;
__decorate([
  state()
], W3mModal.prototype, "open", void 0);
__decorate([
  state()
], W3mModal.prototype, "caipAddress", void 0);
__decorate([
  state()
], W3mModal.prototype, "isSiweEnabled", void 0);
W3mModal = __decorate([
  customElement("w3m-modal")
], W3mModal);

export {
  W3mModal
};
//# sourceMappingURL=chunk-TUOAOH35.js.map
