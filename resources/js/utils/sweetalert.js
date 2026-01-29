import Swal from 'sweetalert2';

// Configure SweetAlert with dark theme matching the portfolio
const theme = {
  background: '#111827', // bg-gray-900
  color: '#10b981', // emerald
  confirmButtonColor: '#10b981', // emerald
  cancelButtonColor: '#6b7280', // gray-500
  customClass: {
    popup: 'bg-gray-900 border border-gray-700 rounded-xl',
    title: 'text-emerald-400 font-bold',
    htmlContainer: 'text-emerald-100',
    confirmButton: 'bg-emerald-500 hover:bg-emerald-600 text-black font-semibold px-4 py-2 rounded-lg',
    cancelButton: 'bg-gray-500 hover:bg-gray-600 text-white font-semibold px-4 py-2 rounded-lg',
  }
};

// Error alert
export const showError = (title, text) => {
  return Swal.fire({
    ...theme,
    icon: 'error',
    title,
    text,
    confirmButtonText: 'OK'
  });
};

// Success alert
export const showSuccess = (title, text) => {
  return Swal.fire({
    ...theme,
    icon: 'success',
    title,
    text,
    confirmButtonText: 'OK'
  });
};

// Warning alert
export const showWarning = (title, text) => {
  return Swal.fire({
    ...theme,
    icon: 'warning',
    title,
    text,
    confirmButtonText: 'OK'
  });
};

// Info alert
export const showInfo = (title, text) => {
  return Swal.fire({
    ...theme,
    icon: 'info',
    title,
    text,
    confirmButtonText: 'OK'
  });
};

// Confirmation dialog
export const showConfirm = (title, text, confirmText = 'Yes', cancelText = 'Cancel') => {
  return Swal.fire({
    ...theme,
    icon: 'question',
    title,
    text,
    showCancelButton: true,
    confirmButtonText: confirmText,
    cancelButtonText: cancelText
  });
};

export default Swal;
