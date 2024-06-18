import { useState } from 'react';
import '../../Admin.css';
import userImage from '../../assets/UserLogo.png';
import LogoutIcon from '@mui/icons-material/Logout';
import DropdownArrow from '../../assets/dropdownarrow.png';

function UserInfo(){
    const [dropdownVisible, setDropdownVisible] = useState(false);

    const toggleDropdown = () => {
        setDropdownVisible(!dropdownVisible);
    };

    return(
        <div className='userInfo'>
            <img src={DropdownArrow} alt="Dropdown button" className="pfp-text" onClick={toggleDropdown}/>
            <div className='pfp-picture'>
                <img src={userImage} alt="Admin profile" className="pfp-admin" onClick={toggleDropdown}/>
                {dropdownVisible && (
                    <div className='dropdown-menu'>
                        <ul>
                            <li>
                                <span className='dropdown-items-profile'>Profile</span>
                            </li>
                            <li>
                                <span className='dropdown-items-logout'>Logout <LogoutIcon sx={{ marginLeft: '0.7em' }}/></span>
                            </li>
                        </ul>
                    </div>
                )}
            </div>
        </div>
    )
}

export default UserInfo