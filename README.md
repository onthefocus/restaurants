# Restaurants

networks.html ->
This is a basic HTML page that fetches data from an API endpoint and dynamically populates a list of network names as links. Clicking on a network name takes the user to a restaurant page with the network ID as a query parameter. The page uses TailwindCSS for styling.

restaurant.html ->
This HTML page fetches data from an API endpoint to display a list of restaurants belonging to a particular network. It uses the network ID passed as a query parameter to filter the data and display only the restaurants belonging to that network. Each restaurant in the list is a link that takes the user to a details page with the restaurant ID as a query parameter.

details.html ->
This is a webpage that displays information about a specific restaurant and its devices, allows adding and removing devices, and recording their values. It uses Tailwind CSS for styling and fetches data from an API to populate the page. It also includes a modal for adding and updating device information, as well as a success indicator modal.

Removing devices currently not supported by BE!!