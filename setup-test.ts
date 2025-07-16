import "@testing-library/jest-dom";
/**
 * Handlers are automatically generated with Kubb from Open API documentation
 */
import { handlers } from "./app/gen";
import { setupServer } from "msw/node";

window.URL.createObjectURL = vi.fn();
// @ts-ignore set test-specific property for vite
window.__vite_plugin_react_preamble_installed__ = true;
Object.defineProperty(window, "matchMedia", {
  writable: true,
  value: vi.fn().mockImplementation((query) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: vi.fn(),
    removeListener: vi.fn(),
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  })),
});

Object.defineProperty(window, "scrollTo", {
  writable: true,
  value: vi.fn(),
});

Object.defineProperty(window, "_paq", {
  writable: true,
  value: [],
});

/**
 * Mock Service Worker can be configured once the Handlers are generated
 */
const server = setupServer(...handlers);

beforeAll(() => server.listen({ onUnhandledRequest: "error" }));

afterAll(() => server.close());

afterEach(() => server.resetHandlers());
