import {Link} from 'react-router-dom';

import {useAuth} from '../../Login/hooks/auth'

const UserLogin = ()=>{
    const {user} = useAuth();
    return (<section>
        {(!user.name) && (<Link to="/login">Login</Link>)}
        {(user.name) && (
            [<span key="1">
                {user.name}
            </span>,
            <Link key="2" to="/login">
                Logout
            </Link>]
        )}
    </section>)
}

const Header = ()=>{
    return <header>
        Header 
        <UserLogin />
    </header>
}
export default Header;