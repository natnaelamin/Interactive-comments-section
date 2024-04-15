import { FaReplyAll } from "react-icons/fa6";

interface ReplyFormProps {
    toggleReply: () => void; // Function that doesn't take any arguments and doesn't return anything
}

function RepButton({ toggleReply }: ReplyFormProps) {
    return (
        <div>
            <button type="button" onClick={toggleReply} className="text-blue-800 flex gap-1 text-xs md:text-base"><FaReplyAll className="mt-1 "/>Replay</button>
        </div>
    );
}

export default RepButton;