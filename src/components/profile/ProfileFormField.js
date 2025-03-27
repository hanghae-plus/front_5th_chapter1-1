const ProfileFormField = (config, value) => {
  const commonClasses = "w-full p-2 border rounded";
  const labelClasses = "block text-gray-700 text-sm font-bold mb-2";

  return `
    <div class="mb-4">
      <label for="${config.id}" class="${labelClasses}">${config.label}</label>
      ${
        config.type === "textarea"
          ? `<textarea
            id="${config.id}"
            name="${config.id}"
            rows="${config.rows}"
            class="${commonClasses}"
          >${value}</textarea>`
          : `<input
            type="${config.type}"
            id="${config.id}"
            name="${config.id}"
            value="${value}"
            class="${commonClasses}"
          />`
      }
    </div>
  `;
};

export default ProfileFormField;
