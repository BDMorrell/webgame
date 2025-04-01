export default function preventFormSubmission(event: SubmitEvent) {
    event.preventDefault();
}

export function attachSubmitEventBlocker(element: HTMLFormElement) {
    element.addEventListener("submit", preventFormSubmission);
}
