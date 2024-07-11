import Header from "./Header";
import Footer from "./Footer";

function Layout(props) {
  return (
    <div>
      <Header />
      <div style={{ backgroundColor: "#E5E5E5" }}>
        <div className="container">{props.children}</div>
      </div>
      <Footer />
    </div>
  );
}

export default Layout;
