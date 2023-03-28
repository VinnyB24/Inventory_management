import { FC, useEffect, useState } from "react";
import Logo from "../assets/logoApp.png";
import { logout } from "../utils/functions";
import { Link, useLocation } from "react-router-dom";
// รูป icon svg หน้า menu
import {
	Avatar,
	Dashboard,
	Users,
	Groups,
	Inventory,
	Shop,
	Activities,
	Invoice,
} from "../assets/svgs/svgs";

type Props = {
	children: React.ReactNode;
};

const Layout: FC<Props> = ({ children }) => {
	const location = useLocation();
	const [activePath, setActivePath] = useState("/");

	useEffect(() => {
		setActivePath(location.pathname);
	}, [location]);

	const isActive = (path: string): string => {
		switch (activePath) {
			case path:
				return "active";
			default:
				return "";
		}
	};

	return (
		<div className="layout">
			<div className="header">
				<div className="brand">
					<img className="logo1" src={Logo} alt="logo" />
				</div>
				<div className="rightNav">
					<div className="userAvatar">
						<div className="imgAvatar">
							<Avatar />
						</div>

						{/* <div className="text">id: 6214012610101</div> */}
					</div>
					<Link to="/invoice-section">
						<div className="newInvoiceButton">New Invoice</div>
					</Link>
					<div className="logoutButton">
						<div className="text" onClick={logout}>
							Logout
						</div>
					</div>
				</div>
			</div>
			<div className="bodyHolder">
				{/* link และรูป Svg หน้าต่างๆ */}
				<div className="sideBar">
					<ul>
						<Link to="/">
							<li className={isActive("/")}>
								<Dashboard />
								<div className="text">Dashboard</div>
							</li>
						</Link>
						<Link to="/groups">
							<li className={isActive("/groups")}>
								<Groups />
								<div className="text">Groups</div>
							</li>
						</Link>
						<Link to="/inventories">
							<li className={isActive("/inventories")}>
								<Inventory />
								<div className="text">Inventories</div>
							</li>
						</Link>
						<Link to="/shops">
							<li className={isActive("/shops")}>
								<Shop />
								<div className="text">shops</div>
							</li>
						</Link>
						<Link to="/invoices">
							<li className={isActive("/invoices")}>
								<Invoice />
								<div className="text">Invoices</div>
							</li>
						</Link>
						<Link to="/users">
							<li className={isActive("/users")}>
								<Users />
								<div className="text">Users</div>
							</li>
						</Link>
						<Link to="/user-activities">
							<li className={isActive("/user-activities")}>
								<Activities />
								<div className="text">User Activities</div>
							</li>
						</Link>
					</ul>
				</div>
				<div className="mainContent">{children}</div>
			</div>
		</div>
	);
};

export default Layout;
