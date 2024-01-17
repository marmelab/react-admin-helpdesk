import { useShowController } from "react-admin";
import { Navigate } from "react-router-dom";

/**
 * This component redirects to the parent ticket show page.
 * It is useful for the site-wide search, as we use the addSearchMethod builder,
 * and we want to redirect to a record page.
 * @see dataProvider
 */
export const MessageShow = () => {
  const { record, isLoading, error } = useShowController();
  if (isLoading) {
    return null;
  }
  if (error) {
    return <Navigate to="/" />;
  }
  return <Navigate to={`/tickets/${record?.ticket_id}/show`} />;
};
