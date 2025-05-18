import CustomNavbar from './CustomNavbar';
import Footer from './Footer';

const Layout = ({ children }) => {
  return (
    <>
      <CustomNavbar />
      <main>{children}</main>
      <Footer />
    </>
  );
};

export default Layout;
