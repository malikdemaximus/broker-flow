export const fillPhone = (evt, form) => {
  const phone = evt.target.value
  if (!phone) {
    form.phone = '+7'
  }
}
