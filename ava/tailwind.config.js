/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,ts}"],
  important: true,
  theme: {
    extend: {
      backgroundImage: {
        insted_logo: "url('/assets/images/logo-insted.svg')",
        insted_background: "url('/assets/images/fundo-insted.png')",
        checkmark: "url('/assets/svg-icons/checkmark.svg')",
        opened_eye: "url('/assets/svg-icons/olho-aberto.svg')",
        closed_eye: "url('/assets/svg-icons/olho-fechado.svg')",
      },
    },
    colors: {
      text_color: "#063b3d",
      header_color: "rgb(22, 149, 153)",
      okay_button: "rgb(22, 129, 193)",
      green_insted: "#1da9ad",
      green_insted_transp: "rgba(29, 169, 173, 0.651)",
      green_insted_fundo_modal: "rgba(3, 110, 114, 0.384)",
      white: "rgb(244, 242, 255)",
      white_transp: "rgba(244, 242, 255,0.85)",
      invalid_text: "rgba(210,70,70,0.85)",
    },
  },
  plugins: [],
};
