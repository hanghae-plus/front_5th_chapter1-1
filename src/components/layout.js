import store from "../store/store.js";
import Header from "./header.js";
import Footer from "./footer.js";

const Layout = (content) => /* html */ `
<div class="bg-gray-100 min-h-screen flex justify-center">
    <div class="max-w-md w-full">
    ${Header(store.state.loggedIn)}
        ${content}
    ${Footer()}
    </div>
</div>
`;

export default Layout;
