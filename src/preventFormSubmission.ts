export default function preventFormSubmission(event: SubmitEvent) {
    event.preventDefault();
}

export function attachEventBlocker(element: HTMLFormElement) {
    element.addEventListener("submit", preventFormSubmission);
}
