export function SubmitButton({ className, id, label }) {
  return `
    <button
      id="${id}"
      type="submit"
      class="w-full bg-blue-600 text-white p-2 rounded font-bold ${className}"
    >${label}</button>
  `;
}
