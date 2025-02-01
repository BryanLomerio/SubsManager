export const isPaymentDue = (paymentDate) => {
    const dueDate = new Date(paymentDate);
    const today = new Date();
    return today >= dueDate && today <= new Date(dueDate.setDate(dueDate.getDate() + 7));
  };
  