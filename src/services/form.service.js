export const formService = {
  getFormData(formId) {
    const form = document.getElementById(formId);
    if (!form) return null;

    const formData = {};
    const formElements = form.elements;

    for (let element of formElements) {
      if (element.id) {
        formData[element.id] = element.value.trim();
      }
    }

    return formData;
  },

  validateLoginForm(data) {
    if (!data?.username) {
      throw new Error("사용자 이름을 입력해주세요");
    }
    return true;
  },

  validateProfileForm(data) {
    if (!data?.username) {
      throw new Error("사용자 이름을 입력해주세요");
    }
    return true;
  },
};
