
import { ModeToggle } from "./ModeToggle";
import { Button } from "./ui/button";

function Navbar() {

    return (
        <nav className="h-[10vh] flex text-right px-5 py-2">
            <ModeToggle/>
        </nav>
    );
}

export default Navbar;
