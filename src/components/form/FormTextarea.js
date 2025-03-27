export const FormTextarea = ({ label, id, value }) => `
  <div class="mb-4">
    <label for="${id}" class="block text-gray-700 text-sm font-bold mb-2">${label}</label>
    <textarea id="${id}" name="${id}" class="w-full p-2 border rounded">${value}</textarea>
  </div>
`;

export default FormTextarea;
