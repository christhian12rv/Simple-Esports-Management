
import { useNavigate, useParams } from 'react-router-dom';

export default function withRouter(Component) {
	// eslint-disable-next-line react/display-name, react/react-in-jsx-scope
	return props => <Component {...props} params={useParams()} navigate={useNavigate()} />;
}