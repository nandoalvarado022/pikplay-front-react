import { useState } from "react";
import { Discussion } from "../../interfaces/Discussions";

const useDiscussions = () => {
    const [discussionsList, setDiscussionsList] = useState<Discussion[]>([{ title: 'test' }]);
    return {
        discussionsList
    }
}

export default useDiscussions;
