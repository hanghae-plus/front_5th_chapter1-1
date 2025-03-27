export const FormInput = ({ label, id, value, type = "text" }) => `
  <div class="mb-4">
    <label for="${id}" class="block text-gray-700 text-sm font-bold mb-2">${label}</label>
    <input type="${type}" id="${id}" name="${id}" value="${value}" class="w-full p-2 border rounded" />
  </div>
`;

export default FormInput;
