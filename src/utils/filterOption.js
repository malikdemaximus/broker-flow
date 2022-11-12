export const filterOption = (input, { children }) => {
  const [option] = children
  const { children: optionText } = option

  return optionText.toLowerCase().indexOf(input.toLowerCase()) >= 0
}
