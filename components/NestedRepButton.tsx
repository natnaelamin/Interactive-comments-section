import { FaReplyAll } from "react-icons/fa6";

interface ReplyFormProps {
    toggleReply: () => void;
    user: string;
    setuser: any; // Function that doesn't take any arguments and doesn't return anything
    setReplyingToReply: any
}

function NestedRepButton({ toggleReply, user, setuser, setReplyingToReply }: ReplyFormProps) {
    const handleToggle = () =>{
        setuser(user);
        toggleReply();
        setReplyingToReply(true);
    }
    return (
        <div>
            <button type="button" onClick={handleToggle} className="text-blue-800 text-xs md:text-base flex gap-1"><FaReplyAll className="mt-1"/>Replay</button>
        </div>
    );
}

export default NestedRepButton
