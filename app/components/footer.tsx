
const Footer = () => {
  const currentDate = new Date().getFullYear();
  return (
    <>
      <footer className="flex items-center justify-center py-5 border-t border-gray-300">
        <p>Copyright &copy; {currentDate}</p>
      </footer>
    </>
  );
};

export default Footer;
