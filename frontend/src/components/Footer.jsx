// FOOTER COMPONENT

// frontend/src/components/Footer.jsx
const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-100% border-t border-neutral-500 bg-transparent rounded-l-2xl rounded-r-3xl overflow-hidden">
      <div className="max-w-20xl mx-auto px-50 py-50">
        <div className="flex items-center justify-center text-center">
          <p className="text-m text-secondary/90">
            © {currentYear} Mausam360 — All rights reserved
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;