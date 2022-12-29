export const ButtonSecondary = ({ children, ...props }) => {
  return (
    <button
      onClick={props.onClick}
      className="btn btn-outline-secondary"
      type="button"
    >
      {children}
    </button>
  );
};
