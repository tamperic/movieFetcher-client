import PropTypes from "prop-types";
ProfileView.propTypes = {
  user: PropTypes.shape({
    username: PropTypes.string.isRequired,
    password: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    birthDate: PropTypes.instanceOf(Date),
  }).isRequired,
};
