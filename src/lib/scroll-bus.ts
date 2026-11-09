/**
 * One passive scroll + resize listener for the whole page, throttled with
 * requestAnimationFrame. Consumers subscribe and are called at most once per
 * frame. Listeners attach on first subscriber and detach (cancelling any
 * pending frame) on the last unsubscribe.
 */
type Listener = () => void;

const listeners = new Set<Listener>();
let frame = 0;
let attached = false;

function flush(): void {
  frame = 0;
  listeners.forEach((fn) => fn());
}

function schedule(): void {
  if (frame) return;
  frame = requestAnimationFrame(flush);
}

function attach(): void {
  window.addEventListener("scroll", schedule, { passive: true });
  window.addEventListener("resize", schedule, { passive: true });
  attached = true;
}

function detach(): void {
  window.removeEventListener("scroll", schedule);
  window.removeEventListener("resize", schedule);
  if (frame) cancelAnimationFrame(frame);
  frame = 0;
  attached = false;
}

export function subscribeToScroll(listener: Listener): () => void {
  listeners.add(listener);
  if (!attached) attach();
  schedule(); // initial measurement
  return () => {
    listeners.delete(listener);
    if (listeners.size === 0 && attached) detach();
  };
}
