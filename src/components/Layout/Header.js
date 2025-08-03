import { useContext } from "react";
import { Badge, Button, Container, Nav, Navbar, NavDropdown } from "react-bootstrap";
import { MyCartContext, MyUserContext } from "../../configs/Context";
import { Link } from "react-router-dom";

const Header = () => {
    const [user, dispatch] = useContext(MyUserContext);
    const [cartCounter, ] = useContext(MyCartContext);
    return (
        <Navbar expand="lg" className="bg-white shadow-sm py-3 px-4">
            <Container>
                <Navbar.Brand as={Link} to="/" className="fw-bold text-primary fs-4">SCM</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <Link to="/" className="nav-link text-dark">Trang chủ</Link>
                        <NavDropdown title="Tùy chọn" id="basic-nav-dropdown">
                            {user && (user.role === "ADMIN" || user.role === "NHANVIEN") ? (
                                <>
                                    <NavDropdown.Item as={Link} to="/ds-donhangnhap">Đơn hàng nhập</NavDropdown.Item>
                                    <NavDropdown.Item as={Link} to="#">Đơn hàng xuất</NavDropdown.Item>
                                    <NavDropdown.Item as={Link} to="/ds-kho">Quản lý kho</NavDropdown.Item>
                                    <NavDropdown.Item as={Link} to="#">Quản lý sản phẩm</NavDropdown.Item>
                                    <NavDropdown.Item as={Link} to="/ds-doitacvanchuyen">Đối tác vận chuyển</NavDropdown.Item>
                                    <NavDropdown.Item as={Link} to="/ds-nhacungcap">Nhà cung cấp</NavDropdown.Item>
                                    <NavDropdown.Item as={Link} to="/ds-vanchuyen">Vận chuyển</NavDropdown.Item>
                                    {user.username == "cskh" && <NavDropdown.Item as={Link} to="/cskh/danhsach">Danh sách chăm sóc khách hàng</NavDropdown.Item>}
                                </>
                            ):(
                                <>
                                    <NavDropdown.Item as={Link} to="/action2">Xem đơn hàng đang giao</NavDropdown.Item>
                                    <NavDropdown.Item as={Link} to="/hotrokhachhang">Hỗ trợ khách hàng</NavDropdown.Item>
                                </>
                            )}
                        </NavDropdown>

                        <Link to="/cart" className="nav-link text-success">Giỏ hàng <Badge bg="danger">{cartCounter}</Badge></Link>
                    </Nav>

                    <Nav className="ms-auto align-items-center gap-2">
                        {user === null ? (
                            <>
                                <Link to="/login" className="btn btn-outline-primary btn-sm">Đăng nhập</Link>
                                <Link to="/register" className="btn btn-primary btn-sm">Đăng ký</Link>
                            </>
                        ) : (
                            <>
                                <div className="d-flex align-items-center gap-2">
                                    <img src={user.avatar} width={30} height={30} className="rounded-circle border" alt="avatar" />
                                    <span className="text-muted small">Chào, {user.username}</span>
                                </div>
                                <Button variant="outline-danger" size="sm" onClick={() => dispatch({ type: "logout" })}>
                                    Đăng xuất
                                </Button>
                            </>
                        )}
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default Header;