import PropTypes from "prop-types"
import { useLocation } from 'react-router-dom'
import Button from "./Button"

const Header = ({ title, onAdd, isFormVisible }) => {
    const location = useLocation()
    console.log(location)

    return (
        <header className="header">
        <h1>{title}</h1>
        { location.pathname === '/' && <Button onclick={onAdd} color={ isFormVisible ? 'red' : 'green'} text={ isFormVisible ? 'Cancel' : 'Add'} />}
        </header>
    );
};

Header.defaultProps = {
    title: "Title not found"
};

Header.propTypes = {
    title: PropTypes.string.isRequired
};

// writing internal CSS
// const headingStyles = {
// // need to write JSX and not actual CSS
// color: '#fff',
// backgroundColor: '#07070a',
// }

export default Header;