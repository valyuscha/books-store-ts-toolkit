interface Rules {
  required: boolean
  minLength?: number
  maxLength?: number
}

export const checkValidity = (value: string, rules: Rules) => {
  let isValid = true

  if (rules.required) {
    isValid = value.trim() !== '' && isValid
  }

  if (rules.minLength) {
    isValid = value.trim().length >= rules.minLength && isValid
  }

  if (rules.maxLength) {
    isValid = value.trim().length <= rules.maxLength && isValid
  }

  return isValid
}