import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconDefinition } from '@fortawesome/free-brands-svg-icons';

interface SidebarLinkProps {
	name: string;
	link: string;
	icon: IconDefinition;
}

const SidebarLink = ({ name, link, icon }: SidebarLinkProps) => {
	return (
		<li className='sidebar-links__item'>
			<Link to={link} className='sidebar-links__link'>
				<FontAwesomeIcon icon={icon} />
				{name}
			</Link>
		</li>
	);
};

export default SidebarLink;