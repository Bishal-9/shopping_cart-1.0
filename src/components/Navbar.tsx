import { Button, Container, Nav, Navbar as NavbarBS } from "react-bootstrap"
import { NavLink } from "react-router-dom"
import { useShoppingCart } from "../context/ShoppingCartContext"

export function Navbar() {

  const { openCart, cartQuantity } = useShoppingCart()
  return (
    <NavbarBS sticky="top" className="bg-white shadow-sm mb-3">
      <Container>
        <Nav className="me-auto">
          <Nav.Link to="/" as={NavLink}>
            Home
          </Nav.Link>
          <Nav.Link to="/store" as={NavLink}>
            Store
          </Nav.Link>
          <Nav.Link to="/about" as={NavLink}>
            About
          </Nav.Link>
        </Nav>
        {cartQuantity > 0 && (
          <Button
            style={{ width: "3rem", height: "3rem", position: "relative" }}
            variant="outline-primary"
            className="rounded-circle"
            onClick={openCart}
          >
            <img
              src="data:image/png;base64,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"
              width="30rem"
              height="30rem"
              style={{
                position: "relative",
                left: "-3px",
              }}
            ></img>
            <div
              className="rounded-circle bg-danger d-flex justify-content-center align-items-center"
              style={{
                color: "white",
                width: "1.2rem",
                height: "1.2rem",
                position: "absolute",
                bottom: "0",
                right: "0",
                transform: "translate(25%, 25%)",
              }}
            >
              {cartQuantity}
            </div>
          </Button>
        )}
      </Container>
    </NavbarBS>
  )
}
